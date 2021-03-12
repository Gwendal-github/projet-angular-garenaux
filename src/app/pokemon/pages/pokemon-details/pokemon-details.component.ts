import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Pokemon } from 'src/app/core/models/pokemon';
import { PokemonService } from 'src/app/core/services/http/pokemon.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {

  pokemon$: Observable<Pokemon>;
  pokemon: Pokemon = {id:0,nom:"",attaque:0,defense:0,vitesse:0,typeId:1};

  constructor(private route: ActivatedRoute, private location: Location,private pokemonService: PokemonService) {
    this.pokemon$ = new Observable(() => {});
    this.loadData();
  }

  loadData() {
    this.pokemon$ = this.pokemonService.getById(Number(this.route.snapshot.paramMap.get('id')));
    this.pokemon$.subscribe( res => {
      this.pokemon = {id:res['id'],nom:res['nom'],attaque:res['attaque'],defense:res['defense'],vitesse:res['vitesse'],typeId:res['typeId']};
    });
  }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

}
