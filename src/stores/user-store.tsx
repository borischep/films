import { IUser } from 'interfaces/user.interface';
import { makeAutoObservable } from 'mobx';
import { IRootStore } from './root-store';
 
export class UserStore { 
  user: IUser = { username: '' };

  isLogged = false;
 
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setIsLogged(data: boolean) {
    this.isLogged = data;
  }

  clearStore() {
    this.user = { username: '' };
    this.isLogged = false;
  }

}