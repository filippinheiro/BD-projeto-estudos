-- o uuidv4 garante unicidade mas vai que o mundo acaba ne

CREATE TABLE Estudante (
  idEstudante uuid UNIQUE DEFAULT uuid_generate_v4(),
  nome varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  senha VARCHAR(100) NOT NULL,
  dataNascimento DATE NOT NULL,
  CONSTRAINT pkEstudante
    PRIMARY KEY(idEstudante)
);

CREATE TABLE Materia (
  idMateria uuid UNIQUE DEFAULT uuid_generate_v4(),
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
  idAssunto uuid UNIQUE DEFAULT uuid_generate_v4(),
  descricao varchar(100) NOT NULL,
  idMateria uuid,
  CONSTRAINT pkAssunto
    PRIMARY KEY(idAssunto),
  CONSTRAINT fkMateria
    FOREIGN KEY(idMateria) REFERENCES Materia(idMateria) ON DELETE CASCADE
);

CREATE TABLE Simulado (
  idSimulado uuid UNIQUE DEFAULT uuid_generate_v4(),
  titulo VARCHAR(100) NOT NULL,
  nota DECIMAL NOT NULL,
  idMateria uuid,
  CONSTRAINT pkAvaliacao
    PRIMARY KEY(idSimulado),
  CONSTRAINT fkMateria
    FOREIGN KEY(idMateria) REFERENCES Materia(idMateria) ON DELETE CASCADE
);

CREATE TABLE Estudo (
  idEstudo uuid UNIQUE DEFAULT uuid_generate_v4(),
  horarioIni TIMESTAMP DEFAULT NOW(),
  horaFim TIMESTAMP,
  idMateria uuid,
  CONSTRAINT pkEstudo
    PRIMARY KEY(idEstudo),
  CONSTRAINT fkMateria
    FOREIGN KEY(idMateria) REFERENCES Materia(idMateria) ON DELETE CASCADE
);

CREATE TABLE Tarefa (
  idTarefa uuid UNIQUE DEFAULT uuid_generate_v4(),
  descricao VARCHAR(100) NOT NULL,
  idEstudante uuid,
  CONSTRAINT pkTarefa PRIMARY KEY(idTarefa),
  CONSTRAINT fkTarefa FOREIGN KEY(idEstudante) REFERENCES Estudante(idEstudante) ON DELETE CASCADE,
);

CREATE TABLE Evento (
  idEvento uuid UNIQUE DEFAULT uuid_generate_v4(),
  horarioIni TIMESTAMP DEFAULT NOW(),
  horaFim TIMESTAMP,
  prioridade VARCHAR(100) NOT NULL,
  observacao VARCHAR(100) NOT NULL,
  data DATE NOT NULL,
  CONSTRAINT pkEvento PRIMARY KEY(idEvento),,
);



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





