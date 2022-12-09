import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, map } from 'rxjs';
import { PersonajesService } from 'src/app/services/personajes.service';
import { Character, DBResponse } from '../../interfaces/character.interface';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
})
export class CharactersComponent implements OnInit {
  get personajes() {
    return this.personajesService.personajesBuscados;
  }

  constructor(private personajesService: PersonajesService) {}

  ngOnInit() {
    //Cuando se termina de cargar el componente llamo a la función cargarPersonajes del service para
    //que cargue los personajes
    this.personajesService.cargarPersonajes().subscribe();
  }
}
