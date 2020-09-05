import { Resppedagogico } from './../core/model';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class ResppedagogicoFiltro {
  pagina = 0;
  itensPorPagina = 7;
}

@Injectable({
  providedIn: 'root'
})
export class ResppedagogicoService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/resppedagogicos`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: ResppedagogicoFiltro): Promise<any> {
    const params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const resp = response;

        const resultado = {
          resp,
          total: response.totalElements
        };

        return resultado;
      });
  }

  Adicionar(resp): Promise<Resppedagogico> {
    return this.http.post<Resppedagogico>(`${this.url}`, resp).toPromise();
  }

  BuscarPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const resp = response as Resppedagogico;

        return resp;
      });
  }

  Atualizar(resp: Resppedagogico): Promise<any> {
    return this.http.put(`${this.url}/${resp.codigo}`, resp)
      .toPromise()
      .then(response => {
        const respalterado = response as Resppedagogico;

        return respalterado;
      });
  }

  Remover(codigo: number): Promise<any> {
    return this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

}
