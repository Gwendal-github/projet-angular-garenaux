import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
      children: [
        {
          path: '',
          pathMatch: 'full',
          redirectTo: "pokemons"
        },
        {
          path:'pokemons',
          loadChildren: () => import('./pokemon/pokemon.module').then(m => m.PokemonModule)
        },
        {
          path: 'types',
          loadChildren: () => import('./types/types.module').then(m => m.TypesModule)
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
