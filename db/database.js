import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('app_vendas.db');

const initDB = () => {
  db.transaction(tx => {
    // Criação da tabela categorias
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS categorias (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL);",
      [],
      () => console.log('Tabela categorias criada com sucesso'),
      (_, error) => console.log('Erro ao criar tabela categorias: ' + error.message)
    );

    // Criação da tabela produtos
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS produtos (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, preco REAL NOT NULL, categoriaId INTEGER, imagemUri TEXT, FOREIGN KEY(categoriaId) REFERENCES categorias(id));",
      [],
      () => console.log('Tabela produtos criada com sucesso'),
      (_, error) => console.log('Erro ao criar tabela produtos: ' + error.message)
    );

    // Criação da tabela vendas
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS vendas (id INTEGER PRIMARY KEY AUTOINCREMENT, data DATE NOT NULL, total REAL NOT NULL);",
      [],
      () => console.log('Tabela vendas criada com sucesso'),
      (_, error) => console.log('Erro ao criar tabela vendas: ' + error.message)
    );

    // Criação da tabela itensVenda
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS itensVenda (id INTEGER PRIMARY KEY AUTOINCREMENT, vendaId INTEGER, produtoId INTEGER, quantidade INTEGER, FOREIGN KEY(vendaId) REFERENCES vendas(id), FOREIGN KEY(produtoId) REFERENCES produtos(id));",
      [],
      () => console.log('Tabela itensVenda criada com sucesso'),
      (_, error) => console.log('Erro ao criar tabela itensVenda: ' + error.message)
    );
  }, (error) => {
    console.log('Erro geral ao criar tabelas: ' + error.message);
  }, () => {
    console.log('Todas as tabelas foram criadas com sucesso');
  });
};

const getAllCategorias = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM categorias;",
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

const insertCategoria = (nome) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "INSERT INTO categorias (nome) VALUES (?);",
        [nome],
        (_, result) => resolve(result.insertId),
        (_, error) => reject(error)
      );
    });
  });
};

const updateCategoria = (id, nome) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "UPDATE categorias SET nome=? WHERE id=?;",
        [nome, id],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

const deleteCategoria = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "DELETE FROM categorias WHERE id=?;",
        [id],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};
const getAllProdutos = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM produtos;",
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      );
    });
  });
};
const insertProduto = (nome, preco, categoriaId, imagemUri) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "INSERT INTO produtos (nome, preco, categoriaId, imagemUri) VALUES (?, ?, ?, ?);",
        [nome, preco, categoriaId, imagemUri],
        (_, result) => resolve(result.insertId),
        (_, error) => reject(error)
      );
    });
  });
};

const deleteProduto = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "DELETE FROM produtos WHERE id = ?;",
        [id],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};
// Adicione aqui as funções para manipulação das tabelas produtos, vendas e itensVenda.

export { initDB, getAllCategorias, insertCategoria, updateCategoria, deleteCategoria, getAllProdutos, insertProduto, deleteProduto };
