import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect, Dispatch } from 'react-redux';
import { signOut } from '../actions/authActions';
import { IAuthStateProps } from '../models';

interface IDispatchProps {
  onLogOut(): Function;
}

class AuthButton extends React.Component<IAuthStateProps & IDispatchProps & RouteComponentProps<IAuthStateProps>> {
  render() {
    return (
      (this.props.auth.isLoggedIn) ? (
        <p>
          {this.props.auth.login}
          <button
            className="btn btn-sm"
            onClick={() => {
              this.props.onLogOut();
            }}
          >
            Sign out
          </button>
        </p>
      ) : (
        <p>You are not logged in.</p>
      )
    );
  }
}

function mapStateToProps(state: IAuthStateProps) {
  return {
    auth: state.auth
  };
} 

function mapDispatchToProps(dispatch: Dispatch<object>) {
  return {
    onLogOut: () => {
      dispatch(signOut());
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthButton));