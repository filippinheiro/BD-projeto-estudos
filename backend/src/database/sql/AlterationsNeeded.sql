ALTER TABLE materia DROP CONSTRAINT fkAluno;
ALTER TABLE materia DROP COLUMN idEstudante;

ALTER TABLE Tarefa ADD CONSTRAINT fkEstudante
  FOREIGN KEY(idEstudante) REFERENCES Estudante(idEstudante) ON DELETE CASCADE;

ALTER TABLE inscricao ADD COLUMN media int;
ALTER TABLE EventoParticipacao ADD COLUMN anotacoes VARCHAR(100);

ALTER TABLE Avaliacao ADD COLUMN idEstudante uuid;
ALTER TABLE Avaliacao ADD CONSTRAINT fkEstudante FOREIGN KEY(idEstudante) REFERENCES Estudante(idEstudante);

ALTER TABLE Estudo ADD COLUMN idEstudante uuid;
ALTER TABLE Estudo ADD CONSTRAINT fkEstudante FOREIGN KEY(idEstudante) REFERENCES Estudante(idEstudante);