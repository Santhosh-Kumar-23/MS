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
  ActivityIndicator,
} from 'react-native';
import AzureAuth from 'react-native-azure-auth';
import {useNavigation} from '@react-navigation/native';

const CLIENT_ID = 'f650c9cf-3b94-4368-b7f7-4de7d8fb0c6d'; // replace the string with YOUR client ID

const azureAuth = new AzureAuth({
  clientId: CLIENT_ID,
});

const Home = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  _onLogin = async () => {
    setLoading(true);
    try {
      let tokens = await azureAuth.webAuth.authorize({
        scope: 'openid profile User.Read',
      });
      console.log('CRED>>>', tokens);

      let info = await azureAuth.auth.msGraphRequest({
        token: tokens.accessToken,
        path: 'me',
      });

      console.log('info', info);
      navigation.navigate('Info', {userData: info});
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Error during Azure operation', error);
    }
  };

  return (
    <View style={styles.container}>
      {!loading ? (
        <View>
          <View>
            <Text style={styles.header}>Microsoft - Login</Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
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
                style={{
                  flex: 0.3,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('./assets/micro.png')}
                  style={{height: 50, width: 50}}
                  resizeMode="contain"
                />
              </View>
              <View style={{flex: 0.7, alignSelf: 'center'}}>
                <Text
                  style={{fontSize: 17, color: 'black', fontWeight: 'bold'}}>
                  Sign-in with Microsoft
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={{marginTop: 10}}>PLEASE WAIT.......</Text>
        </View>
      )}
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

export default Home;
