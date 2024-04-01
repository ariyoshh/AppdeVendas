import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

const CrudProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [nomeProduto, setNomeProduto] = useState('');
  const [precoProduto, setPrecoProduto] = useState('');

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('produtos');
      setProdutos(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (e) {
      Alert.alert('Erro ao carregar os produtos');
    }
  };

  const adicionarProduto = async () => {
    if (!nomeProduto.trim() || !precoProduto) {
      Alert.alert('Por favor, insira o nome e o preço do produto.');
      return;
    }
    const novoProduto = { id: Date.now().toString(), nome: nomeProduto, preco: parseFloat(precoProduto) };
    const novaLista = [...produtos, novoProduto];
    try {
      await AsyncStorage.setItem('produtos', JSON.stringify(novaLista));
      setProdutos(novaLista);
      setNomeProduto('');
      setPrecoProduto('');
    } catch (e) {
      Alert.alert('Erro ao adicionar o produto');
    }
  };

  const removerProduto = async (id) => {
    const novaLista = produtos.filter(produto => produto.id !== id);
    try {
      await AsyncStorage.setItem('produtos', JSON.stringify(novaLista));
      setProdutos(novaLista);
    } catch (e) {
      Alert.alert('Erro ao remover o produto');
    }
  };

  const editarProduto = async (id, novoNome, novoPreco) => {
    const index = produtos.findIndex(produto => produto.id === id);
    if (index !== -1) {
      const novaLista = [...produtos];
      novaLista[index].nome = novoNome;
      novaLista[index].preco = parseFloat(novoPreco);
      try {
        await AsyncStorage.setItem('produtos', JSON.stringify(novaLista));
        setProdutos(novaLista);
      } catch (e) {
        Alert.alert('Erro ao editar o produto');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciar Produtos</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        value={nomeProduto}
        onChangeText={setNomeProduto}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço do Produto"
        value={precoProduto}
        onChangeText={setPrecoProduto}
        keyboardType="numeric"
      />
      <Button title="Adicionar" onPress={adicionarProduto} />
      <FlatList
        data={produtos}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.nome} - ${item.preco.toFixed(2)}</Text>
            <View style={styles.buttonsContainer}>
              <Button title="Editar" onPress={() => editarProduto(item.id, item.nome, item.preco)} />
              <Button title="Remover" onPress={() => removerProduto(item.id)} />
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default CrudProdutos;
