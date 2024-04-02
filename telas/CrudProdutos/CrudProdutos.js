import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import styles from './styles';
import Item from '../../components/Item/Item'; 
import { getAllCategorias, getAllProdutos, insertProduto, updateProduto, deleteProduto } from '../../db/database';

const CrudProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [nomeProduto, setNomeProduto] = useState('');
  const [precoProduto, setPrecoProduto] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [imagemUri, setImagemUri] = useState('');
  const [produtoEditando, setProdutoEditando] = useState(null);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const categoriasFromDB = await getAllCategorias();
      const produtosFromDB = await getAllProdutos();
      setCategorias(categoriasFromDB);
      setProdutos(produtosFromDB);
    } catch (error) {
      Alert.alert('Erro ao carregar os dados', error.message);
    }
  };

  const adicionarOuEditarProduto = async () => {
    try {
      if (!nomeProduto.trim() || !precoProduto.trim() || !categoriaSelecionada) {
        Alert.alert('Erro', 'Por favor, preencha todos os campos.');
        return;
      }
      if (produtoEditando) {
        await updateProduto(produtoEditando, nomeProduto, parseFloat(precoProduto), categoriaSelecionada, imagemUri);
        Alert.alert('Sucesso', 'Produto atualizado com sucesso!');
      } else {
        await insertProduto(nomeProduto, parseFloat(precoProduto), categoriaSelecionada, imagemUri);
        Alert.alert('Sucesso', 'Produto adicionado com sucesso!');
      }
      limparFormulario();
      carregarDados();
    } catch (error) {
      Alert.alert('Erro ao adicionar/editar o produto', error.message);
    }
  };

  const selecionarImagem = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
      if (response.didCancel) {
        console.log('Usuário cancelou a escolha da imagem.');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.assets[0].uri };
        setImagemUri(source.uri);
      }
    });
  };

  const iniciarEdicao = (produto) => {
    setNomeProduto(produto.nome);
    setPrecoProduto(produto.preco.toString());
    setCategoriaSelecionada(produto.categoriaId.toString());
    setImagemUri(produto.imagemUri);
    setProdutoEditando(produto.id);
  };

  const limparFormulario = () => {
    setNomeProduto('');
    setPrecoProduto('');
    setCategoriaSelecionada('');
    setImagemUri('');
    setProdutoEditando(null);
  };

  return (
    <View style={styles.container}>
      <Text>Nome do Produto:</Text>
      <TextInput value={nomeProduto} onChangeText={setNomeProduto} style={styles.input} />
      <Text>Preço do Produto:</Text>
      <TextInput value={precoProduto} onChangeText={setPrecoProduto} keyboardType="numeric" style={styles.input} />
      <Text>Categoria:</Text>
      <Picker
        selectedValue={categoriaSelecionada}
        onValueChange={(itemValue) => setCategoriaSelecionada(itemValue)}
        style={styles.picker}
      >
        {categorias.map(categoria => (
          <Picker.Item key={categoria.id} label={categoria.nome} value={categoria.id} />
        ))}
      </Picker>
      <Button title="Escolher Imagem" onPress={selecionarImagem} />
      <Button title={produtoEditando ? "Editar Produto" : "Adicionar Produto"} onPress={adicionarOuEditarProduto} />
      <ScrollView style={styles.scrollView}>
        {produtos.map(produto => (
          <Item
            key={produto.id}
            produto={produto}
            onDelete={carregarDados}
            onEdit={iniciarEdicao}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default CrudProdutos;
