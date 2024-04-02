import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentDateAndTime } from './dateUtils';
import { Alert } from 'react-native';
import { db } from '../db/database';

const handleEfetuarCompra = async (carrinho, setCarrinho, navigation) => {
  try {
    const dataHora = getCurrentDateAndTime();

    await db.transaction(async (tx) => {
      await tx.executeSql(
        'INSERT INTO vendas (data, total) VALUES (?, ?);',
        [dataHora, calcularTotal(carrinho)]
      );

      const vendaId = await getLatestVendaId(tx);

      for (const item of carrinho) {
        await tx.executeSql(
          'INSERT INTO itensVenda (vendaId, produtoId, quantidade) VALUES (?, ?, ?);',
          [vendaId, item.produto.id, item.quantidade]
        );
      }
    });

    await AsyncStorage.removeItem('carrinho');
    setCarrinho([]);

    Alert.alert('Compra efetuada com sucesso!');
    navigation.navigate('Home');
  } catch (error) {
    console.error('Erro ao efetuar a compra:', error);
    Alert.alert('Erro ao efetuar a compra. Por favor, tente novamente.');
  }
};

const calcularTotal = (carrinho) => {
  return carrinho.reduce((total, item) => total + item.produto.preco * item.quantidade, 0);
};

const getLatestVendaId = async (tx) => {
  return new Promise((resolve, reject) => {
    tx.executeSql('SELECT last_insert_rowid() as id;', [], (_, result) => {
      if (result.rows.length > 0) {
        resolve(result.rows.item(0).id);
      } else {
        reject(new Error('Erro ao obter o ID da última venda'));
      }
    });
  });
};

export default handleEfetuarCompra;
