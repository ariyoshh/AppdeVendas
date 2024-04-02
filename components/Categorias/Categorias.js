import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';
import styles from './styles'; 

const Categorias = ({ categoria, onDelete, onEdit }) => {
  const [editando, setEditando] = useState(false);
  const [novoNome, setNovoNome] = useState(categoria.nome);

  const handleDelete = () => {
    onDelete(categoria.id);
  };

  const handleEdit = () => {
    if (!novoNome.trim()) {
      Alert.alert('O nome da categoria não pode ficar em branco.');
      return;
    }
    onEdit(categoria.id, novoNome);
    setEditando(false);
  };

  return (
    <View style={styles.itemContainer}>
      {editando ? (
        <>
          <TextInput
            value={novoNome}
            onChangeText={setNovoNome}
            style={styles.input}
          />
          <Button title="Salvar" onPress={handleEdit} />
          <Button title="Cancelar" onPress={() => setEditando(false)} />
        </>
      ) : (
        <>
          <Text style={styles.itemText}>{categoria.nome}</Text>
          <View style={styles.buttonsContainer}>
            <Button title="Editar" onPress={() => setEditando(true)} />
            <Button title="Remover" onPress={handleDelete} />
          </View>
        </>
      )}
    </View>
  );
};

export default Categorias;
