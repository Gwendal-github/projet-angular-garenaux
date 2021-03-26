import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Type } from 'src/app/core/models/type';
import { TypesService } from 'src/app/core/services/http/types.service';
import { TypesListComponent } from '../../pages/types-list/types-list.component';

@Component({
  selector: 'app-update-type-form',
  templateUrl: './update-type-form.component.html',
  styleUrls: ['./update-type-form.component.scss']
})
export class UpdateTypeFormComponent implements OnInit {

  typeForm: FormGroup;



  constructor(private fb: FormBuilder, private typeService : TypesService) { 

    
    this.typeForm = this.fb.group({
      id: [TypesListComponent.selected['id'],[Validators.required]],
      nom: [TypesListComponent.selected['nom'], [Validators.required, this.noWhitespaceValidator]],
      color: [TypesListComponent.selected['color'],[Validators.required, this.isHexaCode, this.noWhitespaceValidator]],
    })
  }

  ngOnInit(): void {
  }

  onSubmit(type: Type){
    if(this.typeForm.valid){
      this.typeService.update(type).subscribe((next)=>{
        console.log("Ajouté");
        this.typeForm.reset();
      });
    }
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;

    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  public isHexaCode(control: FormControl){

    const isHexa = control.value.match("^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$");

    const isValid = isHexa;
    return isValid ? null : { 'notHexa' : true};
  }

}
