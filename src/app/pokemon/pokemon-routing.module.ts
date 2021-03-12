import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';
import { RouterModule, Routes } from '@angular/router';
import { PokemonComponent } from './pokemon.component';
import { PokemonDetailsComponent } from './pages/pokemon-details/pokemon-details.component';


const routes: Routes = [
  {
    path: '',
    component: PokemonComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: "pokemons"
      },
      {
        path: 'pokemons',
        component: PokemonListComponent
      },
      {
        path: 'pokemons/details/:id',
        component: PokemonDetailsComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonRoutingModule { }
