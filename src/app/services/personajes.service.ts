import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import {
  Character,
  Info,
  RickAndMorty,
} from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root',
})
export class PersonajesService {
  //_personajes contiene todos los personajes siempre
  private _personajes: Character[] = [];
  //_personajesBuscados solo contiene los personajes que se buscan por la barra de navegación y varía
  private _personajesBuscados: Character[] = [];
  private _pageIndex: number = 1;
  private _responseInfo: Info | undefined;

  constructor(private http: HttpClient) {}

  get personajesBuscados() {
    return this._personajesBuscados;
  }

  get pageIndex() {
    return this._pageIndex;
  }

  get responseInfo() {
    return this._responseInfo;
  }

  cargarPersonajesBuscados(busqueda: string) {
    this._personajesBuscados = this._personajes.filter((personaje) =>
      personaje.name.toLowerCase().includes(busqueda.toLocaleLowerCase())
    );
  }

  nextPage() {
    this._pageIndex++;
    return this.cargarPersonajes();
  }

  previousPage() {
    this._pageIndex--;
    return this.cargarPersonajes();
  }

  selectPage(page: number) {
    this._pageIndex = page;
    return this.cargarPersonajes();
  }

  cargarPersonajes() {
    console.log(this._pageIndex);
    const url = `https://rickandmortyapi.com/api/character?page=${this._pageIndex}`;
    return this.http.get<RickAndMorty>(url).pipe(
      tap((data) => {
        this._personajes = data.results;
        this._personajesBuscados = data.results;
        this._responseInfo = data.info;
      }),
      map((resp) => true), //Le digo que si la petición fue exitosa envíe un true
      catchError((err) => {
        //Y en caso contrario envío un false
        console.log('Ha ocurrido un error al hacer la petición ' + err);
        return of(err);
      })
    );
  }
}
