This is a simple project that I undertook to build an end-to-end mobile app using React Native with Expo.
It has two screens, and data is passed between them using useState variables in App.js that are passed as props
I have aimed to keep the structure of the project tidy and modular and defined each screen function in a separate file, both of which are stored in the folder "screens"

To run the app:

run ```npm i``` to install dependencies

run ```npm start --tunnel``` to build the app and start the development server

press ```a``` to run on android emulator or ```i``` to run on ios simulator
This will run the app on a physical device instead if one is connected

The app uses a .env file to keep the API key private and to make configuration easy
