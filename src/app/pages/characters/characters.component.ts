import { Component, OnInit } from '@angular/core';
import { PersonajesService } from 'src/app/services/personajes.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
})
export class CharactersComponent implements OnInit {
  get personajes() {
    return this.personajesService.personajesBuscados;
  }

  get pageIndex() {
    return this.personajesService.pageIndex;
  }

  constructor(private personajesService: PersonajesService) {}

  ngOnInit() {
    //Cuando se termina de cargar el componente llamo a la función cargarPersonajes del service para
    //que cargue los personajes
    this.personajesService.cargarPersonajes().subscribe();
  }

  siguientePagina() {
    this.personajesService.nextPage().subscribe();
  }

  paginaAnterior() {
    if (this.pageIndex > 1) {
      this.personajesService.previousPage().subscribe();
    }
  }

  seleccionarPagina(num: number) {
    this.personajesService.selectPage(num).subscribe();
  }
}
