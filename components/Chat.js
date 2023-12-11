import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { useEffect, useState } from 'react';
import {
    Bubble,
    GiftedChat,
    SystemMessage,
    Day,
    Time,
    InputToolbar,
} from 'react-native-gifted-chat';
import {
    addDoc,
    collection,
    query,
    onSnapshot,
    orderBy,
} from 'firebase/firestore';

const Chat = ({ route, navigation, db }) => {
    const { name, selectedColor, userID } = route.params;
    // messages as a state
    const [messages, setMessages] = useState([]);

    // custom function when user sends a message
    const onSend = (newMessages) => {
        return addDoc(collection(db, 'messages'), newMessages[0]);
    };

    useEffect(() => {
        navigation.setOptions({ title: name });
        // set message to message object from the gifted chat, required: id, createdAt, user, text.
        const q = query(
            collection(db, 'messages'),
            orderBy('createdAt', 'desc')
        );
        const unsubMessages = onSnapshot(q, (docs) => {
            let newMessages = [];
            docs.forEach((doc) => {
                newMessages.push({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: new Date(doc.data().createdAt.toDate()),
                });
            });
            setMessages(newMessages);
        });
        return () => {
            if (unsubMessages) unsubMessages();
        };
    }, []);

    // rendering bubble for messages
    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    // render the background color and border to making a talk bubble for left and right
                    right: {
                        backgroundColor: '#D0E37F',
                        borderBottomRightRadius: 0,
                        borderBottomLeftRadius: 15,
                        borderTopRightRadius: 15,
                        borderTopLeftRadius: 15,
                    },
                    left: {
                        backgroundColor: '#DDB967',
                        borderBottomRightRadius: 15,
                        borderBottomLeftRadius: 15,
                        borderTopRightRadius: 15,
                        borderTopLeftRadius: 0,
                    },
                }}
                textStyle={{
                    left: {
                        color: '#000',
                    },
                    right: {
                        color: '#000',
                    },
                }}
            />
        );
    };

    // rendering system message for styling the system message
    const renderSystemMessage = (props) => {
        return (
            <SystemMessage
                {...props}
                textStyle={{
                    textAlign: 'center',
                    color: '#fff',
                }}
            />
        );
    };

    const renderDay = (props) => {
        return <Day {...props} textStyle={{ color: '#fff' }} />;
    };

    const renderTime = (props) => {
        return (
            <Time
                {...props}
                timeTextStyle={{
                    left: { color: '#000' },
                    right: { color: '#000' },
                }}
            />
        );
    };

    const renderInput = (props) => {
        return (
            <InputToolbar
                {...props}
                containerStyle={{
                    borderRadius: 25,
                    paddingLeft: 5,
                    marginBottom: 5,
                    marginHorizontal: 5,
                }}
            />
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: selectedColor }]}>
            <GiftedChat
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={{ _id: userID, name: name }}
                renderBubble={renderBubble}
                renderSystemMessage={renderSystemMessage}
                renderTime={renderTime}
                renderDay={renderDay}
                alignTop={true}
                renderInputToolbar={(props) => renderInput(props)}
            />
            {Platform.OS === 'android' ? (
                <KeyboardAvoidingView behavior='height' />
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Chat;
