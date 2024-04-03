import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';
import Background from '../../components/Background/Background';
import styles from './styles';

const db = SQLite.openDatabase('app_vendas.db');


const TodasVendas = () => {
  const [vendas, setVendas] = useState([]);
  const navigation = useNavigation(); 

  useEffect(() => {
    carregarVendas();
  }, []);

  const carregarVendas = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM vendas;',
        [],
        (_, { rows: { _array } }) => setVendas(_array),
        (_, error) => {
          console.error('Erro ao carregar vendas: ', error);
          Alert.alert('Erro', 'Erro ao carregar vendas do banco de dados.');
          return false;
        }
      );
    });
  };

  const formatarData = (dataISO) => {
  const data = new Date(dataISO);
  return [
    data.getDate().toString().padStart(2, '0'),
    (data.getMonth() + 1).toString().padStart(2, '0'),
    data.getFullYear(),
  ].join('/');
};

  return (
    <Background>
      <FlatList
        data={vendas}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              backgroundColor: '#f9f9f9',
              padding: 20,
              marginBottom: 10,
              borderRadius: 5,
            }}
            onPress={() => {
              navigation.navigate('DetalhesVenda', { vendaId: item.id })
              console.log('Detalhes da venda', item.id);
            }}
          >
            <Text style={{ fontSize: 18 }}>ID: {item.id} Data: {item.data}</Text>
            <Text style={{ fontSize: 18 }}>Total: ${item.total.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </Background>
  );
};

export default TodasVendas;
