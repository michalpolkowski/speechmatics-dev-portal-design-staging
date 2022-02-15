import { createContext } from 'react';
import { makeObservable, observable, computed, action, makeAutoObservable } from 'mobx';
import { callGetAccounts, callRemoveApiKey } from './call-api';
import { AuthenticationResult } from '@azure/msal-common';

interface GetAccountsResponse {
  accounts: Account[];
}

interface Account {
  account_id: number;
  contracts: Contract[];
}

interface Contract {
  contract_id: number;
  usage_limit_hrs: number;
  projects: Project[];
}

interface Project {
  project_id: number;
  name: string;
  api_keys: ApiKey[];
}

export interface ApiKey {
  apikey_id: string;
  name: string;
  created_at: string;
  client_ref: string;
}

class AccountContext {
  _account: Account = null;

  constructor() {
    makeObservable(this, {
      clear: action,
      _account: observable,
      assignServerState: action,
    });
  }

  set account(account: Account) {
    this._account = account;
  }

  get account(): Account {
    return this._account;
  }

  clear() {
    this.account = null;
  }

  getApiKeys(): ApiKey[] {
    return this._account?.contracts.filter((con) => !!con)[0].projects.filter((proj) => !!proj)[0]
      .api_keys;
  }

  fetchServerState(idToken: string) {
    callGetAccounts(idToken)
      .then((jsonResp) => {
        this.assignServerState(jsonResp);
      })
      .catch((err) => console.error('fetchServerState', err));
  }

  assignServerState(response: GetAccountsResponse) {
    if (!response) throw new Error('attempt assigning empty response');

    this._account = response.accounts.filter((acc) => !!acc)[0];

    console.log('assignServerState', this._account);
  }
}

class TokenContext {
  tokenPayload: AuthenticationResult = null;

  constructor() {
    makeAutoObservable(this);
  }
}

export const accountStore = new AccountContext();
export const tokenStore = new TokenContext();

export default createContext({ accountStore, tokenStore });