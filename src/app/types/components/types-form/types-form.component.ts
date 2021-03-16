import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Type } from 'src/app/core/models/type';
import { TypesService } from 'src/app/core/services/http/types.service';

@Component({
  selector: 'app-types-form',
  templateUrl: './types-form.component.html',
  styleUrls: ['./types-form.component.scss']
})
export class TypesFormComponent implements OnInit {

  typeForm: FormGroup;
  color!:string;

  constructor(private fb: FormBuilder, private _typeService : TypesService) { 
    this.typeForm = this.fb.group({
      nom : ['', [Validators.required, this.noWhitespaceValidator]],
      color : ['', [Validators.required, this.noWhitespaceValidator, this.isHexaCode]],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(type: Type){
    if(this.typeForm.valid){
      this._typeService.post(type).subscribe((next)=>{
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
