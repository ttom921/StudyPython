import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketIoDataService {
  _curnamespace = "";
  _nsDataSource: BehaviorSubject<string[]>;
  _namespacelst: string[] = [];

  constructor() {
    this._nsDataSource = <BehaviorSubject<string[]>>new BehaviorSubject([]);
  }
  setCurrentNameSpace(ns: string) {
    this._curnamespace = ns;
  }
  getCurrentNameSpace(): string {
    return this._curnamespace;
  }
  setNameSpacelst(lst: string[]) {
    this._namespacelst = lst;
  }
  getNameSpacelst(): string[] {
    return this._namespacelst;
  }

  // nsDataSource: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  // nsData = this.nsDataSource.asObservable();
  // UpdateNameSpacelst(data) {
  //   this.nsDataSource.next(data);
  // }
  // addNamespace(dataObj) {
  //   const currentValue = this.nsDataSource.value;
  //   const updatedValue = [...currentValue, dataObj];
  //   this.nsDataSource.next(updatedValue);
  // }
  // add(ns:string){
  //   this.namespacelst.push(ns);
  // }
  // clear(){
  //   this.namespacelst=[];
  // }
  // getNameSpaceLst():Observable<string[]>{
  //   return 
  // }
  // private namespacelstSource = new BehaviorSubject([]);
  // currentnameSpacelst= this.namespacelstSource.asObservable();
  // constructor() { }
  // addNameSpace
}
