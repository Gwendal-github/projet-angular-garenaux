import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Type } from 'src/app/core/models/type';
import { TypesService } from 'src/app/core/services/http/types.service';

@Injectable({
  providedIn: 'root'
})
export class GestionTypesService {

  static types:Type[];

  constructor(private ts:TypesService) {
    this.getTypes();
  }

  ngOnInit(): void {
    
  }

  
  getTypes() {
    const query = this.ts.get().subscribe(data => {
      var res:Type[] = []; 
      for(var i:number=0;i<data.length;i++){
        var type:Type= {id:data[i]['id'],nom:data[i]['nom'],color:data[i]['color']};
        res[i+1] = type;
      }
      GestionTypesService.types = res;
    });
  }

  public getTypesNames(): String[]{
    var types:String[]= [];
    GestionTypesService.types.forEach(function(value){
      types.push(value["nom"]);
    });
    return types;
  }

  public getIdByName(name:String): number{
    var res=1;
    GestionTypesService.types.forEach(function(value){
      if(name==value["nom"]){
        res = Number(value["id"]);
      }
    });
    return res;
  }

  public getTypeById(id:number): Observable<Type> {
    return this.ts.getById(id);
  }

  public getName(id:number){
    return GestionTypesService.types[id]['nom'];
  }

  public getColor(id:number){
    return GestionTypesService.types[id]['color'];
  }
}
