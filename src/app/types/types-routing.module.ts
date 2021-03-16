import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "src/app/shared/components/not-found/not-found.component";
import { TypesListComponent } from "./pages/types-list/types-list.component";
import { TypesComponent } from "./types.component";

const routes: Routes = [
    {
      path: '',
      component: TypesComponent,
      children: [
        {
          path: '',
          pathMatch: 'full',
          redirectTo: "list"
        },
        {
          path: 'list',
          component: TypesListComponent
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
export class TypesRoutingModule { }