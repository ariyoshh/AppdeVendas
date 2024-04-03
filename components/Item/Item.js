import React from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import styles from './styles';
import { deleteProduto } from '../../db/database';
import { Ionicons } from '@expo/vector-icons';

const Item = ({ produto, onDelete, onEdit }) => {

  const handleDelete = async () => {
    try {
      await deleteProduto(produto.id);
      onDelete();
    } catch (error) {
      Alert.alert('Erro ao deletar o produto', error.message);
    }
  };

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{`${produto.nome} - R$${produto.preco.toFixed(2)}`}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => onEdit(produto)}>
          <Ionicons name="pencil-outline" size={24} color="#c36571" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={24} color="#2d5658" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Item;
