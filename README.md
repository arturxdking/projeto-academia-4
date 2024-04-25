CREATE TABLE alunos (
  id int NOT NULL AUTO_INCREMENT,
  nome varchar(255) NOT NULL,
  cpf varchar(45) NOT NULL,
  data_nascimento date NOT NULL,
  sexo varchar(45) NOT NULL,
  email varchar(255) NOT NULL,
  telefone varchar(45) NOT NULL,
  cep varchar(45) NOT NULL,
  estado varchar(45) NOT NULL,
  cidade varchar(45) NOT NULL,
  rua varchar(255) NOT NULL,
  numero varchar(45) NOT NULL,
  PRIMARY KEY(id)
);

INSERT INTO alunos (nome, cpf, data_nascimento, sexo, email, telefone, cep, estado, cidade, rua, numero) 
VALUES 
('Ana Claudia', '123.456.789-00', '2000-01-01', 'Feminino', 'ana@example.com', '123456789', '12345-678', 'SP', 'Franca', 'Luzia Baptista Pereira Terra', '123');


CREATE TABLE professores (
  id int NOT NULL AUTO_INCREMENT,
  nome varchar(255) NOT NULL,
  cpf varchar(45) NOT NULL,
  cref varchar(45) NOT NULL,
  data_nascimento date NOT NULL,
  sexo varchar(45) NOT NULL,
  email varchar(255) NOT NULL,
  telefone varchar(45) NOT NULL,
  cep varchar(45) NOT NULL,
  estado varchar(45) NOT NULL,
  cidade varchar(45) NOT NULL,
  rua varchar(255) NOT NULL,
  numero varchar(45) NOT NULL,
  PRIMARY KEY(id)
);

INSERT INTO professores (nome, cpf, cref, data_nascimento, sexo, email, telefone, cep, estado, cidade, rua, numero) 
VALUES 
('Sandrão', '123.456.789-00', '465686', '2000-01-01', 'Feminino', 'ana@example.com', '123456789', '12345-678', 'SP', 'Franca', 'Luzia Baptista Pereira Terra', '123');


CREATE TABLE exercicios (
  id int NOT NULL AUTO_INCREMENT,
  nome varchar(255) NOT NULL,
  PRIMARY KEY(id)
);

INSERT INTO exercicios (nome)
VALUES('Supino Inclinado');


CREATE TABLE fichatreino (
    id INT AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    diasemana JSON NOT NULL,
    PRIMARY KEY(id)
);

