import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Pokemon } from 'src/app/core/models/pokemon';
import { PokemonService } from 'src/app/core/services/http/pokemon.service';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css']
})
export class PokemonFormComponent implements OnInit {

  pokemonForm: FormGroup;

  types: string[] = ['eau','feu','plante'];


  constructor(private fb: FormBuilder, private pokemonService : PokemonService) { 
    this.pokemonForm = this.fb.group({
      nom: ['', [Validators.required, this.noWhitespaceValidator]],
      attaque: ['',[Validators.required]],
      defense: ['',[Validators.required]],
      vitesse: ['',[Validators.required]],
      type: ['',[Validators.required, this.noWhitespaceValidator]],
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
