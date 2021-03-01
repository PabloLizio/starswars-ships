import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShipsService {
  url = 'https://swapi.dev/api/starships/?page=';
  headerDict = {
    Authorization: 'none',
    'Access-Control-Allow-Origin': '*',
  };
  requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  };

  constructor(private http: HttpClient) {}

  getShips(page: number): Observable<any> {
    return this.http.get(this.url + page).pipe(
      map((data) => {
        return data;
      })
    );
  }
}
