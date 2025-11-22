CREATE TABLE receita (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(65) NOT NULL,
    ingredientes VARCHAR(300) NOT NULL,
    mode_preparo VARCHAR(500) NOT NULL
);