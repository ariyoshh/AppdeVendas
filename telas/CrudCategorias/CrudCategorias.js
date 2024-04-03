import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';
import styles from './styles';
import Categorias from '../../components/Categorias/Categorias';
import Background from '../../components/Background/Background';
import { getAllCategorias, insertCategoria, updateCategoria, deleteCategoria } from '../../db/database';

const CrudCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [novaCategoria, setNovaCategoria] = useState('');

  useEffect(() => {
    carregarCategorias();
  }, []);

  const carregarCategorias = async () => {
    try {
      const categoriasFromDB = await getAllCategorias();
      setCategorias(categoriasFromDB);
    } catch (error) {
      Alert.alert('Erro ao carregar as categorias', error.message);
    }
  };

  const adicionarCategoria = async () => {
    try {
      if (!novaCategoria.trim()) {
        Alert.alert('Por favor, insira o nome da categoria.');
        return;
      }
      await insertCategoria(novaCategoria);
      setNovaCategoria('');
      carregarCategorias();
    } catch (error) {
      Alert.alert('Erro ao adicionar a categoria', error.message);
    }
  };

  const handleDeleteCategoria = async (id) => {
    try {
      await deleteCategoria(id);
      carregarCategorias();
    } catch (error) {
      Alert.alert('Erro ao deletar a categoria', error.message);
    }
  };

  const handleEditCategoria = async (id, novoNome) => {
    try {
      await updateCategoria(id, novoNome);
      carregarCategorias();
    } catch (error) {
      Alert.alert('Erro ao editar a categoria', error.message);
    }
  };

  return (
    <Background>
      <View style={styles.container}>
      <View style={styles.modalContent}>
      <TextInput
        style={styles.input}
        placeholder="Nova Categoria"
        value={novaCategoria}
        onChangeText={setNovaCategoria}
      />
     <TouchableOpacity style={styles.button} onPress={adicionarCategoria}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scrollView}>
        {categorias.map((categoria) => (
          <Categorias
            key={categoria.id.toString()}
            categoria={categoria}
            onDelete={handleDeleteCategoria}
            onEdit={handleEditCategoria}
          />
        ))}
      </ScrollView>
    </View>
    </View>
    </Background>
  );
};

export default CrudCategorias;
