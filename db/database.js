import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('app_vendas.db');

const dropTables = () => {
  db.transaction(tx => {
    tx.executeSql("DROP TABLE IF EXISTS itensVenda;", [], () => console.log('Tabela itensVenda excluída'), (_, error) => console.log('Erro ao excluir tabela itensVenda:', error.message));
    tx.executeSql("DROP TABLE IF EXISTS vendas;", [], () => console.log('Tabela vendas excluída'), (_, error) => console.log('Erro ao excluir tabela vendas:', error.message));
    tx.executeSql("DROP TABLE IF EXISTS produtos;", [], () => console.log('Tabela produtos excluída'), (_, error) => console.log('Erro ao excluir tabela produtos:', error.message));
    tx.executeSql("DROP TABLE IF EXISTS categorias;", [], () => console.log('Tabela categorias excluída'), (_, error) => console.log('Erro ao excluir tabela categorias:', error.message));
  }, (error) => {
    console.log('Erro geral ao excluir tabelas:', error.message);
  }, () => {
    console.log('Todas as tabelas foram excluídas com sucesso');
  });
};

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

const insertVenda = async (data, total) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "INSERT INTO vendas (data, total) VALUES (?, ?);",
        [data, total],
        (_, result) => resolve(result.insertId),
        (_, error) => reject(error)
      );
    });
  });
};


const insertItensVenda = (vendaId, produtoId, quantidade) => {
  console.log('Iniciando inserção do item da venda...');
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "INSERT INTO itensVenda (vendaId, produtoId, quantidade) VALUES (?, ?, ?);",
        [vendaId, produtoId, quantidade],
        (_, result) => {
          console.log('Item da venda inserido com sucesso:', result.insertId);
          resolve(result.insertId);
        },
        (_, error) => {
          console.log('Erro ao inserir o item da venda:', error);
          reject(error);
        }
      );
    });
  });
};

const updateProduto = (id, nome, preco, categoriaId, imagemUri) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "UPDATE produtos SET nome=?, preco=?, categoriaId=?, imagemUri=? WHERE id=?;",
        [nome, preco, categoriaId, imagemUri, id],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

export {dropTables, initDB, getAllCategorias, insertCategoria, updateCategoria, deleteCategoria, getAllProdutos, insertProduto, deleteProduto, insertVenda, insertItensVenda, updateProduto};
