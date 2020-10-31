import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  apiUrl: string = 'https://pokeapi.co/api/v2/pokemon-form/';

  constructor(private http: HttpClient) { }

  getIem(url: string): Observable<any> {
    return this.http.get(`${url}`);
  }

  getContent(offset?: number, limit?: number): Observable<any | any[]> {

    let query = '';
    limit = limit ? limit : 20;
    query = limit ? `?limit=${limit}` : ''


    if (offset) {
      query = query ? `${query}&` : '';
      query += offset ? `offset=${offset}` : '';
    }
    return this.http.get(`${this.apiUrl}${query}`);
  }

  get():Observable<any> {
    return this.http.get('https://pokeres.bastionbot.org/images/pokemon/20.png');
  }
}