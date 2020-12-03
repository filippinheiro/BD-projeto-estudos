CREATE TABLE Estudante (
  idEstudante uuid DEFAULT uuid_generate_v4(),
  nome varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  senha VARCHAR(100) NOT NULL,
  dataNascimento DATE NOT NULL,
  CONSTRAINT pkEstudante
    PRIMARY KEY(idEstudante)
);

CREATE TABLE Materia (
  idMateria uuid DEFAULT uuid_generate_v4(),
  sala varchar(100) NOT NULL,
  nome varchar(100) NOT NULL,
  professor varchar(100) NOT NULL,
  observacao VARCHAR(255),
  idEstudante uuid,
  CONSTRAINT pkMateria
    PRIMARY KEY(idMateria),
  CONSTRAINT fkEstudante
    FOREIGN KEY(idEstudante) REFERENCES Estudante(idEstudante) ON DELETE SET NULL
);

CREATE TABLE Assunto (
  idAssunto uuid DEFAULT uuid_generate_v4(),
  descricao varchar(100) NOT NULL,
  idMateria uuid,
  CONSTRAINT pkAssunto
    PRIMARY KEY(idAssunto),
  CONSTRAINT fkMateria
    FOREIGN KEY(idMateria) REFERENCES Materia(idMateria) ON DELETE CASCADE
);

CREATE TABLE Avaliacao (
  idAvaliacao uuid DEFAULT uuid_generate_v4(),
  titulo VARCHAR(100) NOT NULL,
  nota DECIMAL NOT NULL,
  idMateria uuid,
  CONSTRAINT pkAvaliacao
    PRIMARY KEY(idAvaliacao),
  CONSTRAINT fkMateria
    FOREIGN KEY(idMateria) REFERENCES Materia(idMateria) ON DELETE CASCADE
);

CREATE TABLE Estudo (
  idEstudo uuid DEFAULT uuid_generate_v4(),
  horarioIni TIMESTAMP DEFAULT NOW(),
  horaFim TIMESTAMP,
  idMateria uuid,
  CONSTRAINT pkEstudo
    PRIMARY KEY(idEstudo),
  CONSTRAINT fkMateria
    FOREIGN KEY(idMateria) REFERENCES Materia(idMateria) ON DELETE CASCADE
);

CREATE TABLE Tarefa (
  idTarefa uuid DEFAULT uuid_generate_v4(),
  descricao VARCHAR(100) NOT NULL,
  idEstudante uuid,
  CONSTRAINT pkTarefa PRIMARY KEY(idTarefa),
  CONSTRAINT fkMateria FOREIGN KEY(idEstudante) REFERENCES Estudante(idEstudante) ON DELETE CASCADE,
);

CREATE TABLE Evento (
  idEvento uuid DEFAULT uuid_generate_v4(),
  horarioIni TIMESTAMP DEFAULT NOW(),
  horaFim TIMESTAMP,
  prioridade VARCHAR(100) NOT NULL,
  observacao VARCHAR(100) NOT NULL,
  data DATE NOT NULL,
  idEstudante uuid,
  idMateria uuid,
  CONSTRAINT pkEvento PRIMARY KEY(idEvento),
  CONSTRAINT fkEstudante FOREIGN KEY(idEstudante) REFERENCES Estudante(idEstudante) ON DELETE SET NULL,
  CONSTRAINT fkMateria FOREIGN KEY(idMateria) REFERENCES Materia(idMateria) ON DELETE CASCADE
);

ALTER TABLE materia DROP CONSTRAINT fkAluno;
ALTER TABLE materia DROP COLUMN idEstudante;

CREATE TABLE Inscricao (
  idEstudante uuid,
  idMateria uuid,
  CONSTRAINT pkInscricao 
    PRIMARY KEY(idEstudante, idMateria),
  CONSTRAINT fkEstudante
    FOREIGN KEY(idEstudante) REFERENCES Estudante(idEstudante) ON DELETE SET NULL,
  CONSTRAINT fkMateria
    FOREIGN KEY(idMateria) REFERENCES Materia(idMateria) ON DELETE CASCADE
);

ALTER TABLE Evento DROP CONSTRAINT fkEstudante;
ALTER TABLE Evento DROP COLUMN idEstudante;

CREATE TABLE EventoParticipacao (
  idEvento uuid,
  idEstudante uuid,
  CONSTRAINT pkParticipacao
    PRIMARY KEY(idEvento, idEstudante),
  CONSTRAINT fkEvento
    FOREIGN KEY(idEvento) REFERENCES Evento(idevento) ON DELETE CASCADE,
  CONSTRAINT fkEstudante
    FOREIGN KEY(idEstudante) REFERENCES Estudante(idEstudante) ON DELETE SET NULL
);

ALTER TABLE Tarefa ADD COLUMN idMateria uuid;
ALTER TABLE Tarefa DROP CONSTRAINT fkMateria;
ALTER TABLE Tarefa ADD CONSTRAINT fkMateria
    FOREIGN KEY(idMateria) REFERENCES Materia(idMateria) ON DELETE CASCADE;
ALTER TABLE Tarefa ADD CONSTRAINT fkEstudante
    FOREIGN KEY(idEstudante) REFERENCES Estudante(idEstudante) ON DELETE CASCADE;






