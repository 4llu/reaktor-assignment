import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';

import theme from './theme';
import rootReducer, { rootEpic } from './redux';

import Navbar from './components/navbar';
import Home from './views/home';
import Category from './views/category';
import NotFound from './views/notfound';

function App() {
    const history = createBrowserHistory();

    const epicMiddleware = createEpicMiddleware();
    const store = createStore(rootReducer, compose(applyMiddleware(epicMiddleware)));
    epicMiddleware.run(rootEpic);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Provider store={store}>
                <Router history={history}>
                    <Navbar />
                    <Switch>
                        <Route exact={true} path='/' component={Home} />
                        <Route exact={true} path='/category/:category' component={Category} />
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </Provider>
        </ThemeProvider>
    );
}

export default App;
