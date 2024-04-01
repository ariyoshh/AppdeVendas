import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles'; // Certifique-se de que o caminho esteja correto

const CrudCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaAtual, setCategoriaAtual] = useState('');

  useEffect(() => {
    carregarCategorias();
  }, []);

  const carregarCategorias = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('categorias');
      setCategorias(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (e) {
      Alert.alert('Erro ao carregar as categorias');
    }
  };

  const adicionarCategoria = async () => {
    if (!categoriaAtual.trim()) {
      Alert.alert('Por favor, insira o nome da categoria.');
      return;
    }
    const novaCategoria = { id: Date.now().toString(), nome: categoriaAtual };
    const novaLista = [...categorias, novaCategoria];
    try {
      await AsyncStorage.setItem('categorias', JSON.stringify(novaLista));
      setCategorias(novaLista);
      setCategoriaAtual('');
    } catch (e) {
      Alert.alert('Erro ao adicionar a categoria');
    }
  };

  const removerCategoria = async (id) => {
    const novaLista = categorias.filter(categoria => categoria.id !== id);
    try {
      await AsyncStorage.setItem('categorias', JSON.stringify(novaLista));
      setCategorias(novaLista);
    } catch (e) {
      Alert.alert('Erro ao remover a categoria');
    }
  };

  const editarCategoria = async (id, novoNome) => {
    const index = categorias.findIndex(categoria => categoria.id === id);
    if (index !== -1) {
      const novaLista = [...categorias];
      novaLista[index].nome = novoNome; // Atualize com a lógica adequada para capturar o novo nome
      try {
        await AsyncStorage.setItem('categorias', JSON.stringify(novaLista));
        setCategorias(novaLista);
      } catch (e) {
        Alert.alert('Erro ao editar a categoria');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciar Categorias</Text>
      <TextInput
        style={styles.input}
        placeholder="Nova Categoria"
        value={categoriaAtual}
        onChangeText={setCategoriaAtual}
      />
      <Button title="Adicionar" onPress={adicionarCategoria} />
      <FlatList
        data={categorias}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.nome}</Text>
            <View style={styles.buttonsContainer}>
              <Button title="Editar" onPress={() => editarCategoria(item.id, 'NovoNome')} />
              <Button title="Remover" onPress={() => removerCategoria(item.id)} />
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default CrudCategorias;
