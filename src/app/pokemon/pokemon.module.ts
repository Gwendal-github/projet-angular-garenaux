import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';
import { PokemonFormComponent } from './components/pokemon-form/pokemon-form.component';
import { UpdatePokemonFormComponent } from './components/update-pokemon-form/update-pokemon-form.component';
import { PokemonComponent } from './pokemon.component';



@NgModule({
  declarations: [PokemonComponent, PokemonListComponent, PokemonFormComponent, UpdatePokemonFormComponent],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    SharedModule
  ]
})
export class PokemonModule { }
