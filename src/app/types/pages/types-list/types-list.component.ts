import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Type } from 'src/app/core/models/type';
import { GestionTypesService } from 'src/app/core/services/gestion-types.service';
import { TypesService } from 'src/app/core/services/http/types.service';
import { TypesFormComponent } from '../../components/types-form/types-form.component';

@Component({
  selector: 'app-types-list',
  templateUrl: './types-list.component.html',
  styleUrls: ['./types-list.component.scss']
})
export class TypesListComponent implements OnInit {

  types$!: Observable<Type[]>;
  titles = ["typeID","typeNom","typeColor"];

  constructor( public dialog: MatDialog, private _gestionTypeService : GestionTypesService, private _typeService: TypesService) { 
    this.types$ = new Observable(() => {});
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.types$ = this._typeService.get();
    this.types$.subscribe();
  }

  async reloadData(){
    await new Promise( resolve => setTimeout(resolve, 100) );
    this.loadData();
  }

  openDialog(){

    const dialogRef = this.dialog.open(TypesFormComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      this.loadData();
    });
  }

  determineFontColor(color : string):string{
    var rgb = this.hexToRgb(color);
    var OpositeColor = ((0.3 * (rgb.r)) + (0.59 * (rgb.g)) + (0.11 * (rgb?.b)) <= 128) ? '#FFF' : '#000';
    return OpositeColor;
  }

  hexToRgb(hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : {
      r: 0,
      g: 0,
      b: 0
    };
  }

}

