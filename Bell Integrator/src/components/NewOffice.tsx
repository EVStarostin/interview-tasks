import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { IOfficeStateProps } from '../models';
import { saveOffice } from '../actions/officeActions';

interface INewOfficeProps extends IOfficeStateProps {
  match: { params: { orgId: string }}; 
}

interface IDispatchProps {
  onSave( orgId: number,
          name: string, 
          address: string, 
          phone: string, 
          isActive: boolean ): Function;
}

export class NewOffice extends React.Component<INewOfficeProps & IDispatchProps> { 
  name: HTMLInputElement | null; 
  address: HTMLInputElement | null; 
  phone: HTMLInputElement | null; 
  isActive: HTMLInputElement | null; 
  orgId: number = +this.props.match.params.orgId;

  handleOnSave = (e: React.SyntheticEvent<object>) => {
    e.preventDefault();
    this.props.onSave(
      this.orgId,
      this.name!.value,
      this.address!.value,
      this.phone!.value,
      this.isActive!.checked
    );
  }
  
  render() {

    if (this.props.office.shouldFetch) {
      return <Redirect to={`/organizations/${this.orgId}/offices`} />;
    }
    if (this.props.office.error && !this.props.office.isFetching) {
      return (
        <div className="container mt-3 loader-big">
          <div className="alert alert-warning">{this.props.office.error}</div>
          <Link to="/"><h4>Вернуться на главную</h4></Link>
        </div>
      );
    }
    if (this.props.office.isFetching) {
      return <div className="loader mt-3 loader-big" />;
    }

    return (
      <div className="container edit-office">
        <h3 className="mt-3">Создание офиса</h3>
        <form>
          <div className="form-group">
            <label htmlFor="org_name">name</label>
            <input 
              type="text" 
              className="form-control" 
              id="org_name" 
              ref={(input) => { this.name = input; }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="org_address">address</label>
            <input 
              type="text" 
              className="form-control" 
              id="org_address" 
              ref={(input) => { this.address = input; }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="org_phone">phone</label>
            <input 
              type="text" 
              className="form-control" 
              id="org_phone" 
              ref={(input) => { this.phone = input; }}
            />
          </div>
          <div className="form-check">
            <input 
              className="form-check-input" 
              type="checkbox" 
              id="org_isActive" 
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
              onClick={this.handleOnSave}
            >
            Save
            </button>
            <Link 
              className="btn btn-secondary" 
              to={`/organizations/${this.orgId}/offices`}
            >
            Cancel
            </Link>
          </div>
        </form>
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
    onSave: ( orgId: number,
              name: string, 
              address: string, 
              phone: string, 
              isActive: boolean ) => {
      dispatch(saveOffice(orgId, name, address, phone, isActive));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewOffice);