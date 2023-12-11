import Chat from './components/Chat';
import Start from './components/Start';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { LogBox } from 'react-native';

const Stack = createNativeStackNavigator();
LogBox.ignoreAllLogs(['AsyncStorage has been extracted from']);

const App = () => {
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

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Start'>
                <Stack.Screen name='Start' component={Start} />
                <Stack.Screen name='Chat'>
                    {(props) => <Chat db={db} {...props} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
