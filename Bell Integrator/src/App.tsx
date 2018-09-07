import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from './components/Header';
import Organizations from './components/Organizations';
import EditOrganization from './components/EditOrganization';
import NewOrganization from './components/NewOrganization';
import Offices from './components/Offices';
import EditOffice from './components/EditOffice';
import NewOffice from './components/NewOffice';
import Workers from './components/Workers';
import EditWorker from './components/EditWorker';
import NewWorker from './components/NewWorker';
import NotFound from './components/NotFound';
import LoginForm from './components/LoginForm';
import PrivateRoute from './components/PrivateRoute';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact={true} path="/auth" component={LoginForm} />
          <PrivateRoute path="/" />
        </Switch>
        <Switch>
          <Redirect exact={true} from="/" to="/organizations" />
          <Route exact={true} path="/organizations" component={Organizations} />
          <Route exact={true} path="/organizations/new" component={NewOrganization} />
          <Route exact={true} path="/organizations/:orgId" component={EditOrganization} />
          <Route exact={true} path="/organizations/:orgId/offices" component={Offices} />
          <Route exact={true} path="/organizations/:orgId/offices/new" component={NewOffice} />
          <Route exact={true} path="/organizations/:orgId/offices/:officeId" component={EditOffice} />
          <Route exact={true} path="/organizations/:orgId/offices/:officeId/workers" component={Workers} />
          <Route exact={true} path="/organizations/:orgId/offices/:officeId/workers/new" component={NewWorker} />
          <Route 
            exact={true} 
            path="/organizations/:orgId/offices/:officeId/workers/:workerId" 
            component={EditWorker} 
          />
          <Route exact={true} path="/auth" />
          <Route component={NotFound} />
         </Switch>
      </div>
    );
  }
}

export default App;
