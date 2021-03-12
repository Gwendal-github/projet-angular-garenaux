import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/core/models/pokemon';
import { PokemonService } from 'src/app/core/services/http/pokemon.service';
import { PokemonFormComponent } from '../../components/pokemon-form/pokemon-form.component';
import { MatDialog } from '@angular/material/dialog';
import { GestionTypesService } from 'src/app/core/services/gestion-types.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemons$!: Observable<Pokemon[]>;
  titles = ["id", "nom", "type", "update","delete"];

  constructor(private _pokemonService : PokemonService, public dialog: MatDialog, private _gestionTypeService : GestionTypesService) { 
    this.pokemons$ = new Observable(() => {});
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.pokemons$ = this._pokemonService.get();
    this.pokemons$.subscribe();
  }

  getTypeName(id:number){
    return this._gestionTypeService.getName(id);
  }

  getTypeColor(id:number){
    return this._gestionTypeService.getColor(id);
  }

  openDialog(){

    const dialogRef = this.dialog.open(PokemonFormComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
      this.loadData();
    });
  }
}
