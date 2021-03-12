import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { PokemonService } from './services/http/pokemon.service';



@NgModule({
  declarations: [
    HeaderComponent, 
    FooterComponent
  ],

  providers: [
    PokemonService
  ],

  imports: [
    CommonModule,
    MatToolbarModule,
    HttpClientModule
  ],

  exports:  [
    HeaderComponent, 
    FooterComponent
  ]
})
export class CoreModule { }
