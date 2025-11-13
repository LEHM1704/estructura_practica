import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../../core/service/pokemon.service'; // (Asegúrate que tu ruta sea la correcta)

// 1. IMPORTA ESTO
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pokemon-detail',
  standalone: false,
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.scss',
  providers: [MessageService], // 2. ¡MUY IMPORTANTE! Añade el provider aquí
})
export class PokemonDetail implements OnInit {
  pokemon: any = null;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService,
    private messageService: MessageService // 3. Inyecta el servicio
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const name = params['name'];
      if (name) {
        this.loadPokemon(name);
      }
    });
  }

  loadPokemon(name: string) {
    this.loading = true; // Empieza a girar el spinner

    this.pokemonService.getPokemonDetails(name).subscribe({
      next: (data) => {
        this.pokemon = data;
        // Simulamos un pequeño retraso de 500ms para que se aprecie el spinner (opcional)
        setTimeout(() => {
          this.loading = false;
        }, 500);
      },
      error: () => {
        this.loading = false;

        // 4. MUESTRA EL MENSAJE DE ERROR
        this.messageService.add({
          severity: 'error',
          summary: 'Error de Pokédex',
          detail: `No se encontró el Pokémon "${name}". Regresando...`,
          life: 3000, // Dura 3 segundos
        });

        // 5. Espera 3 segundos antes de volver para que lean el mensaje
        setTimeout(() => {
          this.goBack();
        }, 3000);
      },
    });
  }

  goBack() {
    this.router.navigate(['/pokemon']);
  }
}
