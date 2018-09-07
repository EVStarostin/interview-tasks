import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { IOfficeStateProps } from '../models';
import { getOfficeById, updateOffice } from '../actions/officeActions';
import '../styles/EditOffice.css';

interface IEditOfficeProps extends IOfficeStateProps {
  match: { params: { orgId: string; officeId: string; }}; 
}

interface IDispatchProps {
  onUpdate( id: number, 
            name: string, 
            address: string, 
            phone: string, 
            isActive: boolean ): Function;
  onFetch(id: number): Function;
}

export class EditOffice extends React.Component<IEditOfficeProps & IDispatchProps> { 
  name: HTMLInputElement | null; 
  fullName: HTMLInputElement | null; 
  inn: HTMLInputElement | null; 
  kpp: HTMLInputElement | null; 
  address: HTMLInputElement | null; 
  phone: HTMLInputElement | null; 
  isActive: HTMLInputElement | null; 
  orgId: number = +this.props.match.params.orgId;
  officeId: number = +this.props.match.params.officeId;

  componentDidMount() {
    this.props.onFetch(this.officeId);
  }

  handleOnUpdate = (e: React.SyntheticEvent<object>) => {
    e.preventDefault();
    this.props.onUpdate(
      this.officeId,
      this.name!.value,
      this.address!.value,
      this.phone!.value,
      this.isActive!.checked
    );
  }
  
  render() {

    const currentOffice = this.props.office.items[0];

    if (this.props.office.shouldFetch) {
      return <Redirect to={`/organizations/${this.orgId}/offices`} />;
    }
    if (!currentOffice && !this.props.office.isFetching) {
      return (
        <div className="container mt-3">
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
        <h3 className="mt-3">{`ID: ${currentOffice.id} ${currentOffice.name}`}</h3>
        <form>
          <div className="form-group">
            <label htmlFor="office_name">name</label>
            <input 
              type="text" 
              className="form-control" 
              id="office_name" 
              defaultValue={currentOffice.name}
              ref={(input) => { this.name = input; }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="office_address">address</label>
            <input 
              type="text" 
              className="form-control" 
              id="office_address" 
              defaultValue={currentOffice.address}
              ref={(input) => { this.address = input; }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="office_phone">phone</label>
            <input 
              type="text" 
              className="form-control" 
              id="office_phone" 
              defaultValue={currentOffice.phone}
              ref={(input) => { this.phone = input; }}
            />
          </div>
          <div className="form-check">
            <input 
              className="form-check-input" 
              type="checkbox" 
              id="office_isActive" 
              defaultChecked={currentOffice.isActive}
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
            <Link className="btn btn-secondary" to="/organizations/1/offices">Cancel</Link>
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
    onFetch: (id: number) => {
      dispatch(getOfficeById(id));
    },
    onUpdate: ( id: number, 
                name: string, 
                address: string, 
                phone: string, 
                isActive: boolean ) => {

      dispatch(updateOffice(id, name, address, phone, isActive));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditOffice);