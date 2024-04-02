import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { db } from '../../db/database';
import { format } from 'date-fns';
import styles from './styles';

const TodasVendas = () => {
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    carregarVendas();
  }, []);

  const carregarVendas = () => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM vendas;",
        [],
        (_, { rows: { _array } }) => {
          setVendas(_array);
        },
        (_, error) => {
          console.error('Erro ao carregar as vendas:', error);
        }
      );
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Data e Hora: {format(new Date(item.data), 'dd/MM/yyyy HH:mm:ss')}</Text>
      <Text style={styles.itemText}>Produtos:</Text>
      <FlatList
        data={item.produtos}
        renderItem={({ item }) => (
          <View style={styles.produtoContainer}>
            <Text style={styles.produtoText}>Nome: {item.nome}</Text>
            <Text style={styles.produtoText}>Categoria: {item.categoria}</Text>
            <Text style={styles.produtoText}>Quantidade: {item.quantidade}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Todas as Vendas</Text>
      <FlatList
        data={vendas}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </ScrollView>
  );
};

export default TodasVendas;
