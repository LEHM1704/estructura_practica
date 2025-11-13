import { Component } from '@angular/core';
import { PokemonService } from '../../../core/service/pokemon.service';
import { PaginatorState } from 'primeng/paginator';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-list',
  standalone: false,
  templateUrl: './pokemon-list.html',
  styleUrls: ['./pokemon-list.scss'],
})
export class PokemonListComponent implements OnInit {
  // --- Propiedades para los datos y la paginación ---
  pokemons: any[] = [];
  totalRecords: number = 0; // Total de Pokémon para el paginador
  rows: number = 20; // Pokémon por página (limit)

  searchTerm: string = ''; // Para el input de búsqueda

  // 1. Inyectamos el servicio y el router en el constructor
  constructor(
    private pokemonService: PokemonService,
    private router: Router // Lo usaremos para navegar al detalle
  ) {}

  ngOnInit(): void {
    this.loadPokemons(0); // Cargar la primera página (offset = 0)
  }

  // 2. Método para cargar los Pokémon
  loadPokemons(offset: number): void {
    this.pokemonService.getPokemons(this.rows, offset).subscribe((response) => {
      this.pokemons = response.results;
      this.totalRecords = response.count; // La API nos da el total
    });
  }

  // 3. Método para manejar el Paginador de PrimeNG
  // (Este método se conecta al HTML)
  onPageChange(event: PaginatorState) {
    // event.first nos da el 'offset' (ej. 0, 20, 40)
    if (event.first !== undefined) {
      this.loadPokemons(event.first);
    }
  }

  // 4. Método para el buscador
  // (Este método se conecta al HTML)
  onSearch(): void {
    if (this.searchTerm.trim()) {
      // Si hay un término, navegamos a la ruta de detalle
      // (Asumimos que la búsqueda es para ver un Pokémon específico)
      this.router.navigate(['/pokemon', this.searchTerm.toLowerCase().trim()]);
    }
  }

  // 5. Método para navegar al detalle
  // (Lo usaremos al hacer clic en una tarjeta)
  goToDetail(name: string): void {
    this.router.navigate(['/pokemon', name]);
  }
}
