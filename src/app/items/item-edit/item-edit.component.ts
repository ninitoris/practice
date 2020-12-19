import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Mitem } from 'src/app/shared/models/muser.model';
import { MitemService } from 'src/app/shared/services/miten.service';


@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {

  id!: number;
  item!: Mitem;
  mask = [];
  itemForm!: FormGroup;


  constructor(private activatedRouter: ActivatedRoute,
    private mitemsService: MitemService,
    private router: Router) {
    
      this.activatedRouter.params.subscribe((param) => {
        this.id = param.id;
      });
    }

    ngOnInit(): void {

      let maska1 = '^[0-9]+(.[0-9]+)?$';
      let maska2 = /^\d+$/
      this.itemForm = new FormGroup({
  
        name: new FormControl(null,[Validators.required]),
        artikul:  new FormControl(null,[Validators.required]),
        price:  new FormControl(null,[Validators.pattern(maska1), Validators.required]),
        Proizv:  new FormControl(null),
        category: new FormControl(null,[Validators.required]),
        weight: new FormControl(null,[Validators.pattern(maska1), Validators.required]),
        number: new FormControl(null,[Validators.pattern(maska2), Validators.required])
  
  
      });
      this.getData();
    
    }
  
  async getData() {
    if (!(this.id === null || this.id === undefined)) {
      try {
        let item = this.mitemsService.getOneById(this.id);
        this.item = await item;
      } catch (err) {
        console.error(err);
      }
      this.itemForm.patchValue({
       name: this.item.name,
       artikul: this.item.artikul,
       price: this.item.price,
       Proizv:this.item.Proizv,
       category:this.item.category,
       weight:this.item.weight,
       number:this.item.number,
      });
    }
  }

  async onSave() {
    if (!(this.id === null || this.id === undefined)) {
      try {
        await this.mitemsService.putOneById(this.id, this.itemForm.value);
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        let res = await this.mitemsService.postOne(this.itemForm.value);
        this.router.navigate([this.router.url, res.id]);
        this.getData();
      } catch (err) {
        console.error(err);
      }
    }
  }
  
  async onDelete(item: { id: number; }) {
    try {
      console.log(this.item)
      await this.mitemsService.deleteOneById(item.id);

    } catch (err) {
      console.error(err);
    }finally{
      this.getData();
    }
  
  }
}

 
  