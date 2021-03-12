import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Pokemon } from 'src/app/core/models/pokemon';
import { PokemonService } from 'src/app/core/services/http/pokemon.service';
import { Observable } from 'rxjs';
import { GestionTypesService } from 'src/app/core/services/gestion-types.service';
import { Type } from 'src/app/core/models/type';
import { UpdatePokemonFormComponent } from '../../components/update-pokemon-form/update-pokemon-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],

})
export class PokemonDetailsComponent implements OnInit {

  pokemon$: Observable<Pokemon>;
  pokemon: Pokemon = {id:0,nom:"",attaque:0,defense:0,vitesse:0,typeId:1};
  type !: Type;
  static selected: Pokemon;

  constructor( public dialog: MatDialog,private route: ActivatedRoute, private location: Location,private pokemonService: PokemonService,private gestionTypeService : GestionTypesService) {
    this.pokemon$ = new Observable(() => {});
    this.loadData();
  }

  loadData() {
    this.pokemon$ = this.pokemonService.getById(Number(this.route.snapshot.paramMap.get('id')));
    this.pokemon$.subscribe( res => {
      this.pokemon = {id:res['id'],nom:res['nom'],attaque:res['attaque'],defense:res['defense'],vitesse:res['vitesse'],typeId:res['typeId']};
      this.getTypeName();
    },
    (err)=>this.goBack()
    );
  }

  getTypeName(){
    var type$:Observable<Type> = this.gestionTypeService.getTypeById(this.pokemon['typeId']);
    type$.subscribe(res => { this.type = res ;});
  }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  openDialog2(pokemon: Pokemon){
    PokemonDetailsComponent.selected= pokemon;

    const dialogRef = this.dialog.open(UpdatePokemonFormComponent);

    dialogRef.afterClosed().subscribe(() => {

      this.loadData();
    });
  }

}
