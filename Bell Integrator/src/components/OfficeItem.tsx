import * as React from 'react';
import { Link } from 'react-router-dom';

import { IOffice } from '../models';

interface IOfficeItemProps {
  office: IOffice;
  orgId: number; 
}

interface IDispatchProps {
  delete(id: number): Function;
}

export class OfficeItem extends React.Component<IOfficeItemProps & IDispatchProps> { 

  handleOnDelete = (e: React.SyntheticEvent<object>) => {
    e.preventDefault();
    this.props.delete(this.props.office.id);
  }

  render() {
    return (
      <tr className="row main__table-row">
        <td className="col-1">{this.props.office.id}</td>
        <td className="col-6">
          {this.props.office.name} 
          <Link 
            to={`/organizations/${this.props.orgId}/offices/${this.props.office.id}/workers`}
          > &#10148; 
          </Link>
          <Link 
            to={`/organizations/${this.props.orgId}/offices/${this.props.office.id}`}
          > &#9998; 
          </Link>
          <a href="#" onClick={this.handleOnDelete}> &#10006; </a>
        </td>
        <td className="col-4">{this.props.office.phone}</td>
        <td className="col-1">{this.props.office.isActive ? 'да' : 'нет'}</td>
      </tr>
    );
  }
}

export default OfficeItem;