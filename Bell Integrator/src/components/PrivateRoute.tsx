import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { IAuthStateProps } from '../models';

interface IPrivateRouteProps extends IAuthStateProps {
  path: string;
}

class PrivateRoute extends React.Component<IPrivateRouteProps> {
  render() {
    const { ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          (!this.props.auth.isLoggedIn) && (
            <Redirect
              to={{
                pathname: '/auth',
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
}

function mapStateToProps(state: IAuthStateProps) {
  return {
    auth: state.auth
  };
} 

export default connect(mapStateToProps)(PrivateRoute);