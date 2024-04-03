import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Image, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import { getAllProdutos, getAllCategorias } from '../../db/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const Vender = () => {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('todas');
  const [quantidadeCarrinho, setQuantidadeCarrinho] = useState(0);
  const navigation = useNavigation(); 

  useEffect(() => {
    carregarDados();
    atualizarQuantidadeCarrinho(); 
  }, []);

  const carregarDados = async () => {
    const produtosFromDB = await getAllProdutos();
    const categoriasFromDB = await getAllCategorias();
    setProdutos(produtosFromDB);
    setCategorias(categoriasFromDB);
  };

  const atualizarQuantidadeCarrinho = async () => {
    const carrinhoAtual = JSON.parse(await AsyncStorage.getItem('carrinho')) || [];
    const quantidade = carrinhoAtual.reduce((acc, item) => acc + item.quantidade, 0);
    setQuantidadeCarrinho(quantidade);
  };

  const adicionarAoCarrinho = async (produto) => {
    try {
      const item = { ...produto, quantidade: 1 };
      const carrinhoAtual = JSON.parse(await AsyncStorage.getItem('carrinho')) || [];
      carrinhoAtual.push(item);
      await AsyncStorage.setItem('carrinho', JSON.stringify(carrinhoAtual));
      alert('Produto adicionado ao carrinho!');
      atualizarQuantidadeCarrinho(); // Atualiza a quantidade de itens no carrinho.
    } catch (error) {
      alert('Erro ao adicionar ao carrinho: ' + error.message);
    }
  };

  const filtrarProdutos = categoriaSelecionada === 'todas' ? produtos : produtos.filter(produto => produto.categoriaId.toString() === categoriaSelecionada);

  return (
    <View style={styles.container}>
      <Text>Vender Produtos</Text>
      <Picker
        selectedValue={categoriaSelecionada}
        onValueChange={(itemValue) => setCategoriaSelecionada(itemValue)}
      >
        <Picker.Item label="Todas" value="todas" />
        {categorias.map(categoria => (
          <Picker.Item key={categoria.id} label={categoria.nome} value={categoria.id.toString()} />
        ))}
      </Picker>
      <FlatList
        data={filtrarProdutos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.imagemUri }} style={styles.imagem} />
            <Text>{item.nome} - R${item.preco.toFixed(2)}</Text>
            {/* Ajuste o caminho da imagem conforme necessário */}
            <Button title="Adicionar ao Carrinho" onPress={() => adicionarAoCarrinho(item)} />
          </View>
        )}
      />
      <Button
        title={`Ir para o Carrinho (${quantidadeCarrinho} itens)`}
        onPress={() => navigation.navigate('Carrinho')}
      />
    </View>
  );
};

export default Vender;
