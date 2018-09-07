import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { IOrganizationStateProps } from '../models';
import { getOrganizationById, updateOrganization } from '../actions/organizationActions';
import '../styles/EditOrganization.css';

interface IEditOrganizationProps extends IOrganizationStateProps {
  match: { params: { orgId: string; }}; 
}

interface IDispatchProps {
  onUpdate( id: number, 
            name: string, 
            fullName: string, 
            inn: string, 
            kpp: string, 
            address: string, 
            phone: string, 
            isActive: boolean ): Function;
  onFetch(id: number): Function;
}

export class EditOrganization extends React.Component<IEditOrganizationProps & IDispatchProps> { 
  name: HTMLInputElement | null; 
  fullName: HTMLInputElement | null; 
  inn: HTMLInputElement | null; 
  kpp: HTMLInputElement | null; 
  address: HTMLInputElement | null; 
  phone: HTMLInputElement | null; 
  isActive: HTMLInputElement | null; 
  orgId: number = +this.props.match.params.orgId;

  componentDidMount() {
    this.props.onFetch(this.orgId);
  }

  handleOnUpdate = (e: React.SyntheticEvent<object>) => {
    e.preventDefault();
    this.props.onUpdate(
      this.orgId,
      this.name!.value,
      this.fullName!.value,
      this.inn!.value,
      this.kpp!.value,
      this.address!.value,
      this.phone!.value,
      this.isActive!.checked
    );
  }
  
  render() {

    const currentOrg = this.props.organization.items[0];

    if (this.props.organization.shouldFetch) {
      return <Redirect to="/organizations" />;
    }
    if (!currentOrg && !this.props.organization.isFetching) {
      return (
        <div className="container mt-3">
          <div className="alert alert-warning">{this.props.organization.error}</div>
          <Link to="/"><h4>Вернуться на главную</h4></Link>
        </div>
      );
    }
    if (this.props.organization.isFetching) {
      return <div className="loader mt-3 loader-big" />;
    }

    return (
      <div className="container edit-organization">
        <h3 className="mt-3">{`ID: ${currentOrg.id} ${currentOrg.name}`}</h3>
        <form>
          <div className="form-group">
            <label htmlFor="org_name">name</label>
            <input 
              type="text" 
              className="form-control" 
              id="org_name" 
              defaultValue={currentOrg.name}
              ref={(input) => { this.name = input; }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="org_fullName">fullName</label>
            <input 
              type="text" 
              className="form-control" 
              id="org_fullName" 
              defaultValue={currentOrg.fullName}
              ref={(input) => { this.fullName = input; }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="org_inn">inn</label>
            <input 
              type="text" 
              className="form-control" 
              id="org_inn" 
              defaultValue={currentOrg.inn}
              ref={(input) => { this.inn = input; }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="org_kpp">kpp</label>
            <input 
              type="text" 
              className="form-control" 
              id="org_kpp" 
              defaultValue={currentOrg.kpp}
              ref={(input) => { this.kpp = input; }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="org_address">address</label>
            <input 
              type="text" 
              className="form-control" 
              id="org_address" 
              defaultValue={currentOrg.address}
              ref={(input) => { this.address = input; }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="org_phone">phone</label>
            <input 
              type="text" 
              className="form-control" 
              id="org_phone" 
              defaultValue={currentOrg.phone}
              ref={(input) => { this.phone = input; }}
            />
          </div>
          <div className="form-check">
            <input 
              className="form-check-input" 
              type="checkbox" 
              id="org_isActive" 
              defaultChecked={currentOrg.isActive}
              ref={(input) => { this.isActive = input; }}
            />
            <label className="form-check-label" htmlFor="org_isActive">
              isActive
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
            <Link className="btn btn-secondary" to="/organizations">Cancel</Link>
          </div>
        </form>
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
    onFetch: (id: number) => {
      dispatch(getOrganizationById(id));
    },
    onUpdate: ( id: number, 
                name: string, 
                fullName: string, 
                inn: string, 
                kpp: string, 
                address: string, 
                phone: string, 
                isActive: boolean ) => {

      dispatch(updateOrganization(id, name, fullName, inn, kpp, address, phone, isActive));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditOrganization);