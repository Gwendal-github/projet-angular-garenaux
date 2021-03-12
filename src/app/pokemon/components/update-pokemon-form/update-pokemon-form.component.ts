import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Pokemon } from 'src/app/core/models/pokemon';
import { GestionTypesService } from 'src/app/core/services/gestion-types.service';
import { PokemonService } from 'src/app/core/services/http/pokemon.service';
import { PokemonDetailsComponent } from '../../pages/pokemon-details/pokemon-details.component';
import { PokemonListComponent } from '../../pages/pokemon-list/pokemon-list.component';

@Component({
  selector: 'app-update-pokemon-form',
  templateUrl: './update-pokemon-form.component.html',
  styleUrls: ['./update-pokemon-form.component.css']
})
export class UpdatePokemonFormComponent implements OnInit {

  pokemonForm: FormGroup;

  types: String[] = this.gestionTypeService.getTypesNames();


  constructor(private fb: FormBuilder, private pokemonService : PokemonService, private gestionTypeService : GestionTypesService) { 
    this.pokemonForm = this.fb.group({
      id: [PokemonDetailsComponent.selected['id'],[Validators.required]],
      nom: [PokemonDetailsComponent.selected['nom'], [Validators.required, this.noWhitespaceValidator]],
      attaque: [PokemonDetailsComponent.selected['attaque'],[Validators.required]],
      defense: [PokemonDetailsComponent.selected['defense'],[Validators.required]],
      vitesse: [PokemonDetailsComponent.selected['vitesse'],[Validators.required]],
      type: [gestionTypeService.getName(PokemonDetailsComponent.selected['typeId']),[Validators.required, this.noWhitespaceValidator]],
    })
  }

  ngOnInit(): void {
  }

  onSubmit(pokemon: Pokemon){
    if(this.pokemonForm.valid){
      pokemon.typeId = this.gestionTypeService.getIdByName(this.pokemonForm.value.type);
      this.pokemonService.update(pokemon).subscribe((next)=>{
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
