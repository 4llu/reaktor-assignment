import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from './theme';

// Views
import Home from './views/home';

function App() {
    const history = createBrowserHistory();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router history={history}>
                <Route exact={true} path='/' component={Home} />
            </Router>
        </ThemeProvider>
    );
}

export default App;
