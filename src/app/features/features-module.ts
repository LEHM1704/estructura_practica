import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesRoutingModule } from './features-routing-module';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PokemonDetail } from './pokemon/pokemon-detail/pokemon-detail';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [PokemonListComponent, PokemonDetail],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    CardModule,
    ButtonModule,
    PaginatorModule,
    InputTextModule,
    ProgressSpinnerModule,
    FormsModule,
    ToastModule,
  ],
})
export class FeaturesModule {}
