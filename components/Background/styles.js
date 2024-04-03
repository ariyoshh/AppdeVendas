import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(195, 101, 113, 0.6)', 
    },
});

export default styles;
