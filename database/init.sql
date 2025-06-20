-- Inicialização do banco de dados Grêmio Brasileirão 2025

-- Criar tabela matches
CREATE TABLE IF NOT EXISTS matches (
    id SERIAL PRIMARY KEY,
    rodada INTEGER NOT NULL,
    data DATE NOT NULL,
    adversario VARCHAR(100) NOT NULL,
    local VARCHAR(200) NOT NULL,
    resultado VARCHAR(50),
    is_home BOOLEAN NOT NULL
);

-- Primeiro Turno (Rodadas 1-19)
INSERT INTO matches (rodada, data, adversario, local, resultado, is_home) VALUES
(1, '2025-03-29', 'Atlético-MG', 'Arena do Grêmio, Porto Alegre/RS', 'Grêmio 2 x 1 Atlético-MG', true),
(2, '2025-04-05', 'Ceará', 'Castelão, Fortaleza/CE', 'Ceará 2 x 0 Grêmio', false),
(3, '2025-04-13', 'Flamengo', 'Arena do Grêmio, Porto Alegre/RS', 'Grêmio 0 x 2 Flamengo', true),
(4, '2025-04-16', 'Mirassol', 'Maião, Mirassol/SP', 'Mirassol 4 x 1 Grêmio', false),
(5, '2025-04-19', 'Internacional', 'Arena do Grêmio, Porto Alegre/RS', 'Grêmio 1 x 1 Internacional', true),
(6, '2025-04-27', 'Vitória', 'Barradão, Salvador/BA', 'Vitória 1 x 1 Grêmio', false),
(7, '2025-05-04', 'Santos', 'Arena do Grêmio, Porto Alegre/RS', 'Grêmio 1 x 0 Santos', true),
(8, '2025-05-10', 'Red Bull Bragantino', 'Arena do Grêmio, Porto Alegre/RS', 'Grêmio 1 x 1 Red Bull Bragantino', true),
(9, '2025-05-17', 'São Paulo', 'Morumbi, São Paulo/SP', 'São Paulo 2 x 1 Grêmio', false),
(10, '2025-05-25', 'Bahia', 'Arena do Grêmio, Porto Alegre/RS', 'Grêmio 1 x 0 Bahia', true),
(11, '2025-06-01', 'Juventude', 'Alfredo Jaconi, Caxias do Sul/RS', 'Juventude 0 x 2 Grêmio', false),
(12, '2025-06-12', 'Corinthians', 'Arena do Grêmio, Porto Alegre/RS', NULL, true),
(13, '2025-07-12', 'Cruzeiro', 'Mineirão, Belo Horizonte/MG', NULL, false),
(14, '2025-07-16', 'Fortaleza', 'Arena do Grêmio, Porto Alegre/RS', NULL, true),
(15, '2025-07-19', 'Vasco', 'São Januário, Rio de Janeiro/RJ', NULL, false),
(16, '2025-07-23', 'Botafogo', 'Arena do Grêmio, Porto Alegre/RS', NULL, true),
(17, '2025-07-26', 'Palmeiras', 'Allianz Parque, São Paulo/SP', NULL, false),
(18, '2025-08-02', 'Fluminense', 'Maracanã, Rio de Janeiro/RJ', NULL, false),
(19, '2025-08-09', 'Sport', 'Arena do Grêmio, Porto Alegre/RS', NULL, true);

-- Segundo Turno (Rodadas 20-38)
INSERT INTO matches (rodada, data, adversario, local, resultado, is_home) VALUES
(20, '2025-08-17', 'Atlético-MG', 'Mineirão, Belo Horizonte/MG', NULL, false),
(21, '2025-08-23', 'Ceará', 'Arena do Grêmio, Porto Alegre/RS', NULL, true),
(22, '2025-08-30', 'Flamengo', 'Maracanã, Rio de Janeiro/RJ', NULL, false),
(23, '2025-09-06', 'Mirassol', 'Arena do Grêmio, Porto Alegre/RS', NULL, true),
(24, '2025-09-13', 'Internacional', 'Beira-Rio, Porto Alegre/RS', NULL, false),
(25, '2025-09-20', 'Vitória', 'Arena do Grêmio, Porto Alegre/RS', NULL, true),
(26, '2025-09-27', 'Santos', 'Vila Belmiro, Santos/SP', NULL, false),
(27, '2025-10-04', 'Red Bull Bragantino', 'Nabi Abi Chedid, Bragança Paulista/SP', NULL, false),
(28, '2025-10-11', 'São Paulo', 'Arena do Grêmio, Porto Alegre/RS', NULL, true),
(29, '2025-10-18', 'Bahia', 'Fonte Nova, Salvador/BA', NULL, false),
(30, '2025-10-25', 'Juventude', 'Arena do Grêmio, Porto Alegre/RS', NULL, true),
(31, '2025-11-01', 'Corinthians', 'Neo Química Arena, São Paulo/SP', NULL, false),
(32, '2025-11-05', 'Cruzeiro', 'Arena do Grêmio, Porto Alegre/RS', NULL, true),
(33, '2025-11-09', 'Fortaleza', 'Castelão, Fortaleza/CE', NULL, false),
(34, '2025-11-16', 'Vasco', 'Arena do Grêmio, Porto Alegre/RS', NULL, true),
(35, '2025-11-23', 'Botafogo', 'Nilton Santos, Rio de Janeiro/RJ', NULL, false),
(36, '2025-11-30', 'Palmeiras', 'Arena do Grêmio, Porto Alegre/RS', NULL, true),
(37, '2025-12-04', 'Fluminense', 'Arena do Grêmio, Porto Alegre/RS', NULL, true),
(38, '2025-12-08', 'Sport', 'Ilha do Retiro, Recife/PE', NULL, false); 