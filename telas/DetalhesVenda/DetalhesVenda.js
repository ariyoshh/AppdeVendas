import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useNavigation, useRoute } from '@react-navigation/native';
import Background from '../../components/Background/Background';

// Abre (ou cria, se não existir) o banco de dados
const db = SQLite.openDatabase('app_vendas.db');

const DetalhesVenda = () => {
  const [detalhesVenda, setDetalhesVenda] = useState(null);
  const route = useRoute();
  const { vendaId } = route.params;

  useEffect(() => {
    const carregarDetalhesVenda = () => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM vendas WHERE id = ?;',
          [vendaId],
          (_, { rows }) => {
            if (rows.length > 0) {
              setDetalhesVenda(rows._array[0]);
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
    </View>
    </ScrollView> 
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#47b6b5',
    width: '80%', 
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  details: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default DetalhesVenda;
