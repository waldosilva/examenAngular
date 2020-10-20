import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http: HttpClient) { }

  getPaises(): any {
    return this.http.get('https://restcountries.eu/rest/v2/lang/es')
      .pipe(
        map(
          (response: any[]) =>
            (response.map(pais => ({ nombre: pais.name, codigo: pais.alpha3Code })))
        )
      );
  }
}
