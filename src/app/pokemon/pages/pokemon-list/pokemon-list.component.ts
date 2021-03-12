import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/core/models/pokemon';
import { PokemonService } from 'src/app/core/services/http/pokemon.service';
import { PokemonFormComponent } from '../../components/pokemon-form/pokemon-form.component';
import { UpdatePokemonFormComponent } from '../../components/update-pokemon-form/update-pokemon-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemons$: Observable<Pokemon[]>;
  static selected: Pokemon;
  titles = ["id", "nom", "type", "update"];

  constructor(private _studentService : PokemonService, public dialog: MatDialog) { 
    this.pokemons$ = new Observable(() => {});
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.pokemons$ = this._studentService.get();
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
