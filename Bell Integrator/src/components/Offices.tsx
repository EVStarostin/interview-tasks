import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchOfficesList, deleteOffice } from '../actions/officeActions';
import { IOfficeStateProps } from '../models';
import OfficeItem from './OfficeItem';
import '../styles/Offices.css';

interface IOfficesProps extends IOfficeStateProps {
  match: { params: { orgId: string; }}; 
}

interface IDispatchProps {
  onFetch(orgId: number, name: string, inn: string, isActive: boolean): Function;
  onDelete(id: number): Function;
}

class Offices extends React.Component<IOfficesProps & IDispatchProps> {
  name: HTMLInputElement | null; 
  phone: HTMLInputElement | null; 
  isActive: HTMLInputElement | null; 
  orgId: number = +this.props.match.params.orgId;

  componentDidMount() {
    this.props.onFetch(this.orgId, '', '', false);
  }

  componentWillReceiveProps(nextProps: IOfficeStateProps) {
    if (nextProps.office.shouldFetch) { 
      this.props.onFetch(this.orgId, this.name!.value, this.phone!.value, this.isActive!.checked); 
    }
  }

  handleOnFetch = (e: React.SyntheticEvent<object>) => {
    e.preventDefault();
    this.props.onFetch(this.orgId, this.name!.value, this.phone!.value, this.isActive!.checked);
  }

  render() {
    return (
      <div className="container">
        <div className="offices">
          <h3 className="mt-3">
            <Link to={`/organizations`}> &#8617; </Link>
            Список офисов в организации ID: {this.orgId}
            <Link to={`/organizations/${this.orgId}/offices/new`}> &#10010; </Link>
          </h3>      
          <div className="table-responsive">        
            <table className="table table-hover">

              <thead>
                <tr className="row main__table-row">
                  <th className="col-1">
                    <button 
                      type="submit" 
                      className="btn btn-primary form-control" 
                      disabled={this.props.office.isFetching}
                      onClick={this.handleOnFetch} 
                    > 
                    {this.props.office.isFetching ?
                    <div className="loader" /> :
                    'Find'}
                    </button> 
                  </th>
                  <th className="col-6">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="name" 
                      ref={(input) => { this.name = input; }}
                    />
                  </th>
                  <th className="col-4">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="phone" 
                      ref={(input) => { this.phone = input; }}
                    />
                  </th>
                  <th className="col-1">
                    <label className="font-weight-normal">
                      <input 
                        type="checkbox"
                        ref={(input) => { this.isActive = input; }} 
                      /> 
                      isActive
                    </label>
                  </th>
                </tr>
              </thead>

              <tbody>
                {this.props.office.items.map((currentValue) =>      
                  <OfficeItem 
                    key={currentValue.id}
                    office={currentValue}  
                    delete={this.props.onDelete}
                    orgId={this.orgId}
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

function mapStateToProps(state: IOfficeStateProps) {
  return {
    office: state.office
  };
} 

function mapDispatchToProps(dispatch: Dispatch<object>) {
  return {
    onFetch: (orgId: number, name: string, phone: string, isActive: boolean) => {
      dispatch(fetchOfficesList(orgId, name, phone, isActive));
    },
    onDelete: (id: number) => {
      const isConfirmed = confirm(
        'Are you sure you want delete this?'
      );
      if (isConfirmed) {
        dispatch(deleteOffice(id));
      }
    }
  };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Offices);