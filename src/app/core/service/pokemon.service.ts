import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
  constructor(private http: HttpClient) {}

  getPokemons(limit: number = 20, offset: number = 0): Observable<any> {
    const params = new HttpParams().set('limit', limit.toString()).set('offset', offset.toString());

    return this.http.get(`${this.apiUrl}`, { params });
  }

  getPokemonDetails(nameOrId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${nameOrId.toLowerCase()}`);
  }

  getPokemonsByType(type: string): Observable<any> {
    return this.http.get(`${this.apiUrl}type/${type.toLowerCase()}`);
  }
}
