import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function Login() {

async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}
    return (
        <View style={{flex: 1, justifyContent: "center", paddingTop: 48, backgroundColor: "black"}}>
       <Text style={{fontSize:30, color: '#e1e1e1'}}> Página de Login</Text>
       <Button title="Entrar com o google" onPress={onGoogleButtonPress} />

        </View>


    )
}