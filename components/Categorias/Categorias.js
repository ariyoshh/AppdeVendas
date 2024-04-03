import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert, TouchableOpacity} from 'react-native';
import styles from './styles'; 
import { Ionicons } from '@expo/vector-icons';

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
          <TouchableOpacity style={styles.iconButton} onPress={handleEdit}>
            <Ionicons name="checkmark-outline" size={24} color="#c36571" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton} 
            onPress={() => setEditando(false)}>
            <Ionicons name="close-outline" size={24} color="#2d5658" />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.itemText}>{categoria.nome}</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.iconButton} onPress={() => setEditando(true)}>
              <Ionicons name="pencil-outline" size={24} color="#c36571" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton} 
              onPress={handleDelete}>
              <Ionicons name="trash-outline" size={24} color="#2d5658" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Categorias;
