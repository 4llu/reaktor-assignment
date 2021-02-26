import { createMuiTheme } from '@material-ui/core/styles';

// Some constants
const base_line_height = 1.2;
const base_font_family = ['Open Sans', 'sans-serif'].join(',');

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#33ff33',
        },
    },
    typography: {
        fontFamily: base_font_family,
        fontSize: 16,
        fontWeightRegular: 400,
        fontWeightBold: 700,
        h1: {
            fontSize: '2.441rem',
            lineHeight: base_line_height * 1.5,
            fontWeight: 700,
        },
        h2: {
            fontSize: '1.15rem',
            fontWeight: 700,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: base_line_height,
        },
        body2: {
            fontSize: '0.8rem',
            lineHeight: base_line_height,
        },
    },
    transitions: {
        duration: {
            shortest: 75,
            shorter: 150,
        },
    },
    spacing: (factor) => `${base_line_height * factor}rem`,
});

const overrides = theme.overrides;

overrides.MuiCssBaseline = {
    '@global': {
        body: {
            fontSize: '1rem',
        },
    },
};

export default theme;
