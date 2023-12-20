import { TouchableOpacity, View, Text, StyleSheet, Alert } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { useState } from 'react';

const CustomAction = ({
    wrapperStyle,
    iconTextStyle,
    onSend,
    storage,
    userID,
}) => {
    const actionSheet = useActionSheet();
    const [image, setImage] = useState(null);

    const generateReference = (uri) => {
        const timeStamp = new Date().getTime();
        const imageName = uri.split('/')[uri.split('/').length - 1];
        return `${userID}-${timeStamp}-${imageName}`;
    };

    const uploadAndSendImage = async (imageURI) => {
        try {
            const uniqueRefString = generateReference(imageURI);
            const newUploadRef = ref(storage, uniqueRefString);
            const response = await fetch(imageURI);
            const blob = await response.blob();
            uploadBytes(newUploadRef, blob).then(async (snapshot) => {
                const imageURL = await getDownloadURL(snapshot.ref);
                onSend({ image: imageURL });
            });
        } catch (error) {
            console.error(`Error inside the uploadAndSendImage: ${error}`);
        }
    };
    const pickImage = async () => {
        try {
            console.log('trying to pick image....');
            let permissions =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            console.log('permissions: ', permissions);
            if (permissions?.granted) {
                console.log('Permission granted, trying to pick image...');
                let result = await ImagePicker.launchImageLibraryAsync({
                    base64: false,
                    allowsEditing: true,
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    quality: 0.2,
                });
                console.log('result', result);
                if (!result.cancelled) {
                    console.log('Image picked successfully');
                    const imageUri = result.assets[0].uri;

                    // The following line ensures that the URI has the 'file' scheme
                    const correctedUri = imageUri.startsWith('file://')
                        ? imageUri
                        : `file://${imageUri}`;

                    setImage({ ...result.assets[0], uri: correctedUri });
                    await uploadAndSendImage(correctedUri);
                } else {
                    console.log('Image picking cancelled');
                    setImage(null);
                }
            } else {
                console.error('Media library permissions not granted');
            }
        } catch (error) {
            console.error(`Error inside the picking image: ${error}`);
        }
    };

    const takePhoto = async () => {
        try {
            let permissions = await ImagePicker.requestCameraPermissionsAsync();
            if (permissions?.granted) {
                let result = await ImagePicker.launchCameraAsync();
                if (!result.canceled) {
                    await uploadAndSendImage(result.assets[0].uri);
                } else Alert.alert("Permissions haven't been granted.");
            }
        } catch (error) {
            console.log(`Error inside the takePhoto function: ${error}`);
        }
    };

    const getLocation = async () => {
        try {
            let permissions =
                await Location.requestForegroundPermissionsAsync();
            if (permissions?.granted) {
                const location = await Location.getCurrentPositionAsync({});
                if (location) {
                    onSend({
                        location: {
                            longitude: location.coords.longitude,
                            latitude: location.coords.latitude,
                        },
                    });
                } else Alert.alert('Error occurred while fetching location');
            } else Alert.alert("Permission haven't been granted");
        } catch (error) {
            console.log(`Error inside the getLocation function: ${error}`);
        }
    };

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
                        try {
                            await pickImage();
                            return;
                        } catch (error) {
                            console.error(`Error in picking image: ${error}`);
                        }
                    case 1:
                        try {
                            await takePhoto();
                            return;
                        } catch (error) {
                            console.error(`Error in taking photo: ${error}`);
                        }
                    case 2:
                        try {
                            await getLocation();
                        } catch (error) {
                            console.error(
                                `Error in getting location: ${error}`
                            );
                        }
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
        width: 30,
        height: 30,
        marginLeft: 10,
        marginBottom: 10,
    },
    wrapper: {
        borderRadius: 15,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1,
    },
    iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 18,
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
});

export default CustomAction;
