# Project Description

The front-end of the Mobile application of <strong>Event management</strong>.

The application has the following pages: 

- The <strong>Dashboard</strong> Shows all events and user can filter the events by type.
- <strong> Log in Page </strong> When click on login there two options 1. Log in 2. create Account
- <strong> Dash Board </strong> show all the events if user want to register for an event then user should login in the application. 
- <strong> Dash Board have a filter on top </strong> User can filter an events by(All, running, walking, swimming, biking) 
  After log in 
- <strong> Dash Board </strong>User can create an event and also register for other user events. 
- <strong> Approval Events</strong> User can accept or rejected other user events
- <strong> Subscribed Events </strong> Shows the events which user is subscribed. See the status of the events.
- <strong> Setting</strong> User can logout.

## For Live demo

- Install Expo from Play store
- Give the following project URLs in expo application \
  or Scan QR Code of the following link from expo application

[Expo link ](https://expo.dev/@asadhameedafridi/sport-event)

## Setup with Back-end API

[Back-End Setup ](https://github.com/asadhameed/event-management-backend)

## Error Or Warning

1.  Animated: `useNativeDriver` was not specified issue of ReactNativeBase Input. \
    <strong>Solution :- </strong> write the following code in app.js \
     import { LogBox } from 'react-native' \
     LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message \
     LogBox.ignoreAllLogs(); \

## Available Scripts

In the project directory, you can run:

### `npm i`

This command will install all the dependency packages in the node_modules directory.

### `npm install --save @react-navigation/stack @react-navigation/native`

### `expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view`

React Navigation is made up of some core utilities and those are then used by navigators to create the navigation structure in your app.\

More help [React Navigation](https://reactnavigation.org/docs/getting-started)

### `npm install --save react-native-dotenv`

This babel plugin lets you inject your environment variables into your react-native environment using dotenv for multiple environments.\

More help [React Native DotEnv](https://www.npmjs.com/package/react-native-dotenv)

### `npm install --save @react-navigation/bottom-tabs`

A simple tab bar on the bottom of the screen that lets you switch between different routes. Routes are lazily initialized -- their screen components are not mounted until they are first focused. \

More help [React Navigation Bottom Tabs](https://reactnavigation.org/docs/bottom-tab-navigator)

### `npm install --save @react-native-picker/picker`

Picker is a cross-platform UI component for selecting an item from a list of options. \

More help [React Native Picker](https://github.com/react-native-picker/picker)

### `npm i react-native-action-button --save`

customizable multi-action-button component for react-native. \

More help [React Native Action Button](https://github.com/mastermoo/react-native-action-button)

### `expo install expo-image-picker`

expo-image-picker provides access to the system's UI for selecting images and videos from the phone's library or taking a photo with the camera. \

More help [Expo image picker](https://docs.expo.io/versions/latest/sdk/imagepicker/)

### `npm install @react-native-async-storage/async-storage`

An asynchronous, unencrypted, persistent, key-value storage system for React Native. \

More help [React Native Async-storage](https://github.com/react-native-async-storage/async-storage)

### `npm install @react-native-community/datetimepicker --save`

React Native date & time picker component for iOS, Android and Windows. \

More help [React Native Date Time Picker](https://github.com/react-native-datetimepicker/datetimepicker)

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Open [Back-End Code](https://github.com/asadhameed/event-management-backend)

### Open [Front-End Code of Web Application](https://github.com/asadhameed/event-management-frontend)
