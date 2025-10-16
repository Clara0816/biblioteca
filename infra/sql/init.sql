CREATE SEQUENCE seq_ra START 1;

CREATE TABLE Aluno (
    id_aluno INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ra VARCHAR (7) UNIQUE NOT NULL,
    nome VARCHAR (80) NOT NULL,
    sobrenome VARCHAR (80) NOT NULL,
    data_nascimento DATE,
    endereco VARCHAR (200),
    email VARCHAR (80),
    celular VARCHAR (20) NOT NULL
);

CREATE OR REPLACE FUNCTION gerar_ra() RETURNS TRIGGER AS $$
BEGIN
    NEW.ra := 'AAA' || TO_CHAR(nextval('seq_ra'), 'FM0000');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_gerar_ra
BEFORE INSERT ON Aluno
FOR EACH ROW EXECUTE FUNCTION gerar_ra();



CREATE TABLE Livro (
    id_livro INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    titulo VARCHAR (200) NOT NULL,
    autor VARCHAR (150) NOT NULL,
    editora VARCHAR (100) NOT NULL,
    ano_publicacao VARCHAR (5),
    isbn VARCHAR (20),
    quant_total INTEGER NOT NULL,
    quant_disponivel INTEGER NOT NULL,
    valor_aquisicao DECIMAL (10,2),
    status_livro_emprestado VARCHAR (20)
);

CREATE TABLE Emprestimo (
    id_emprestimo INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_aluno INT REFERENCES Aluno(id_aluno),
    id_livro INT REFERENCES Livro(id_livro),
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE,
    status_emprestimo VARCHAR (20)
);



INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES 
('Conor', 'McGregor', '2005-01-15', 'Rua UFC, 123', 'mcgregor@ufc.com', '16998959876'),
('Amanda', 'Nunes', '2004-03-22', 'Rua UFC, 456', 'amanda.nunes@ufc.com', '16995992305'),
('Angelina', 'Jolie', '2003-07-10', 'Rua Hollywood, 789', 'jolie@cinema.com', '16991915502'),
('Natalie', 'Portman', '2002-11-05', 'Rua Hollywood, 101', 'natalie.portman@cinema.com', '16993930703'),
('Shaquille', 'ONeal', '2004-09-18', 'Rua NBA, 202', 'shaquille@gmail.com', '16993937030'),
('Harry', 'Kane', '2000-05-18', 'Rua Futebol, 2024', 'kane@futi.com', '16998951983'),
('Jaqueline', 'Carvalho', '2001-12-10', 'Rua Volei, 456', 'jack@volei.com', '16991993575'),
('Sheilla', 'Castro', '2003-04-25', 'Rua Volei, 2028', 'sheilla.castro@volei.com', '16981974547'),
('Gabriela', 'Guimarães', '2007-08-19', 'Rua Volei, 2028', 'gaby@volei.com', '16983932215'),
('Magic', 'Johnson', '2003-07-08', 'Rua NBA, 1999', 'magic@gmail.com', '16993932020');

INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES 
('Clara', 'Silva', '2007-04-15', 'Rua wcb, 129', 'silva@uwcb.com', '16990059876'),
('Ananda', 'Bononi', '2005-03-07', 'Rua wcb, 486', 'ananda.bononi@wcb.com', '16995982305'),
('Angelica', 'Souza', '1998-07-10', 'Rua Mc, 799', 'souza@angelica.com', '16998815502'),
('Fernanda', 'Soares', '2000-09-05', 'Rua Hollywood, 698', 'fernanda.soares@rua.com', '19993930703'),
('Sara', 'Souza', '2003-09-08', 'Rua Flores, 201', 'sara@gmail.com', '17093937030'),
('Julia', 'Soares', '2000-10-10', 'Rua Fortaleza, 200', 'julia@fortaleza.com', '16998951653'),
('Janaina', 'Carvalho', '2000-12-25', 'Rua Veneza, 256', 'jana@veneza.com', '16932993575'),
('Sabrina', 'Castro', '2002-06-25', 'Rua Brasil, 087', 'sabrina.castro@brasil.com', '15781974547'),
('Gabriel', 'Guimarães', '2001-08-09', 'Rua Volei, 333', 'gabriel@volei.com', '16988732215'),
('Margarida', 'Castro', '1999-10-08', 'Rua Margarida, 19', 'margarida@gmail.com', '16983932020');




INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
VALUES 
('O Senhor dos Anéis', 'J.R.R. Tolkien', 'HarperCollins', '1954', '978-0007525546', 10, 10, 150.00, 'Disponível'),
('1984', 'George Orwell', 'Companhia das Letras', '1949', '978-8535906770', 8, 8, 90.00, 'Disponível'),
('Dom Quixote', 'Miguel de Cervantes', 'Penguin Classics', '1605', '978-0142437230', 6, 6, 120.00, 'Disponível'),
('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 'Agir', '1943', '978-8522008731', 12, 12, 50.00, 'Disponível'),
('A Revolução dos Bichos', 'George Orwell', 'Penguin', '1945', '978-0141036137', 7, 7, 80.00, 'Disponível'),
('O Hobbit', 'J.R.R. Tolkien', 'HarperCollins', '1937', '978-0007458424', 9, 9, 140.00, 'Disponível'),
('O Conde de Monte Cristo', 'Alexandre Dumas', 'Penguin Classics', '1844', '978-0140449266', 5, 5, 110.00, 'Disponível'),
('Orgulho e Preconceito', 'Jane Austen', 'Penguin Classics', '1813', '978-0141439518', 7, 7, 90.00, 'Disponível'),
('Moby Dick', 'Herman Melville', 'Penguin Classics', '1851', '978-0142437247', 4, 4, 100.00, 'Disponível'),
('Guerra e Paz', 'Liev Tolstói', 'Companhia das Letras', '1869', '978-8535922343', 3, 3, 130.00, 'Disponível');


INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
VALUES 
('O Sol é Para Todos ', 'Harper Lee', 'Collins', '1960', '978-0007529546', 10, 10, 151.00, 'Disponível'),
('As Flores do Mal', ' Clares ', 'Companhia das Letras', '1857', '978-8535916770', 9, 9, 95.00, 'Disponível'),
('O Nome da Rosa', 'Umberto Eco', 'Classics', '1980', '978-0142337230', 5, 5, 125.00, 'Disponível'),
('Frankenstein ', 'Mary Shelley', 'Crear', '1818', '978-8524008731', 10, 10, 55.00, 'Disponível'),
('Hamlet', 'William Shakespeare ', 'Penguin', '1603', '978-0841036137', 4, 4, 85.00, 'Disponível'),
('Guerra', ' Leon Tolstói', 'Crear', '1869', '978-0067458424', 3, 3, 145.00, 'Disponível'),
('Tubarão', ' Peter Benchley', ' Classics', '1974', '978-0140749266', 5, 6, 115.00, 'Disponível'),
('Cem Anos de Solidão ', 'Gabriel García Márquez', 'Classics', '1967', '978-0143439518', 7, 7, 80.00, 'Disponível'),
('Fahrenheit 451', 'Ray Bradbury', 'Penguin', '1953', '978-0144437247', 3, 3, 170.00, 'Disponível'),
('Em Busca do Tempo Perdido', 'Marcel Proust ', 'Companhia ', '1927', '978-1535922343', 2, 2, 100.00, 'Disponível');





INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) 
VALUES 
(1, 2, '2024-09-01', '2024-09-15', 'Em andamento'),
(2, 1, '2024-09-02', '2024-09-16', 'Em andamento'),
(3, 5, '2024-09-03', '2024-09-17', 'Em andamento'),
(5, 3, '2024-09-04', '2024-09-18', 'Em andamento'),
(4, 6, '2024-09-05', '2024-09-19', 'Em andamento'),
(6, 4, '2024-09-06', '2024-09-20', 'Em andamento'),
(7, 8, '2024-09-07', '2024-09-21', 'Em andamento'),
(8, 7, '2024-09-08', '2024-09-22', 'Em andamento'),
(10, 9, '2024-09-09', '2024-09-23', 'Em andamento'),
(9, 10, '2024-09-10', '2024-09-24', 'Em andamento'),
(1, 10, '2024-09-11', '2024-09-25', 'Em andamento'),
(2, 3, '2024-09-11', '2024-09-25', 'Em andamento'),
(4, 5, '2024-09-11', '2024-09-25', 'Em andamento'),
(6, 2, '2024-09-11', '2024-09-25', 'Em andamento');


INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) 
VALUES 
(11, 7, '2024-10-01', '2024-11-15', 'Em andamento'),
(12, 3, '2024-10-02', '2024-11-16', 'Em andamento'),
(13, 15, '2024-10-03', '2024-11-17', 'Em andamento'),
(15, 13, '2024-10-04', '2024-11-18', 'Em andamento'),
(14, 16, '2024-10-05', '2024-11-19', 'Em andamento'),
(16, 14, '2024-10-06', '2024-11-20', 'Em andamento'),
(17, 18, '2024-10-07', '2024-11-21', 'Em andamento'),
(18, 17, '2024-10-08', '2024-11-22', 'Em andamento'),
(10, 19, '2024-10-09', '2024-11-23', 'Em andamento'),
(19, 11, '2024-10-10', '2024-11-24', 'Em andamento'),
(17, 11, '2024-10-11', '2024-11-25', 'Em andamento'),
(11, 13, '2024-10-11', '2024-11-25', 'Em andamento'),
(14, 20, '2024-10-11', '2024-11-25', 'Em andamento'),
(20, 14, '2024-10-11', '2024-11-25', 'Em andamento');
