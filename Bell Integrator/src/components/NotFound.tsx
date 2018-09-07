import * as React from 'react';
import { Link } from 'react-router-dom';

class NotFound extends React.Component {
  render() {
    return (
      <div className="container">
        <h3 className="mt-3">Page not found</h3>
        <Link to="/"><h4>Вернуться на главную</h4></Link>
      </div>
    );
  }
}

export default NotFound;