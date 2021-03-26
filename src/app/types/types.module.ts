import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TypesRoutingModule } from './types-routing.module';
import { TypesComponent } from './types.component';
import { TypesListComponent } from './pages/types-list/types-list.component';
import { TypesFormComponent } from './components/types-form/types-form.component';
import { FormsModule } from '@angular/forms';
import { UpdateTypeFormComponent } from './components/update-type-form/update-type-form.component';




@NgModule({
  declarations: [TypesComponent, TypesListComponent, TypesFormComponent, UpdateTypeFormComponent],
  imports: [
    CommonModule,
    TypesRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class TypesModule { }