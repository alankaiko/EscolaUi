import { Serie } from './../core/model';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class SerieFiltro {
  pagina = 0;
  itensPorPagina = 9;
}

@Injectable({
  providedIn: 'root'
})
export class SerieService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/series`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: SerieFiltro): Promise<any> {
    const params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const series = response;

        const resultado = {
          series,
          total: response.totalElements
        };

        return resultado;
      });
  }

  Adicionar(serie): Promise<Serie> {
    return this.http.post<Serie>(`${this.url}`, serie).toPromise();
  }

  BuscarPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const serie = response as Serie;
        return serie;
      });
  }

  Atualizar(serie: Serie): Promise<any> {
    return this.http.put(`${this.url}/${serie.codigo}`, serie)
      .toPromise()
      .then(response => {
        const seriealterado = response as Serie;
        return seriealterado;
      });
  }

  Remover(codigo: number): Promise<any> {
    return this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

}
