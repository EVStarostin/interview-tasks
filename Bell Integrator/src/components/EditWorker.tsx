import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { IWorkerStateProps, IDirectoryStateProps } from '../models';
import { getWorkerById, updateWorker } from '../actions/workerActions';
import { fetchDocs, fetchCountries } from '../actions/directoryActions';
import '../styles/EditWorker.css';

interface IEditWorkerProps extends IWorkerStateProps, IDirectoryStateProps {
  match: { params: { orgId: string; officeId: string; workerId: string}}; 
}

interface IDispatchProps {
  onUpdate( id: number,
            firstName: string, 
            lastName: string,
            middleName: string, 
            position: string, 
            phone: string, 
            docCode: number, 
            docName: string, 
            docNumber: string, 
            docDate: string, 
            citizenshipCode: number, 
            citizenshipName: string, 
            isIdentified: boolean ): Function;
  onFetch(id: number): Function;
  onFetchDirectories(): Function;
}

export class EditWorker extends React.Component<IEditWorkerProps & IDispatchProps> { 
  firstName: HTMLInputElement | null; 
  lastName: HTMLInputElement | null; 
  middleName: HTMLInputElement | null; 
  position: HTMLInputElement | null;
  phone: HTMLInputElement | null; 
  docCode: HTMLSelectElement | null; 
  docName: HTMLInputElement | null; 
  docNumber: HTMLInputElement | null;
  docDate: HTMLInputElement | null;
  citizenshipCode: HTMLSelectElement | null; 
  citizenshipName: HTMLInputElement | null;
  isIdentified: HTMLInputElement | null;
  orgId: number = +this.props.match.params.orgId;
  officeId: number = +this.props.match.params.officeId;
  workerId: number = +this.props.match.params.workerId;

  componentDidMount() {
    this.props.onFetch(this.workerId);
    this.props.onFetchDirectories();
  }

  handleOnUpdate = (e: React.SyntheticEvent<object>) => {
    e.preventDefault();
    this.props.onUpdate(
      this.workerId,
      this.firstName!.value,
      this.lastName!.value,
      this.middleName!.value,
      this.position!.value,
      this.phone!.value,
      +this.docCode!.value,
      this.docCode!.options[this.docCode!.options.selectedIndex].innerText,
      this.docNumber!.value,
      this.docDate!.value,
      +this.citizenshipCode!.value,
      this.citizenshipCode!.options[this.citizenshipCode!.options.selectedIndex].innerText,
      this.isIdentified!.checked
    );
  }
  
  render() {

    const currentWorker = this.props.worker.items[0];

    if (this.props.worker.shouldFetch) {
      return <Redirect to={`/organizations/${this.orgId}/offices/${this.officeId}/workers`} />;
    }
    if (!currentWorker && !this.props.worker.isFetching) {
      console.log((!currentWorker && !this.props.worker.isFetching));
      return (
        <div className="container mt-3">
          <div className="alert alert-warning">{this.props.worker.error}</div>
          <Link to="/"><h4>Вернуться на главную</h4></Link>
        </div>
      );
    }
    if (this.props.worker.isFetching) {
      return <div className="loader mt-3 loader-big" />;
    }
    console.log(currentWorker.docCode);
    console.log(currentWorker.citizenshipCode);
    return (
      <div className="container edit-worker">
        <h3 className="mt-3">{`ID: ${currentWorker.id} ${currentWorker.firstName}`}</h3>
        <form>
          <div className="form-group">
            <label htmlFor="worker_firstName">firstName</label>
            <input 
              type="text" 
              className="form-control" 
              id="worker_firstName" 
              defaultValue={currentWorker.firstName}
              ref={(input) => { this.firstName = input; }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="worker_lastName">lastName</label>
            <input 
              type="text" 
              className="form-control" 
              id="worker_lastName" 
              defaultValue={currentWorker.lastName}
              ref={(input) => { this.lastName = input; }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="worker_middleName">middleName</label>
            <input 
              type="text" 
              className="form-control" 
              id="worker_middleName" 
              defaultValue={currentWorker.middleName}
              ref={(input) => { this.middleName = input; }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="worker_position">position</label>
            <input 
              type="text" 
              className="form-control" 
              id="worker_position" 
              defaultValue={currentWorker.position}
              ref={(input) => { this.position = input; }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="worker_phone">phone</label>
            <input 
              type="text" 
              className="form-control" 
              id="worker_phone" 
              defaultValue={currentWorker.phone}
              ref={(input) => { this.phone = input; }}
            />
          </div>
          <div className="form-group">
            <select 
              className="form-control" 
              id="sel1"
              disabled={this.props.docs.isFetching}
              defaultValue={String(currentWorker.docCode)}
              ref={(input) => { this.docCode = input; }}
            >
            {this.props.docs.items.map((currentValue) =>    
              <option 
                key={currentValue.code} 
                value={currentValue.code}
              >
              {currentValue.name}
              </option>
            )}
            </select>
          </div> 
          <div className="form-group">
            <label htmlFor="worker_docNumber">docNumber</label>
            <input 
              type="text" 
              className="form-control" 
              id="worker_docNumber" 
              defaultValue={currentWorker.docNumber}
              ref={(input) => { this.docNumber = input; }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="worker_docDate">docDate</label>
            <input 
              type="text" 
              className="form-control" 
              id="worker_docDate" 
              defaultValue={currentWorker.docDate}
              ref={(input) => { this.docDate = input; }}
            />
          </div>
          <div className="form-group">
            <select 
              className="form-control" 
              id="sel2"
              disabled={this.props.countries.isFetching}
              defaultValue={String(currentWorker.citizenshipCode)}
              ref={(input) => { this.citizenshipCode = input; }}
            >
            {this.props.countries.items.map((currentValue) =>    
              <option 
                key={currentValue.code} 
                value={currentValue.code}
              >
              {currentValue.name}
              </option>
            )}
            </select>
          </div> 
          <div className="form-check">
            <input 
              className="form-check-input" 
              type="checkbox" 
              id="worker_isIdentified" 
              defaultChecked={currentWorker.isIdentified}
              ref={(input) => { this.isIdentified = input; }}
            />
            <label className="form-check-label" htmlFor="worker_isIdentified">
              isIdentified
            </label>
          </div>
          <div className="text-center">
            <button 
              className="btn btn-success"
              type="submit"
              onClick={this.handleOnUpdate}
            >
              Save
            </button>
            <Link 
              className="btn btn-secondary" 
              to={`/organizations/${this.orgId}/offices/${this.officeId}/workers`}
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state: IWorkerStateProps & IDirectoryStateProps) {
  return {
    worker: state.worker,
    docs: state.docs,
    countries: state.countries
  };
} 

function mapDispatchToProps(dispatch: Dispatch<object>) {
  return {
    onFetch: (id: number) => {
      dispatch(getWorkerById(id));
    },
    onFetchDirectories: () => {
      dispatch(fetchDocs());
      dispatch(fetchCountries());
    },
    onUpdate: ( id: number, 
                firstName: string, 
                lastName: string,
                middleName: string,
                position: string, 
                phone: string, 
                docCode: number, 
                docName: string, 
                docNumber: string, 
                docDate: string, 
                citizenshipCode: number, 
                citizenshipName: string, 
                isIdentified: boolean ) => {
      dispatch(updateWorker(  id, 
                              firstName, 
                              lastName,
                              middleName,
                              position, 
                              phone, 
                              docCode, 
                              docName, 
                              docNumber, 
                              docDate, 
                              citizenshipCode, 
                              citizenshipName, 
                              isIdentified  ));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditWorker);