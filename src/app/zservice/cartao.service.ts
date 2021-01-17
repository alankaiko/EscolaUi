import { Cartao, Turma, Aluno } from './../core/model';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class CartaoFiltro {
  pagina = 0;
  itensPorPagina = 9;
}

@Injectable({
  providedIn: 'root'
})
export class CartaoService {
  url: string;
  urlaluno: string;
  urlturma: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/cartoes`;
    this.urlaluno = `${environment.apiUrl}/alunos`;
    this.urlturma = `${environment.apiUrl}/turmas`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: CartaoFiltro): Promise<any> {
    const params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const cartoes = response;

        const resultado = {
          cartoes,
          total: response.totalElements
        };

        return resultado;
      });
  }

  Adicionar(cartao): Promise<Cartao> {
    return this.http.post<Cartao>(`${this.url}`, cartao).toPromise();
  }

  BuscarPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const cartao = response as Cartao;
        return cartao;
      });
  }

  BuscarPorCodBarras(codigobarras: string): Promise<any> {
    return this.http.get(`${this.url}/barras/${codigobarras}`)
      .toPromise()
      .then(response => {
        const cartao = response as Cartao;
        return cartao;
      });
  }

  Atualizar(cartao: Cartao): Promise<any> {
    return this.http.put(`${this.url}/${cartao.codigo}`, cartao)
      .toPromise()
      .then(response => {
        const cartaoalterado = response as Cartao;
        return cartaoalterado;
      });
  }

  Remover(codigo: number): Promise<any> {
    return this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  ListarTurma(): Promise<Turma[]> {
    return this.http.get<Turma[]>(this.urlturma).toPromise();
  }

  ListarAluno(): Promise<Aluno[]> {
    return this.http.get<Aluno[]>(this.urlaluno).toPromise();
  }

}
