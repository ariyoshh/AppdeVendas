import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  button: {
    marginTop: 10,
    padding: 5,
    width: '70%',
    backgroundColor: 'rgba(195, 101, 113, 0.8)', 
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
  },
  buttonContent: {
    flexDirection: 'row', 
    alignItems: 'center',
    paddingLeft: 10, 
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default styles;
