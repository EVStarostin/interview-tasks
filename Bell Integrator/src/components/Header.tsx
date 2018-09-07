import * as React from 'react';
import { Link } from 'react-router-dom';

import AuthButton from './AuthButton';
import '../styles/Header.css';

class Header extends React.Component {
  render() {
    return (
      <header className="header-wrapper">
        <div className="container header-main">
            <div className="header-main__authorization">
              <AuthButton />
            </div>
            <div className="header-main__logo">
              <h1 className="text-left"><Link to="/">&#9742; Учет сотрудников в организациях</Link></h1>
            </div>
        </div>
      </header>
    );
  }
}

export default Header;
