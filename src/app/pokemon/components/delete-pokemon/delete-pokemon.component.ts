import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/core/services/http/pokemon.service';

@Component({
  selector: 'app-delete-pokemon',
  templateUrl: './delete-pokemon.component.html',
  styleUrls: ['./delete-pokemon.component.scss']
})
export class DeletePokemonComponent implements OnInit {

  @Input() toDelete!: number ;

  constructor(private pokemonService : PokemonService, private router: Router) { }

  ngOnInit(): void {
  }

  onClick(){
    const x = this.pokemonService.delete(this.toDelete);
    //await this.delay(1000);
    x.subscribe(()=>this.router.navigateByUrl('/pokemons'));  
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
