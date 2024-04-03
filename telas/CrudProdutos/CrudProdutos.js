import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, Image, ImageBackground, TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker'; 
import { Picker } from '@react-native-picker/picker';
import styles from './styles';
import Item from '../../components/Item/Item';
import Background from '../../components/Background/Background';
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

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Desculpe, precisamos de permissões da biblioteca de imagens para fazer isso funcionar!');
        }
      }
    })();
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

  const selecionarImagem = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImagemUri(result.uri);
    }
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
    <Background>
      <View style={styles.container}>
        <View style={styles.modalContent}>
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
          <TouchableOpacity style={styles.button} onPress={selecionarImagem}>
            <Text style={styles.buttonText}>Escolher Imagem</Text>
          </TouchableOpacity>
          {imagemUri ? <Image source={{ uri: imagemUri }} style={{ width: 200, height: 200 }} /> : null}
          <TouchableOpacity style={styles.button} onPress={adicionarOuEditarProduto}>
            <Text style={styles.buttonText}>{produtoEditando ? "Editar Produto" : "Adicionar Produto"}</Text>
          </TouchableOpacity>
          <ScrollView style={styles.scrollView}>
            {produtos.map(produto => (
              <Item
                key={produto.id}
                produto={produto}
                onDelete={carregarDados}
                onEdit={iniciarEdicao}
              /> ))}
          </ScrollView>
        </View>
      </View>
    </Background>
  );
};

export default CrudProdutos;