insert into materia (nome, observacao, professor, sala) values
(upper('Calculo A'), upper('Muito dificil'), upper('Eleonesio'), upper('sala 4')),
(upper('Teoria dos Grafos'), null, upper('Edmar'), upper('sala 9')),
(upper('Compiladores'), upper('Uma materia bem divertida'), upper('Rodrigo'), upper('lab 1')),
(upper('Algoritmos Numéricos'), null, upper('Paulo'), upper('sala 4')),
(upper('Algebra Linear'), null, upper('Gabriel'), upper('sala 4')),
(upper('Arquitetura'), null, upper('Valeria'), upper('sala 4')),
(upper('Banco de Dados'), upper('mais dificil ainda'), upper('Antonio'), upper('lab 1'));

insert into simulado(titulo, nota, idmateria, idestudante) values
('Simulado de Grafos',    10, '395a72ed-f584-4ea5-b72d-cf99adea5ea7', '71aea013-2a8d-4774-8b4d-c248d5a9573b'),
('Derivadas',              7, '10ffb754-c975-4d04-b92c-42f06d397c7f', '71aea013-2a8d-4774-8b4d-c248d5a9573b'),
('Matching e coloracao', 8.5, '395a72ed-f584-4ea5-b72d-cf99adea5ea7', '71aea013-2a8d-4774-8b4d-c248d5a9573b')
