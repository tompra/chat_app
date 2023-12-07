import { StyleSheet, View, Text } from 'react-native';
import { useEffect } from 'react';

const Chat = ({ route, navigation }) => {
    const { name, selectedColor } = route.params;

    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: selectedColor }]}>
            <Text style={styles.welcomeChat}>Welcome to the Chat!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    welcomeChat: {
        color: '#fff',
        fontSize: 30,
        textAlign: 'center',
    },
});

export default Chat;
