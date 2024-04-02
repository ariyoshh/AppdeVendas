import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import styles from './styles'; 
import { deleteProduto } from '../../db/database'; 

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
        <Button title="Editar" onPress={() => onEdit(produto)} />
        <Button title="Deletar" onPress={handleDelete} />
      </View>
    </View>
  );
};

export default Item;
