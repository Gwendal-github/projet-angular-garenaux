import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePokemonFormComponent } from './update-pokemon-form.component';

describe('UpdatePokemonFormComponent', () => {
  let component: UpdatePokemonFormComponent;
  let fixture: ComponentFixture<UpdatePokemonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePokemonFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePokemonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
