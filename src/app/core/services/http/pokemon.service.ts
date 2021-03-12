import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/core/models/pokemon';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  endPoint: string= environment.PokemonEndPoint;

  constructor(private _httpClient: HttpClient) { }

  get(): Observable<Pokemon[]>{
    return this._httpClient.get<Pokemon[]>(this.endPoint);
  }

  getById(id:number): Observable<Pokemon>{
    return this._httpClient.get<Pokemon>(this.endPoint+"/"+id);
  }

  post(pokemon : Pokemon): Observable<Pokemon>{
    return this._httpClient.post<Pokemon>(this.endPoint,pokemon);
  }

  update(pokemon : Pokemon): Observable<Pokemon>{
    return this._httpClient.put<Pokemon>(this.endPoint+"/"+pokemon.id,pokemon);
  }

  delete(id: number): Observable<Pokemon> {
    return this._httpClient.delete<Pokemon>(this.endPoint+"/"+id);
  }
}
