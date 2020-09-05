export class Turno {
  codigo: number;
  turno: string;
}

export class Turma {
  codigo: number;
  nome: string;
  turno: Turno;
}

export class Serie {
  codigo: number;
  serie: string;
}

export class Sala {
  codigo: number;
  sala: string;
}

export class Resppedagogico {
  codigo: number;
  professor: string;
}

export class Cartao {
  codigo: number;
  titulo: string;
  descricao: string;
  codigobarras: string;
  aluno: Aluno;
  turma: Turma;
}

export class Aluno {
  codigo: number;
  nome: string;
}
