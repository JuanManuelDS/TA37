import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CharactersComponent } from './characters/characters.component';

@NgModule({
  declarations: [HomeComponent, AboutComponent, CharactersComponent],
  imports: [CommonModule, HttpClientModule, PagesRoutingModule],
})
export class PagesModule {}
