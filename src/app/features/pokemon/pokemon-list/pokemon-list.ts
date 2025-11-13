import { Component } from '@angular/core';
import { PokemonService } from '../../../core/service/pokemon.service';
import { PaginatorState } from 'primeng/paginator';
import { ActivatedRoute, Router } from '@angular/router';
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
  first: number = 0;

  searchTerm: string = ''; // Para el input de búsqueda

  // 1. Inyectamos el servicio y el router en el constructor
  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // 4. ESCUCHAR LA URL
    // Cada vez que la URL cambie (?page=1, ?page=2), se ejecuta esto
    this.route.queryParams.subscribe((params) => {
      const page = params['page'] || 1; // Si no hay page, es la 1

      // Calculamos el offset basado en la página de la URL
      // Página 1 -> offset 0
      // Página 2 -> offset 20
      this.first = (page - 1) * this.rows;

      this.loadPokemons(this.first);
    });
  }

  getPokemonImage(url: string): string {
    // La URL es tipo: https://pokeapi.co/api/v2/pokemon/25/
    // Partimos el string por '/' y el ID suele estar en la penúltima posición
    const splitUrl = url.split('/');
    const id = splitUrl[splitUrl.length - 2];

    // Usamos la URL de "official-artwork" que tiene mejor calidad
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
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
    if (event.first !== undefined && event.rows !== undefined) {
      // Calculamos el número de página (ej: offset 20 / 20 rows + 1 = Página 2)
      const page = event.first / event.rows + 1;

      // Navegamos añadiendo el query param
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: page },
        queryParamsHandling: 'merge', // Mantiene otros filtros si existieran
      });
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
