import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

import theme from './theme';
import rootReducer, { rootEpic } from './redux';

import Navbar from './components/navbar';
import Home from './views/home';
import Category from './views/category';

function App() {
    const history = createBrowserHistory();

    const epicMiddleware = createEpicMiddleware();
    const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(epicMiddleware)));
    epicMiddleware.run(rootEpic);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Provider store={store}>
                <Router history={history}>
                    <Navbar />
                    <Route exact={true} path='/' component={Home} />
                    <Route path='/category/:category' component={Category} />
                </Router>
            </Provider>
        </ThemeProvider>
    );
}

export default App;
