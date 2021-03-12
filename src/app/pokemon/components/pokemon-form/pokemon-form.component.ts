import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Pokemon } from 'src/app/core/models/pokemon';
import { GestionTypesService } from 'src/app/core/services/gestion-types.service';
import { PokemonService } from 'src/app/core/services/http/pokemon.service';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css']
})
export class PokemonFormComponent implements OnInit {

  pokemonForm: FormGroup;

  types: String[] = this.gestionTypeService.getTypesNames();


  constructor(private fb: FormBuilder, private pokemonService : PokemonService,private gestionTypeService : GestionTypesService) { 
    this.pokemonForm = this.fb.group({
      nom: ['', [Validators.required, this.noWhitespaceValidator]],
      attaque: ['',[Validators.required]],
      defense: ['',[Validators.required]],
      vitesse: ['',[Validators.required]],
      type: ['',[Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  onSubmit(pokemon: Pokemon){
    console.log(this.pokemonForm.value);
    if(this.pokemonForm.valid){
      pokemon.typeId = this.gestionTypeService.getIdByName(this.pokemonForm.value.type);
      this.pokemonService.post(pokemon).subscribe((next)=>{
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
