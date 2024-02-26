import React, {Component, useState} from 'react';
import {
  Alert,
  AppRegistry,
  Button,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import AzureAuth from 'react-native-azure-auth';

const CLIENT_ID = 'f650c9cf-3b94-4368-b7f7-4de7d8fb0c6d'; // replace the string with YOUR client ID

const azureAuth = new AzureAuth({
  clientId: CLIENT_ID,
});

const App = () => {
  const [state, setState] = useState({
    accessToken: null,
    user: '',
    userId: '',
  });

  _onLogin = async () => {
    try {
      let tokens = await azureAuth.webAuth.authorize({
        scope: 'openid profile User.Read',
      });
      console.log('CRED>>>', tokens);
      setState({accessToken: tokens.accessToken});

      let info = await azureAuth.auth.msGraphRequest({
        token: tokens.accessToken,
        path: 'me',
      });

      console.log('info', info);
      setState({user: info.displayName, userId: tokens.userId});
    } catch (error) {
      console.log('Error during Azure operation', error);
    }
  };

  _onLogout = () => {
    azureAuth.webAuth
      .clearSession()
      .then(success => {
        console.log('LOGOUT SUCCESS', success);
        setState({accessToken: null, user: null});
      })
      .catch(error => console.log(error));
  };

  let loggedIn = state.accessToken ? true : false;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>Azure Auth - Login</Text>
        <Text style={styles.text}>Hello {state.user}</Text>
        <Text style={styles.text}>
          You are {loggedIn ? '' : 'not '}logged in.
        </Text>
      </View>
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 50}}>
        <TouchableOpacity
          onPress={_onLogin}
          style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            marginHorizontal: 20,
            width: '80%',
            elevation: 1,
          }}>
          <View
            style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('./src/assets/micro.png')}
              style={{height: 50, width: 50}}
              resizeMode="contain"
            />
          </View>
          <View style={{flex: 0.7, alignSelf: 'center'}}>
            <Text style={{fontSize: 17, color: 'black', fontWeight: 'bold'}}>
              Sign-in with Microsoft
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* <Button
          style={styles.button}
          onPress={loggedIn ? _onLogout : _onLogin}
          title={loggedIn ? 'Log Out' : 'Log In'}
        /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  text: {
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'baseline',
    padding: 20,
  },
  button: {
    flex: 1,
    padding: 20,
    margin: 20,
  },
  list: {
    flex: 5,
    margin: 20,
  },
});

export default App;
