import { createTheme } from '@mui/material/styles';
declare module '@mui/material/styles' {
	interface Palette {
		primaryDark: Palette['primary'];
	}

	// allow configuration using `createTheme`
	interface PaletteOptions {
		primaryDark?: PaletteOptions['primary'];
	}
}

declare module '@mui/material/Button' {
	interface ButtonPropsColorOverrides {
		primaryDark: true;
	}
}
declare module '@mui/material/ButtonGroup' {
	interface ButtonGroupPropsColorOverrides {
		primaryDark: true;
	}
}

let _theme = createTheme();

const theme = createTheme({
	palette: {
		primary: {
			main: '#E7EBD1',
			contrastText: '#000000'
			// main: '#DDAD62'
		},
		secondary: {
			main: '#DDAD62',
			contrastText: '#000000'
			// main: '#E7EBD1'
		},
		primaryDark: {
			main: 'rgb(161, 164, 146)',
			contrastText: '#ffffff'
		},
		background: {
			default: '#B5AF8F'
		}
	},
	typography: {
		h1: {
			fontFamily: 'backcountry',
			textTransform: 'uppercase',
			[_theme.breakpoints.down('md')]: {
				fontSize: `calc(${_theme.typography.h1.fontSize} / 2)`
			}
		},
		h2: {
			fontFamily: 'backcountry',
			textTransform: 'uppercase',
			[_theme.breakpoints.down('md')]: {
				fontSize: `calc(${_theme.typography.h2.fontSize} / 2)`
			}
		},
		h3: {
			fontFamily: 'backcountry',
			textTransform: 'uppercase',
			[_theme.breakpoints.down('md')]: {
				fontSize: `calc(${_theme.typography.h3.fontSize} / 2)`
			}
		},
		h4: {
			fontFamily: 'backcountry',
			textTransform: 'uppercase'
		},
		h5: {
			fontFamily: 'backcountry',
			textTransform: 'uppercase'
		},
		h6: {
			fontFamily: 'backcountry',
			textTransform: 'uppercase'
		}
	}
});

export { theme };
