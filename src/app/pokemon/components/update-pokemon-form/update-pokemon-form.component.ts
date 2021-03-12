import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Pokemon } from 'src/app/core/models/pokemon';
import { GestionTypesService } from 'src/app/core/services/gestion-types.service';
import { PokemonService } from 'src/app/core/services/http/pokemon.service';
import { PokemonListComponent } from '../../pages/pokemon-list/pokemon-list.component';

@Component({
  selector: 'app-update-pokemon-form',
  templateUrl: './update-pokemon-form.component.html',
  styleUrls: ['./update-pokemon-form.component.css']
})
export class UpdatePokemonFormComponent implements OnInit {

  pokemonForm: FormGroup;

  types: string[] = ['eau','feu','plante'];


  constructor(private fb: FormBuilder, private pokemonService : PokemonService, private gestionTypeService : GestionTypesService) { 
    this.pokemonForm = this.fb.group({
      id: [PokemonListComponent.selected['id'],[Validators.required]],
      nom: [PokemonListComponent.selected['nom'], [Validators.required, this.noWhitespaceValidator]],
      attaque: [PokemonListComponent.selected['attaque'],[Validators.required]],
      defense: [PokemonListComponent.selected['defense'],[Validators.required]],
      vitesse: [PokemonListComponent.selected['vitesse'],[Validators.required]],
      type: [gestionTypeService.getName(PokemonListComponent.selected['id']),[Validators.required, this.noWhitespaceValidator]],
    })
  }

  ngOnInit(): void {
  }

  onSubmit(pokemon: Pokemon){
    if(this.pokemonForm.valid){
      this.pokemonService.post(pokemon).subscribe((next)=>{
        console.log("Ajouté");
        this.pokemonForm.reset();
      });
    }
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;

    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

}
