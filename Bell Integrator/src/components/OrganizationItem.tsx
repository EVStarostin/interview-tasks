import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { IOrganization } from '../models';

interface IOrganizationItemProps {
  organization: IOrganization;
}

interface IDispatchProps {
  delete(id: number): Function;
}

export class OrganizationItem extends React.Component<IOrganizationItemProps & IDispatchProps> { 

  handleOnDelete = (e: React.SyntheticEvent<object>) => {
    e.preventDefault();
    this.props.delete(this.props.organization.id);
  }

  render() {
    return (
      <tr className="row main__table-row">
        <td className="col-1">{this.props.organization.id}</td>
        <td className="col-3">{this.props.organization.inn}</td>
        <td className="col-7">
          {this.props.organization.name} 
          <Link to={`/organizations/${this.props.organization.id}/offices`}> &#10148; </Link>
          <Link to={`/organizations/${this.props.organization.id}`}> &#9998; </Link>
          <a href="#" onClick={this.handleOnDelete}> &#10006; </a>
        </td>
        <td className="col-1">{this.props.organization.isActive ? 'да' : 'нет'}</td>
      </tr>
    );
  }
}

export default connect()(OrganizationItem);