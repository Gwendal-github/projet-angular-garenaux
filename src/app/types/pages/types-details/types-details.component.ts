import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PokemonFormComponent } from 'src/app/pokemon/components/pokemon-form/pokemon-form.component';

@Component({
  selector: 'app-types-details',
  templateUrl: './types-details.component.html',
  styleUrls: ['./types-details.component.scss']
})
export class TypesDetailsComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(){

    const dialogRef = this.dialog.open(PokemonFormComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('ok');
    });
  }

}
