import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e2b3b6',
    width: '80%', 
  },
  button: {
    backgroundColor: '#c36571',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imagem: {
    width: 50,
    height: 50,
  },
  nomeProduto: {
    maxWidth: 150,
    overflow: 'hidden',
  },
});

export default styles;
