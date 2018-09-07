import * as React from 'react';
import { Link } from 'react-router-dom';

import { IWorker } from '../models';

interface IWorkerItemProps {
  worker: IWorker;
  orgId: number; 
  officeId: number;
}

interface IDispatchProps {
  delete(id: number): Function;
}

export class WorkerItem extends React.Component<IWorkerItemProps & IDispatchProps> { 

  handleOnDelete = (e: React.SyntheticEvent<object>) => {
    e.preventDefault();
    this.props.delete(this.props.worker.id);
  }

  render() {
    return (
      <tr className="row main__table-row">

        <td className="col-1">{this.props.worker.id}</td>
        <td className="col-3">
          {this.props.worker.lastName}
          <Link 
            to={
              `/organizations/${this.props.orgId}/offices/${this.props.officeId}/workers/${this.props.worker.id}`}
          > &#9998; 
          </Link>
          <a href="#" onClick={this.handleOnDelete}> &#10006; </a>
        </td>
        <td className="col-3">{this.props.worker.firstName}</td>
        <td className="col-3">{this.props.worker.middleName}</td>
        <td className="col-2">{this.props.worker.position}</td>

      </tr>
    );
  }
}

export default WorkerItem;