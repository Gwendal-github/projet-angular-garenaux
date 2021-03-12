import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/core/models/pokemon';
import { PokemonService } from 'src/app/core/services/http/pokemon.service';
import { PokemonFormComponent } from '../../components/pokemon-form/pokemon-form.component';
import { UpdatePokemonFormComponent } from '../../components/update-pokemon-form/update-pokemon-form.component';
import { MatDialog } from '@angular/material/dialog';
import { TypesService } from 'src/app/core/services/http/types.service';
import { Type } from 'src/app/core/models/type';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemons$!: Observable<Pokemon[]>;
  static selected: Pokemon;
  static types:Type[];
  titles = ["id", "nom", "type", "update"];

  constructor(private _pokemonService : PokemonService, public dialog: MatDialog, private _typeService : TypesService) { 
    this.pokemons$ = new Observable(() => {});
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.pokemons$ = this._pokemonService.get();
    this.getTypes();
  }

  getTypes() {
    const query = this._typeService.get().subscribe(data => {
      var res:Type[] = []; 
      for(var i:number=0;i<data.length;i++){
        var type:Type= {id:data[i]['id'],nom:data[i]['nom']};
        res[i+1] = type;
        console.log(res);
      }
      PokemonListComponent.types = res;
    });
  }

  getTypeName(id:number){
    return PokemonListComponent.types[id]["nom"];
  }

  openDialog(){

    const dialogRef = this.dialog.open(PokemonFormComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
      this.loadData();
    });
  }

  openDialog2(pokemon: Pokemon){
    PokemonListComponent.selected= pokemon;

    const dialogRef = this.dialog.open(UpdatePokemonFormComponent);

    dialogRef.afterClosed().subscribe(() => {

      this.loadData();
    });
  }


}
