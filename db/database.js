import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('app_vendas.db');

const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS categorias (id INTEGER PRIMARY KEY NOT NULL, nome TEXT NOT NULL);",
      [],
      () => {console.log('Tabela categorias criada com sucesso')},
      error => {console.log('Erro ao criar tabela categorias: ' + error.message)}
    );
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS produtos (id INTEGER PRIMARY KEY NOT NULL, nome TEXT NOT NULL, preco REAL NOT NULL, categoriaId INTEGER, FOREIGN KEY(categoriaId) REFERENCES categorias(id));",
      [],
      () => {console.log('Tabela produtos criada com sucesso')},
      error => {console.log('Erro ao criar tabela produtos: ' + error.message)}
    );
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS vendas (id INTEGER PRIMARY KEY NOT NULL, data DATE NOT NULL, total REAL NOT NULL);",
      [],
      () => {console.log('Tabela vendas criada com sucesso')},
      error => {console.log('Erro ao criar tabela vendas: ' + error.message)}
    );
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS itensVenda (id INTEGER PRIMARY KEY NOT NULL, vendaId INTEGER, produtoId INTEGER, quantidade INTEGER, FOREIGN KEY(vendaId) REFERENCES vendas(id), FOREIGN KEY(produtoId) REFERENCES produtos(id));",
      [],
      () => {console.log('Tabela itensVenda criada com sucesso')},
      error => {console.log('Erro ao criar tabela itensVenda: ' + error.message)}
    );
  });
};

export { initDB };
