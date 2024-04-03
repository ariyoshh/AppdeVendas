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
    width: 200,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#ffebee',
    borderRadius: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#e57373',
    padding: 5,
    marginHorizontal: 5,
    borderRadius: 3,
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 18,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    marginHorizontal: 5,
    width: 40, 
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    width: 50,
  },
  nomeProduto: {
    maxWidth: 150,
    overflow: 'hidden',
  },
});

export default styles;
