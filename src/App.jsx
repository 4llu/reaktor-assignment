import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

function App() {
    const history = createBrowserHistory();

    return (
        <Router history={history}>
            <Route exact={true} path='/' component={() => <div>Hello World</div>} />
        </Router>
    );
}

export default App;
