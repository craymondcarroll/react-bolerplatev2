import React from 'react';
import {
    Router,
    Route,
    Switch,
    Link,
    NavLink
} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'


import DashboardPage from '../components/DashboardPage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute  from './PrivateRoute';
import PublicRoute from './PublicRoute';


//------------------------------------------------------
// We are creating are own history
// object, because we have other
// files that are not components that
// we want to use it with. It we
// just had components we could
// use <BrowserRouter> and history is built in
// we are not going to is <Router> which allow us
// to support our own history object
//-----------------------------------------------------
export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>


            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true}/>
                <PrivateRoute path="/dashboard" component={DashboardPage}/>
                <Route path="/help" component={HelpPage}/>
                <Route  component={NotFoundPage}/>
            </Switch>

        </div>
    </Router>


);


export default AppRouter;

