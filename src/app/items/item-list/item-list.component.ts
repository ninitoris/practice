import { Component, OnInit } from '@angular/core';
import { Mitem } from 'src/app/shared/models/muser.model';
import { Router } from '@angular/router';
import { MitemService } from 'src/app/shared/services/miten.service';

import {Tablesort} from 'src/app/shared/models//tablesort';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {


  items: Mitem[] = [];
  
  searchCat = "";

  constructor(private mitemsService:MitemService, private router: Router) { }


  ngOnInit(): void {
    this.getData();
    new Tablesort(document.getElementById('table'));
  }

  async getData(){
    try{
    let items = this.mitemsService.getAll();
    
    this.items = (await items === null || await items === undefined) ? [] : await items;
    this.UpdateTable();
    }catch(err){
      console.error(err);
    }
  
  }
  
  onLinkProfile(id: number) {
    this.router.navigate([this.router.url, 'profile', id]);
  }
  
  onAddProfile() {
    this.router.navigate([this.router.url, 'profile']);
  }
 
  async onDelete(item: { id: number; }) {
    try {
      await this.mitemsService.deleteOneById(item.id);
  
    } catch (err) {
      console.error(err);
    } finally {
      
      this.getData();
  
    }
  }

  async onPlus(item:number){
    try {
      this.items[item-1].number++;
      await this.mitemsService.putOneById(item,this.items[item-1]);
      this.getData();
    } catch (err) {
      console.error(err);
    } 
  }

  async onMinus(item:number){
    try {
      this.items[item-1].number--;
      if(this.items[item-1].number < 0){
        this.items[item-1].number = 0;
      } 
      await this.mitemsService.putOneById(item,this.items[item-1]);
      
      this.getData();
   
  }catch (err) {
    console.error(err);
    } 
  }

  UpdateTable(){
    console.log(this.items.length);
  }


}
