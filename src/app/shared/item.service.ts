import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Injectable({
  providedIn: 'root'
})
export class ItemService {


  constructor(private firebase: AngularFireDatabase) { }
  itemList: AngularFireList<any>;

  form = new FormGroup({
  	$key: new FormControl(null),
  	groceryItem: new FormControl('', Validators.required)
  });

  getItems(){
  	this.itemList = this.firebase.list('items');
  	return this.itemList.snapshotChanges();
  }

  insertItem(item){
  	this.itemList.push({
  		groceryItem: item.groceryItem
  	});
  }

  deleteItem($key: string){
    this.itemList.remove($key);
  }
}
