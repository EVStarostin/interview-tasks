import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { IWorkerStateProps, IDirectoryStateProps } from '../models';
import { saveWorker } from '../actions/workerActions';
import { fetchDocs, fetchCountries } from '../actions/directoryActions';

interface INewWorkerProps extends IWorkerStateProps, IDirectoryStateProps {
  match: { params: { orgId: string, officeId: string }}; 
}

interface IDispatchProps {
  onSave( officeId: number,
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
  onFetchDirectories(): Function;
}

export class NewWorker extends React.Component<INewWorkerProps & IDispatchProps> { 
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

  componentDidMount() {
    this.props.onFetchDirectories();
  }

  handleOnSave = (e: React.SyntheticEvent<object>) => {
    e.preventDefault();

    this.props.onSave(
      this.officeId,
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

    if (this.props.worker.shouldFetch) {
      return <Redirect to={`/organizations/${this.orgId}/offices/${this.officeId}/workers`} />;
    }
    if (this.props.worker.error && !this.props.worker.isFetching) {
      return (
        <div className="container mt-3 loader-big">
          <div className="alert alert-warning">{this.props.worker.error}</div>
          <Link to="/"><h4>Вернуться на главную</h4></Link>
        </div>
      );
    }
    if (this.props.worker.isFetching) {
      return <div className="loader mt-3 loader-big" />;
    }

    return (
      <div className="container edit-worker">
        <h3 className="mt-3">Создание сотрудника</h3>
        <form>
          <div className="form-group">
            <label htmlFor="worker_firstName">firstName</label>
            <input 
              type="text" 
              className="form-control" 
              id="worker_firstName" 
              ref={(input) => { this.firstName = input; }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="worker_lastName">lastName</label>
            <input 
              type="text" 
              className="form-control" 
              id="worker_lastName" 
              ref={(input) => { this.lastName = input; }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="worker_middleName">middleName</label>
            <input 
              type="text" 
              className="form-control" 
              id="worker_middleName" 
              ref={(input) => { this.middleName = input; }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="worker_position">position</label>
            <input 
              type="text" 
              className="form-control" 
              id="worker_position" 
              ref={(input) => { this.position = input; }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="worker_phone">phone</label>
            <input 
              type="text" 
              className="form-control" 
              id="worker_phone" 
              ref={(input) => { this.phone = input; }}
            />
          </div>
          <div className="form-group">
          <select 
            className="form-control" 
            id="sel1"
            disabled={this.props.docs.isFetching}
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
              ref={(input) => { this.docNumber = input; }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="worker_docDate">docDate</label>
            <input 
              type="text" 
              className="form-control" 
              id="worker_docDate" 
              ref={(input) => { this.docDate = input; }}
            />
          </div>
          <div className="form-group">
          <select 
            className="form-control" 
            id="sel2"
            disabled={this.props.countries.isFetching}
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
              onClick={this.handleOnSave}
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
    onSave: ( officeId: number,
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
      dispatch(saveWorker(  officeId,
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
    },
    onFetchDirectories: () => {
      dispatch(fetchDocs());
      dispatch(fetchCountries());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewWorker);