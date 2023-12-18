import Chat from './components/Chat';
import Start from './components/Start';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import {
    disableNetwork,
    enableNetwork,
    getFirestore,
} from 'firebase/firestore';
import { LogBox, Alert } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { getStorage } from 'firebase/storage';

const Stack = createNativeStackNavigator();
LogBox.ignoreLogs(['@firebase/auth:, Auth (10.3.1)']);

const App = () => {
    const connectionStatus = useNetInfo();

    useEffect(() => {
        if (connectionStatus.isConnected === false) {
            Alert.alert('Connection lost!');
            disableNetwork(db);
        } else if (connectionStatus.isConnected === true) {
            enableNetwork(db);
        }
    }, [connectionStatus.isConnected]);

    const firebaseConfig = {
        apiKey: 'AIzaSyC5BVfnZHAmQKGnRa7l42AWGHmYK8fN6rA',
        authDomain: 'chat-app-4854f.firebaseapp.com',
        projectId: 'chat-app-4854f',
        storageBucket: 'chat-app-4854f.appspot.com',
        messagingSenderId: '899031419459',
        appId: '1:899031419459:web:e51046b6e8bb48dec462f6',
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const storage = getStorage(app);
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Start'>
                <Stack.Screen name='Start' component={Start} />
                <Stack.Screen name='Chat'>
                    {(props) => (
                        <Chat
                            isConnected={connectionStatus.isConnected}
                            db={db}
                            storage={storage}
                            {...props}
                        />
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
