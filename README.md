# ChatApp

![chatAppInitial](https://github.com/tompra/chat_app/assets/143709419/b5258c84-d885-434b-bf6b-a3ad2f4295f6)

## Project description
The project aims to leverage modern technologies to streamline the development of a mobile chat app. By utilizing React Native, Expo, and Google Firestore Database, the goal is to create a feature-rich application with a single codebase, showcasing proficiency in JavaScript mobile development.
   
## Project Dependecies
| Dependency                                 | Description                                                                                                 |
|--------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| @react-native-async-storage/async-storage | An asynchronous, unencrypted, persistent, key-value storage system for React Native.                        |
| @react-native-community/netinfo           | A module for React Native that provides information about the device's network connectivity status.         |
| @react-navigation/native                   | A routing and navigation library for React Native.                                                            |
| @react-navigation/native-stack            | A stack navigator for React Navigation.                                                                      |
| expo                                       | A framework and a platform for universal React applications.                                                 |
| expo-image-picker                          | A library for accessing the user's image library and camera.                                                 |
| expo-location                              | A library for accessing the device's location data.                                                          |
| expo-status-bar                            | A component that provides a system status bar for Expo apps.                                                  |
| firebase                                   | A platform developed by Google for creating mobile and web applications.                                      |
| react                                      | A JavaScript library for building user interfaces.                                                           |
| react-native                               | A framework for building native apps using React.                                                             |
| react-native-gifted-chat                   | A chat UI component for React Native.                                                                        |
| react-native-maps                          | A library that provides Maps components for React Native.                                                     |
| react-native-paper                         | A UI component library for React Native.                                                                     |
| react-native-safe-area-context             | A library for accessing the safe area insets of the device screen.                                            |
| react-native-screens                       | A package for managing screens and their navigation state in React Native.                                    |
| @babel/core                                | A JavaScript compiler that converts ECMAScript 2015+ code into a backwards compatible version of JavaScript. |

## Key Features
- A page where users can enter their name and choose a background color for the chat screen before joining the chat.
- A page displaying the conversation, as well as an input field and submit button.
- The chat must provide users with two additional communication features: sending images and location data.
- Data gets stored online and offline.

## How to get the project running
1. Clone the repository: `git clone  http://github.com/tompra/chat_app.git`
2. Install dependencies: `npm install`
3. Install expo globally: `npm install -g expo-cli`
4. Generate your own Firebase configuration code in `firebase.google.com`
5. Add the Firebase storage configuration to App.js: change the `const firebaseConfiguration = {} `
6. Run the app on the Android or iOS emulator: `expo start`
