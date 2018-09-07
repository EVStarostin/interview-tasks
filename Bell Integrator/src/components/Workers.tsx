import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchWorkersList, deleteWorker } from '../actions/workerActions';
import { fetchDocs, fetchCountries } from '../actions/directoryActions';
import { IWorkerStateProps, IDirectoryStateProps } from '../models';
import { WorkerItem } from './WorkerItem';
import '../styles/Workers.css';

interface IWorkersProps extends IWorkerStateProps, IDirectoryStateProps {
  match: { params: { orgId: string; officeId: string}}; 
}

interface IDispatchProps {
  onFetch(  officeId: number, 
            firstName: string, 
            lastName: string, 
            middleName: string,  
            position: string,
            docCode: number,
            citizenshipCode: number ): Function;
  onFetchDirectories(): Function;
  onDelete(id: number): Function;
}

class Workers extends React.Component<IWorkersProps & IDispatchProps> {
  firstName: HTMLInputElement | null; 
  lastName: HTMLInputElement | null; 
  middleName: HTMLInputElement | null; 
  position: HTMLInputElement | null; 
  docCode: HTMLSelectElement | null;
  citizenshipCode: HTMLSelectElement | null;
  orgId: number = +this.props.match.params.orgId;
  officeId: number = +this.props.match.params.officeId;

  componentDidMount() {
    this.props.onFetch(this.officeId, '', '', '', '', 21, 643);
    this.props.onFetchDirectories();
  }

  componentWillReceiveProps(nextProps: IWorkerStateProps) {
    if (nextProps.worker.shouldFetch) { 
      this.props.onFetch( this.officeId, 
                          this.firstName!.value, 
                          this.lastName!.value, 
                          this.middleName!.value,
                          this.position!.value,
                          +this.docCode!.value,
                          +this.citizenshipCode!.value  ); 
    }
  }

  handleOnFetch = (e: React.SyntheticEvent<object>) => {
    e.preventDefault();
    this.props.onFetch( this.officeId, 
                        this.firstName!.value, 
                        this.lastName!.value, 
                        this.middleName!.value,
                        this.position!.value,
                        +this.docCode!.value,
                        +this.citizenshipCode!.value  );
  }

  render() {
    return (
      <div className="container">
        <div className="workers">
        <h3 className="mt-3">
          <Link to={`/organizations/${this.orgId}/offices`}> &#8617; </Link>
          Список сотрудников в офисе ID: {this.officeId}
          <Link to={`/organizations/${this.orgId}/offices/${this.officeId}/workers/new`}> &#10010; </Link>
        </h3>    
        <div className="table-responsive">
          <table className="table table-hover">
    
            <thead>
              <tr className="row main__table-row">
                <th className="col-6">
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
                </th>
                <th className="col-6">
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
                </th>
                <th className="col-1">
                  <button 
                    type="submit" 
                    className="btn btn-primary form-control" 
                    disabled={this.props.worker.isFetching}
                    onClick={this.handleOnFetch} 
                  > 
                  {this.props.worker.isFetching ?
                  <div className="loader" /> :
                  'Find'}
                  </button> 
                </th>
                <th className="col-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="lastName" 
                    ref={(input) => { this.lastName = input; }}
                  />
                </th>
                <th className="col-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="firstName" 
                    ref={(input) => { this.firstName = input; }}
                  />
                </th>
                <th className="col-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="middleName" 
                    ref={(input) => { this.middleName = input; }}
                  />
                </th>
                <th className="col-2">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="position" 
                    ref={(input) => { this.position = input; }}
                  />
                </th>
              </tr>
            </thead>
    
            <tbody>  	
              {this.props.worker.items.map((currentValue) =>    
                <WorkerItem 
                  key={currentValue.id}
                  worker={currentValue}  
                  delete={this.props.onDelete}
                  orgId={this.orgId}
                  officeId={this.officeId}
                />
              )}
            </tbody>
    
            </table>
          </div>
        </div>
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
    onFetch: (  officeId: number, 
                firstName: string, 
                lastName: string, 
                middleName: string,  
                position: string,
                docCode: number,
                citizenshipCode: number ) => {
      dispatch(fetchWorkersList(  officeId, 
                                  firstName, 
                                  lastName, 
                                  middleName, 
                                  position, 
                                  docCode, 
                                  citizenshipCode ));
    },
    onFetchDirectories: () => {
      dispatch(fetchDocs());
      dispatch(fetchCountries());
    },
    onDelete: (id: number) => {
      const isConfirmed = confirm(
        'Are you sure you want delete this?'
      );
      if (isConfirmed) {
        dispatch(deleteWorker(id));
      }
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Workers);