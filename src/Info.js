import {View, Text, Button} from 'react-native';
import React from 'react';
import AzureAuth from 'react-native-azure-auth';
import {useNavigation} from '@react-navigation/native';
const Info = props => {
  console.log(props.route.params.userData);

  const navigation = useNavigation();

  const CLIENT_ID = 'f650c9cf-3b94-4368-b7f7-4de7d8fb0c6d'; // replace the string with YOUR client ID

  const azureAuth = new AzureAuth({
    clientId: CLIENT_ID,
  });

  _onLogout = () => {
    azureAuth.webAuth
      .clearSession()
      .then(success => {
        navigation.navigate('Home');
      })
      .catch(error => console.log(error));
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 18}}>
        Hi{' '}
        <Text style={{fontSize: 12, color: 'blue', fontWeight: 'bold'}}>
          {props?.route?.params?.userData?.displayName ?? null}
        </Text>
      </Text>
      <Text style={{marginBottom: 50}}>
        {props?.route?.params?.userData?.mail ?? null}
      </Text>
      <Button title="Logout" onPress={_onLogout} />
    </View>
  );
};

export default Info;
