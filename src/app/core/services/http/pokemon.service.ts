import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/core/models/pokemon';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };


  endPoint: string= environment.PokemonEndPoint;

  constructor(private _httpClient: HttpClient) { }

  get(): Observable<Pokemon[]>{
    return this._httpClient.get<Pokemon[]>(this.endPoint);
  }

  post(pokemon : Pokemon): Observable<Pokemon>{
    return this._httpClient.post<Pokemon>(this.endPoint,pokemon);
  }

  update(pokemon : Pokemon): Observable<Pokemon>{
    return this._httpClient.put<Pokemon>(this.endPoint+"/"+pokemon.id,pokemon,this.httpOptions);
  }
}
