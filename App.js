import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import Login from './src/pages/login';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  GoogleSignin.configure({
    webClientId: '368636805346-1hnchau5rpfhf80lfh72vosrfm24dnn6.apps.googleusercontent.com', //mudar
  });

  
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  async function signOut() {
    await auth().signOut()
    .then(async() => {
      await GoogleSignin.signOut()
      .then(() => setUser(null));
    })
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return <Login />;
  }

  return (
    <View style={{flex: 1, justifyContent: "center", paddingTop: 48, backgroundColor: "black"}}>
      <Text style={{fontSize:30, color: '#e1e1se1'}}>Welcome {user.email}</Text>
      <Button title='Sair' onPress={signOut }/>
    </View>
  );
}

export default App;