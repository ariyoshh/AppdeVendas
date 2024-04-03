import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useNavigation, useRoute } from '@react-navigation/native';
import Background from '../../components/Background/Background';
import styles from './styles';

const db = SQLite.openDatabase('app_vendas.db');

const DetalhesVenda = () => {
  const [detalhesVenda, setDetalhesVenda] = useState(null);
  const route = useRoute();
  const { vendaId } = route.params;

  useEffect(() => {
 const carregarDetalhesVenda = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT vendas.*, produtos.nome AS nome_produto, produtos.preco AS preco_produto, 
      categorias.nome AS nome_categoria, itensVenda.quantidade 
      FROM vendas 
      INNER JOIN itensVenda ON vendas.id = itensVenda.vendaId 
      INNER JOIN produtos ON itensVenda.produtoId = produtos.id
      INNER JOIN categorias ON produtos.categoriaId = categorias.id 
      WHERE vendas.id = ?;`,
      [vendaId],
      (_, { rows }) => {
        if (rows.length > 0) {
          const venda = rows._array[0];
          const produtosVendidos = rows._array.map(item => ({
            nome: item.nome_produto,
            preco: item.preco_produto,
            quantidade: item.quantidade,
            categoria: item.nome_categoria
          }));
          setDetalhesVenda({ ...venda, produtosVendidos });
        } else {
          Alert.alert('Erro', 'Detalhes da venda não encontrados.');
        }
      },
      (_, error) => {
        console.error('Erro ao carregar detalhes da venda: ', error);
        Alert.alert('Erro', 'Erro ao carregar detalhes da venda.');
      }
    );
  });
};

    carregarDetalhesVenda();
  }, [vendaId]);

  if (!detalhesVenda) {
    return (
      <View style={styles.container}>
        <Text>Carregando detalhes da venda...</Text>
      </View>
    );
  }

  return (
    <Background>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Detalhes da Venda</Text>
          <Text style={styles.details}>Data da Venda: {detalhesVenda.data}</Text>
          <Text style={styles.details}>Total da Venda: ${detalhesVenda.total.toFixed(2)}</Text>
          <Text style={styles.title}>Produtos Vendidos:</Text>
          <ScrollView>
            {detalhesVenda.produtosVendidos.map((produto, index) => (
            <View key={index}>
              <Text>Produto: {produto.nome} - {produto.categoria}</Text>
              <Text>Quantidade: {produto.quantidade}</Text>
              <Text>Preço: ${produto.preco.toFixed(2)}</Text>
              <Text>Preço total do produto: ${(produto.quantidade * produto.preco).toFixed(2)}</Text>
              <Text></Text>
            </View>
            ))}

          </ScrollView>
          
        </View>
      </ScrollView>
    </Background>
  );
};

export default DetalhesVenda;