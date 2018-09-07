export interface IAction {
  type: string; 
  payload: string | number;
}

export interface IJson {
  data?: object[];
  error?: string; 
  result?: string;
}

export interface IAuthStoreState {
  isLoggedIn: boolean;
  login: string | null;
  isFetching: boolean;
  error: string | null;
}
export interface IAuthStateProps { 
  auth: IAuthStoreState;
}

export interface IOrganization {
  id: number;
  name: string;
  fullName: string;
  inn: string;
  kpp: string;
  address: string;
  phone: string;
  isActive: boolean;
}
export interface IOrganizationStoreState { 
  items: IOrganization[];
  shouldFetch: boolean;
  isFetching: boolean;
  error: string | null;
}
export interface IOrganizationStateProps { 
  organization: IOrganizationStoreState;
}

export interface IOffice {
  id: number;
  orgId: number;
  name: string;
  address: string;
  phone: string;
  isActive: boolean;
}
export interface IOfficeStoreState { 
  items: IOffice[];
  shouldFetch: boolean;
  isFetching: boolean;
  error: string | null;
}
export interface IOfficeStateProps { 
  office: IOfficeStoreState;
}

export interface IWorker {
  id: number;
  officeId: number;
  firstName: string;
  lastName: string;
  middleName: string;
  position: string;
  phone: string;
  docCode: number;
  docName: string;
  docNumber: string;
  docDate: string;
  citizenshipName: string;
  citizenshipCode: number;
  isIdentified: boolean;
}
export interface IWorkerStoreState { 
  items: IWorker[];
  shouldFetch: boolean;
  isFetching: boolean;
  error: string | null;
}
export interface IWorkerStateProps { 
  worker: IWorkerStoreState;
}

export interface IDirectory {
  code: number;
  name: string;
}
export interface IDirectoryStoreState {
  items: IDirectory[];
  isFetching: boolean;
  error: string | null;
}
export interface IDirectoryStateProps { 
  docs: IDirectoryStoreState;
  countries: IDirectoryStoreState;
}

export type IStateProps = IAuthStateProps & 
                          IOrganizationStateProps & 
                          IOfficeStateProps & 
                          IWorkerStateProps & 
                          IDirectoryStateProps;