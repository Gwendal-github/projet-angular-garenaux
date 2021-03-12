import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Type } from 'src/app/core/models/type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypesService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };


  endPoint: string= environment.TypeEndPoint;

  constructor(private _httpClient: HttpClient) { }

  get(): Observable<Type[]>{
    return this._httpClient.get<Type[]>(this.endPoint);
  }

  getById(id:number):Observable<Type>{
    return this._httpClient.get<Type>(this.endPoint+"/"+id);
  }

  post(type : Type): Observable<Type>{
    return this._httpClient.post<Type>(this.endPoint,type);
  }

  update(type : Type): Observable<Type>{
    return this._httpClient.put<Type>(this.endPoint+"/"+type.id,type,this.httpOptions);
  }


}
