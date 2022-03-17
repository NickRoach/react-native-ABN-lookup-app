This is a simple project that I undertook to build an end-to-end mobile app using React Native with Expo. It allows the user to enter an ABN query string, checks on the client side if it is valid with a checksum, and if it is, allows the user to look up the business names associated with that ABN with an API call.<br>
It has two screens, and data is passed between them using useState variables in App.js that are passed as props.<br>
I aimed to make the UI as intuitive as possible and provide feedback to the user if the ABN query they have entered has the wrong number of digits or is not valid.<br>
I have aimed to keep the structure of the project tidy and modular and defined each screen function in a separate file, both of which are stored in the directory "screens"<br>
The app uses a .env file to keep the API key private and to make configuration easy

To run the app:

run ```npm i``` to install dependencies

run ```npm start --tunnel``` to build the app and start the development server

press ```a``` to run on android emulator or ```i``` to run on ios simulator<br>
This will run the app on a physical device instead if one is connected
