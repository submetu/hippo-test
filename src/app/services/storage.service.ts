import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  
  private maxStorageLength = 10;
  constructor() { }

  getItem(key):string{
    return localStorage.getItem(key);
  }
  saveItem(key,value,append?):void{
    let _item;
    try{
      _item = JSON.parse(this.getItem(key));
    }
    catch(e){
      console.log(e);
    }
    if(_item && _item.constructor === Array && append){
      _item.unshift(value);
      //if _item array overflows, get rid of the last element
      if(_item.length > this.maxStorageLength){
       _item = _item.splice(0,this.maxStorageLength)
      }
      localStorage.setItem(key,JSON.stringify(_item));
    }
    else{
      localStorage.setItem(key,JSON.stringify([ value ]))
    }
  }
}
