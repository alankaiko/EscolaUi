import { Aluno, Turno, Turma, Sala, Serie, Resppedagogico } from './../core/model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export class AlunosFiltro {
  pagina = 0;
  itensPorPagina = 7;
}

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  url: string;
  urlsala: string;
  urlserie: string;
  urlturno: string;
  urlturma: string;
  urlresp: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.apiUrl}/alunos`;
    this.urlsala = `${environment.apiUrl}/salas`;
    this.urlserie = `${environment.apiUrl}/series`;
    this.urlturno = `${environment.apiUrl}/turnos`;
    this.urlturma = `${environment.apiUrl}/turmas`;
    this.urlresp = `${environment.apiUrl}/resppedagogicos`;
  }

  Listar(): Promise<any> {
    return this.http.get(`${this.url}`).toPromise().then(response => response);
  }

  Consultar(filtro: AlunosFiltro): Promise<any> {
    const params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    return this.http.get<any>(`${this.url}?resumo`, { params })
      .toPromise()
      .then(response => {
        const alunos = response;

        const resultado = {
          alunos,
          total: response.totalElements
        };

        return resultado;
      });
  }

  Adicionar(aluno): Promise<Aluno> {
    return this.http.post<Aluno>(`${this.url}`, aluno).toPromise();
  }

  BuscarPorId(codigo: number): Promise<any> {
    return this.http.get(`${this.url}/${codigo}`)
      .toPromise()
      .then(response => {
        const aluno = response as Aluno;

        return aluno;
      });
  }

  Atualizar(aluno: Aluno): Promise<any> {
    return this.http.put(`${this.url}/${aluno.codigo}`, aluno)
      .toPromise()
      .then(response => {
        const alunoalterado = response as Aluno;

        return alunoalterado;
      });
  }

  Remover(codigo: number): Promise<any> {
    return this.http.delete(`${this.url}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  ListarTurno(): Promise<Turno[]> {
    return this.http.get<Turno[]>(this.urlturno).toPromise();
  }

  ListarTurma(): Promise<Turma[]> {
    return this.http.get<Turma[]>(this.urlturma).toPromise();
  }

  ListarSala(): Promise<Sala[]> {
    return this.http.get<Sala[]>(this.urlsala).toPromise();
  }

  ListarSerie(): Promise<Serie[]> {
    return this.http.get<Serie[]>(this.urlserie).toPromise();
  }

  ListarResp(): Promise<Resppedagogico[]> {
    return this.http.get<Resppedagogico[]>(this.urlresp).toPromise();
  }
}
