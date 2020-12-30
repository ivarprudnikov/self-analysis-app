Self-analysis app
=================

![Node.js CI](https://github.com/ivarprudnikov/self-analysis-app/workflows/Node.js%20CI/badge.svg?branch=dev)

It is an annual questionnaire which allows you to focus on your accomplishments and failures over the year. 
The questions were suggested quite some time ago in the book called "Think and grow rich". Despite the book title being a bit cheesy, 
and it's contents somewhat dated, the questions remain useful until this day.

## License

App is licensed under the GPL, which guarantees end users the freedom to study, share, and modify the software.

## Development

## Running Locally

* react-native cli usage https://github.com/react-native-community/cli/blob/master/docs/commands.md
* metro docs https://facebook.github.io/metro/docs/getting-started

```shell
# install dependencies
npm i

# a) start the metro development server;
npm start
# b) or, build and open an app in the existing iOS simulator;
npm run ios
# c) or, build and open an app in the existing Android simulator.
npm run android
```

### Using a device

https://reactnative.dev/docs/running-on-device

**iOS**

* open `ios/` directory in Xcode
* set up development account/team for signing (which should override the current one)
* select the connected device and run the app
* trust an app developer on the device https://support.apple.com/en-us/HT204460
