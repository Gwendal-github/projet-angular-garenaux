import { Injectable } from '@angular/core';
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
        var type:Type= {id:data[i]['id'],nom:data[i]['nom']};
        res[i+1] = type;
      }
      GestionTypesService.types = res;
    });
  }

  public getName(id:number){
    return GestionTypesService.types[id]['nom'];
  }
}
