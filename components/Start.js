import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { getAuth, signInAnonymously } from 'firebase/auth';

const Start = ({ navigation }) => {
    const [selectedColor, setSelectedColor] = useState('#92965B');
    const [name, setName] = useState('');
    const backgroundImg = require('../assets/backgroundImage.png');
    const colorOptions = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];
    const handleColorChange = (color) => {
        setSelectedColor(color);
    };
    const auth = getAuth();

    const signInUser = () => {
        if (!name.trim()) {
            Alert.alert('Error', 'Name is required');
            return;
        }
        signInAnonymously(auth)
            .then((result) => {
                navigation.navigate('Chat', {
                    userID: result.user.uid,
                    name: name,
                    selectedColor: selectedColor,
                });
                Alert.alert('Signed in Succesfully!');
            })
            .catch((err) => {
                console.error(`Unable to sign user: ${err}`);
                Alert.alert('Unable to sign in, try later again');
            });
    };

    return (
        <ImageBackground source={backgroundImg} style={styles.container}>
            <Text style={styles.heading}>Chat App</Text>
            <View style={styles.content}>
                <TextInput
                    style={styles.textInput}
                    value={name}
                    onChangeText={setName}
                    mode='outlined'
                    placeholder='Your name'
                />
                <Text style={styles.chooseText}>Choose Background Color:</Text>
                <View style={styles.colorsContainer}>
                    {colorOptions.map((color, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.colorOption,
                                {
                                    backgroundColor: color,
                                },
                            ]}
                            onPress={() => handleColorChange(color)}
                        />
                    ))}
                </View>
                <TouchableOpacity style={styles.startBtn} onPress={signInUser}>
                    <Text style={styles.startContentBtn}>Start Chatting</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    content: {
        backgroundColor: '#fff',
        height: '44%',
        width: '88%',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
    },
    heading: {
        fontSize: 45,
        fontWeight: '600',
        color: '#fff',
    },
    textInput: {
        width: '88%',
        borderWidth: 1,
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 1,
        borderRadius: 5,
    },
    chooseText: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        paddingHorizontal: 20,
    },
    colorOption: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 5,
    },
    colorsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignSelf: 'flex-start',
    },
    chooseTitle: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: '100%',
    },
    startBtn: {
        backgroundColor: '#757083',
        width: '88%',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    startContentBtn: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
});

export default Start;
