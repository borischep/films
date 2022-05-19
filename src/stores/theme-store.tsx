import { makeAutoObservable } from 'mobx';
import { IRootStore } from './root-store';
 
export class ThemeStore { 
  darkTheme = false;

  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }
 
  setDarkTheme(data: boolean) {
    this.darkTheme = data;
  }

  clearStore() {
    this.darkTheme = false;
  }
}