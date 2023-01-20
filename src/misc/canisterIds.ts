const transactionDatabaseCanisterId = process.env.REACT_APP_TRANSACTION_CANISTER_ID as string;
const tokenCanisterId = process.env.REACT_APP_TOKEN_CANISTER_ID as string;
const communityCanisterId = process.env.REACT_APP_COMMUNITY_CANISTER_ID as string;
const reflectionDatabaseCanisterId = process.env.REACT_APP_REFLECTION_DATABASE_CANISTER_ID as string;
const daoCanisterId = process.env.REACT_APP_DAO_CANISTER_ID as string;
const treasuryCanisterId = process.env.REACT_APP_TREASURY_CANISTER_ID as string;
const ledgerCanisterId = process.env.REACT_APP_LEDGER_CANISTER_ID as string;
const wicpCanisterId = 'utozz-siaaa-aaaam-qaaxq-cai';

export const canisterIdsAsArray = [
	transactionDatabaseCanisterId,
	tokenCanisterId,
	communityCanisterId,
	reflectionDatabaseCanisterId,
	daoCanisterId,
	treasuryCanisterId,
	ledgerCanisterId,
	wicpCanisterId
];

export default {
	transactionDatabaseCanisterId,
	tokenCanisterId,
	communityCanisterId,
	reflectionDatabaseCanisterId,
	daoCanisterId,
	treasuryCanisterId,
	ledgerCanisterId,
	wicpCanisterId
};
