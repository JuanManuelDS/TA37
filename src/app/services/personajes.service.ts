import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import { Character, DBResponse } from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root',
})
export class PersonajesService {
  //_personajes contiene todos los personajes siempre
  private _personajes: Character[] = [];
  //_personajesBuscados solo contiene los personajes que se buscan por la barra de navegación y varía
  private _personajesBuscados: Character[] = [];

  constructor(private http: HttpClient) {}

  get personajesBuscados() {
    return this._personajesBuscados;
  }

  cargarPersonajesBuscados(busqueda: string) {
    this._personajesBuscados = this._personajes.filter((personaje) =>
      personaje.name.toLowerCase().includes(busqueda.toLocaleLowerCase())
    );
  }

  cargarPersonajes() {
    return this.http.get<DBResponse>('assets/database.json').pipe(
      tap((data) => {
        this._personajes = data.characters;
        this._personajesBuscados = data.characters;
      }),
      map((resp) => true), //Le digo que si la petición fue exitosa envíe un true
      catchError((err) => {
        //Y en caso contrario envío un false
        console.log(
          'Ha ocurrido un error al intentar leer el archivo database.json ' +
            err
        );
        return of(err);
      })
    );
  }
}
