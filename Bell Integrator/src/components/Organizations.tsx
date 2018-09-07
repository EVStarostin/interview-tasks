import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchOrganizationsList, deleteOrganization } from '../actions/organizationActions';
import { IOrganizationStateProps } from '../models';
import { OrganizationItem } from './OrganizationItem';
import '../styles/Organizations.css';

interface IDispatchProps {
  onFetch(name: string, inn: string, isActive: boolean): Function;
  onDelete(id: number): Function;
}

class Organizations extends React.Component<IOrganizationStateProps & IDispatchProps> { 
  name: HTMLInputElement | null; 
  inn: HTMLInputElement | null; 
  isActive: HTMLInputElement | null; 

  componentDidMount() {
    this.props.onFetch('', '', false);
  }

  componentWillReceiveProps(nextProps: IOrganizationStateProps) {
    if (nextProps.organization.shouldFetch) { 
      this.props.onFetch(this.name!.value, this.inn!.value, this.isActive!.checked); 
    }
  }

  handleOnFetch = (e: React.SyntheticEvent<object>) => {
    e.preventDefault();
    this.props.onFetch(this.name!.value, this.inn!.value, this.isActive!.checked);
  }

  render() {
    return (
      <div className="container">
        <div className="organizations">
          <h3 className="mt-3">
            Организации
            <Link to="/organizations/new"> &#10010; </Link>
           </h3>      
          <div className="table-responsive">          
            <table className="table table-hover">

              <thead>
                <tr className="row main__table-row">
                  <th className="col-1">
                    <button 
                      type="submit" 
                      className="btn btn-primary form-control" 
                      disabled={this.props.organization.isFetching}
                      onClick={this.handleOnFetch} 
                    > 
                    {this.props.organization.isFetching ?
                    <div className="loader" /> :
                    'Find'}
                    </button>
                  </th>
                  <th className="col-3">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="inn" 
                      ref={(input) => { this.inn = input; }}
                    />
                  </th>
                  <th className="col-7">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="name" 
                      ref={(input) => { this.name = input; }}
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
                {this.props.organization.items.map((currentValue) =>      
                  <OrganizationItem 
                    key={currentValue.id}
                    organization={currentValue}  
                    delete={this.props.onDelete}
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

function mapStateToProps(state: IOrganizationStateProps) {
  return {
    organization: state.organization
  };
} 

function mapDispatchToProps(dispatch: Dispatch<object>) {
  return {
    onFetch: (name: string, inn: string, isActive: boolean) => {
      dispatch(fetchOrganizationsList(name, inn, isActive));
    },
    onDelete: (id: number) => {
      const isConfirmed = confirm(
        'Are you sure you want delete this?'
      );
      if (isConfirmed) {
        dispatch(deleteOrganization(id));
      }
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Organizations);