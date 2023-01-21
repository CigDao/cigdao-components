import { AppBar, Container, Toolbar, Box, Menu, MenuItem, Button, Divider, CircularProgress, Typography, useMediaQuery, Theme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import logo from '../../assets/images/cig_logo_small.png';
import { useCanister, useConnect } from '@connect2ic/react';
import { NFID, PlugWallet, StoicWallet } from '@connect2ic/core/providers';
import { Principal } from '@dfinity/principal';
import { _SERVICE as _TOKEN_SERVICE } from '../../declarations/token';
import { _SERVICE as _LEDGER_SERVICE } from '../../declarations/ledger';
import { AccountIdentifier, SubAccount } from '@dfinity/nns';
import canisterIds from '../../misc/canisterIds';
import { getPrettyDecimals } from '../../utils/validationHelper';
import NavMenu from './NavMenu';

export default function Topbar(param: {appName: string, theme: Theme}) {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [userYcBalance, setUserYcBalance] = useState('');
	const [userIcpBalance, setUserIcpBalance] = useState('');
	const [treasuryYcBalance, setTreasuryYcBalance] = useState('');
	const [treasuryIcpBalance, setTreasuryIcpBalance] = useState('');
	const [isLoadingBalances, setIsLoadingBalances] = useState(false);
	const isSmallScreen = useMediaQuery(param.theme.breakpoints.down('md'));
	const { activeProvider, connect, disconnect, isInitializing, principal } = useConnect();

	const [_tokenActor] = useCanister('token');
	const tokenActor = _tokenActor as unknown as _TOKEN_SERVICE;

	const [_ledgerActor] = useCanister('ledger');
	const ledgerActor = _ledgerActor as unknown as _LEDGER_SERVICE;

	const [_wicpActor] = useCanister('wicp');
	const wicpActor = _wicpActor as unknown as _TOKEN_SERVICE;

	useEffect(() => {
		initialize();
	}, [principal]);

	useEffect(() => {
		disconnect();
		getTreasuryBalances();
	}, []);

	function handleLoginClick(provider: string) {
		connect(provider);
		setAnchorEl(null);
	}

	async function initialize() {
		try {
			setIsLoadingBalances(true);
			if (principal) {
				await getUserBalances(principal);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoadingBalances(false);
		}
	}

	async function getUserBalances(principal: string) {
		try {
			const userRawYcBalance = await tokenActor.balanceOf(Principal.fromText(principal));
			setUserYcBalance(getPrettyDecimals(userRawYcBalance));

			const userIdentifier = AccountIdentifier.fromPrincipal({
				principal: Principal.fromText(principal),
				subAccount: SubAccount.ZERO
			}).toNumbers();
			let userRawIcpBalance = await ledgerActor.account_balance({ account: userIdentifier });
			setUserIcpBalance(getPrettyDecimals(userRawIcpBalance.e8s));
		} catch (error) {
			console.log(error);
		}
	}

	async function getTreasuryBalances() {
		try {
			const treasuryRawYcBalance = await tokenActor.balanceOf(Principal.fromText(canisterIds.treasuryCanisterId));
			setTreasuryYcBalance(getPrettyDecimals(treasuryRawYcBalance));

			let treasuryRawIcpBalance = await wicpActor.balanceOf(Principal.from(canisterIds.treasuryCanisterId));
			setTreasuryIcpBalance(getPrettyDecimals(treasuryRawIcpBalance));
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<AppBar position='static' elevation={0} sx={{ bgcolor: param.theme.palette.primary.light }}>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
						<Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', width: '33%' }}>
							<img style={{ padding: 2 }} src={logo} height='48px' />
							<Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
								{!isSmallScreen && !isLoadingBalances && treasuryYcBalance && treasuryIcpBalance && (
									<Box
										sx={{
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'center',
											paddingLeft: 2
										}}>
										DAO Balances
										<Box>
											<Typography variant='caption'>{treasuryYcBalance ? treasuryYcBalance + ' YC' : ''} </Typography>
											<span> | </span>
											<Typography variant='caption'>{treasuryIcpBalance ? treasuryIcpBalance + ' WICP' : ''} </Typography>
										</Box>
									</Box>
								)}
							</Box>
						</Box>
						<Box sx={{ display: 'flex', width: '33%', justifyContent: 'center' }}>
							<NavMenu appName={param.appName} theme={param.theme}/>
						</Box>
						<Box sx={{ display: 'flex', width: '33%', justifyContent: 'flex-end' }}>
							{activeProvider ? (
								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									{!isSmallScreen && !isLoadingBalances && userYcBalance && userIcpBalance && (
										<Box
											sx={{
												display: 'flex',
												flexDirection: 'column',
												justifyContent: 'center',
												textAlign: 'end',
												paddingRight: 2
											}}>
											User balances
											<Box>
												<Typography variant='caption'>{userYcBalance ? userYcBalance + ' YC' : ''} </Typography>
												<span> | </span>
												<Typography variant='caption'>{userIcpBalance ? userIcpBalance + ' ICP' : ''} </Typography>
											</Box>
										</Box>
									)}
									<Button variant='outlined' color='inherit' onClick={() => disconnect()}>
										<img src={activeProvider.meta.icon.light} height={20} />
										<Box sx={{ marginLeft: 1 }}>Logout</Box>
									</Button>
								</Box>
							) : (
								<Button disabled={isInitializing} variant='outlined' color='inherit' onClick={e => setAnchorEl(e.currentTarget)}>
									{isInitializing ? <CircularProgress color='inherit' size={24} /> : 'Login'}
								</Button>
							)}

							<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
								<MenuItem onClick={() => handleLoginClick('plug')}>
									<img src={new PlugWallet().meta.icon.light} height={20} width={20} />
									<Box sx={{ marginLeft: 2 }}>PLUG</Box>
								</MenuItem>
								<MenuItem onClick={() => handleLoginClick('stoic')}>
									<img src={new StoicWallet().meta.icon.light} height={20} width={20} />
									<Box sx={{ marginLeft: 2 }}>STOIC</Box>
								</MenuItem>
								<MenuItem onClick={() => handleLoginClick('nfid')}>
									<img src={new NFID().meta.icon.light} height={20} width={20} />
									<Box sx={{ marginLeft: 2 }}>NFID</Box>
								</MenuItem>
							</Menu>
						</Box>
					</Box>
				</Toolbar>
			</Container>
			<Divider />
		</AppBar>
	);
}
