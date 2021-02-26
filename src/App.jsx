import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from './theme';

import Navbar from './components/navbar';
import Home from './views/home';
import Category from './views/category';

function App() {
    const history = createBrowserHistory();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router history={history}>
                <Navbar />
                <Route exact={true} path='/' component={Home} />
                <Route path='/category/:category' component={Category} />
            </Router>
        </ThemeProvider>
    );
}

export default App;
