import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import { getAllProdutos, getAllCategorias } from '../../db/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import Background from '../../components/Background/Background';
import { Ionicons } from '@expo/vector-icons';

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
      const carrinhoAtual = JSON.parse(await AsyncStorage.getItem('carrinho')) || [];
      const produtoIndex = carrinhoAtual.findIndex(item => item.id === produto.id);

      if (produtoIndex !== -1) {
        carrinhoAtual[produtoIndex].quantidade += 1;
        alert('Quantidade do produto atualizada no carrinho!');
      } else {
        const item = { ...produto, quantidade: 1 };
        carrinhoAtual.push(item);
        //alert('Produto adicionado ao carrinho!');
      }

      await AsyncStorage.setItem('carrinho', JSON.stringify(carrinhoAtual));
      atualizarQuantidadeCarrinho();
    } catch (error) {
      alert('Erro ao adicionar ao carrinho: ' + error.message);
    }
  };

  const filtrarProdutos = categoriaSelecionada === 'todas' ? produtos : produtos.filter(produto => produto.categoriaId.toString() === categoriaSelecionada);

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.modalContent}>
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
                {item.imagemUri ? (
                  <Image source={{ uri: item.imagemUri }} style={styles.imagem} />
                ) : (
                  <View style={styles.imagemPlaceholder}></View>
                )}
                <Text style={styles.nomeProduto}>{item.nome}  R${item.preco.toFixed(2)}</Text>
                <TouchableOpacity style={styles.button} onPress={() => adicionarAoCarrinho(item)}>
                  <Ionicons name="cart-outline" size={24} color="#2d5658" />
                </TouchableOpacity>
              </View>
            )}
          />
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Carrinho')}>
            <Text style={styles.buttonText}>Ir para o Carrinho ({quantidadeCarrinho} itens)</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  );
};

export default Vender;
