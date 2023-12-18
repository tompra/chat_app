import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';

const CustomAction = ({ wrapperStyle, iconTextStyle }) => {
    const actionSheet = useActionSheet();

    const onActionPress = () => {
        const options = [
            'Choose From Library',
            'Take Picture',
            'Send Location',
            'Cancel',
        ];
        const cancelButtonIndex = options.length - 1;
        actionSheet.showActionSheetWithOptions(
            { options, cancelButtonIndex },
            async (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        console.log('user want to pick an image');
                        return;
                    case 1:
                        console.log('user want to take a photo');
                        return;
                    case 2:
                        console.log('use wants to get their location');
                    default:
                }
            }
        );
    };

    return (
        <TouchableOpacity style={styles.container} onPress={onActionPress}>
            <View style={[styles.wrapper, wrapperStyle]}>
                <Text style={[styles.iconText, iconTextStyle]}>+</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
    },
    wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1,
    },
    iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 10,
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
});

export default CustomAction;
