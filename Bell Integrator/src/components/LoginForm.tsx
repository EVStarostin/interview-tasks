import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { signIn } from '../actions/authActions';
import { IAuthStateProps } from '../models';
import '../styles/LoginForm.css';

interface ILoginProps extends IAuthStateProps {
  location: {
    state: { from: { pathname: string }}};
  }

interface IDispatchProps {
  onLogIn(login: string, password: string): Function;
}

class Login extends React.Component<ILoginProps & IDispatchProps> {
  textInputLogin: HTMLInputElement | null;  
  textInputPassword: HTMLInputElement | null; 

  handleOnLogIn = (e: React.SyntheticEvent<object>) => {
    e.preventDefault();
    this.props.onLogIn(this.textInputLogin!.value, this.textInputPassword!.value);
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    if (this.props.auth.isLoggedIn) {
      return <Redirect to={from} />;
    }

    return (
      <div className="container">
        <div className="col-md-6 offset-md-3">
          <div className="login-form mt-3">
            <form>
              <p>You must log in to view the page at {from.pathname}</p>
              <div className="form-group">
                <label htmlFor="login">Логин</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="login" 
                  placeholder="Введите логин" 
                  ref={(input) => { this.textInputLogin = input; }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="pass">Пароль</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="pass" 
                  placeholder="Введите пароль" 
                  ref={(input) => { this.textInputPassword = input; }}
                />
                {this.props.auth.error &&
                <div className="alert alert-warning">{this.props.auth.error}</div>}
              </div>
              <div className="text-center login-form__enter">
                <button
                  type="submit" 
                  onClick={this.handleOnLogIn} 
                  className="btn btn-success login-form__enter-btn"
                  disabled={this.props.auth.isFetching}
                >
                {this.props.auth.isFetching ?
                <div className="loader" /> :
                'Sign in'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
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
    onLogIn: (login: string, password: string) => {
      dispatch(signIn(login, password));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);