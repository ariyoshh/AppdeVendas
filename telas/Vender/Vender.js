import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles'; // Certifique-se de que este caminho está correto

const Vender = () => {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@produtos');
      setProdutos(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (e) {
      Alert.alert("Erro", "Não foi possível carregar os produtos.");
    }
  };

  const adicionarAoCarrinho = (produto) => {
    setCarrinho(carrinhoAtual => [...carrinhoAtual, produto]);
  };

  const finalizarVenda = async () => {
    if (carrinho.length === 0) {
      Alert.alert("Aviso", "O carrinho está vazio.");
      return;
    }
    // Aqui você processaria a venda, possivelmente salvando-a em AsyncStorage ou enviando para um backend
    Alert.alert("Sucesso", "Venda finalizada com sucesso.");
    setCarrinho([]); // Limpar carrinho após finalizar a venda
  };

  const totalCarrinho = carrinho.reduce((total, item) => total + item.preco, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produtos</Text>
      <FlatList
        data={produtos}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.nome} - ${item.preco.toFixed(2)}</Text>
            <Button title="Adicionar" onPress={() => adicionarAoCarrinho(item)} />
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <Text style={styles.total}>Total: ${totalCarrinho.toFixed(2)}</Text>
      <Button title="Finalizar Venda" onPress={finalizarVenda} />
    </View>
  );
};

export default Vender;
