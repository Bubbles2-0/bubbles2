import React, { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'user' && password === 'pass') {
      navigation.navigate('Map');
    }
  };

  return (
    <>
      <TextInput label="Username" value={username} onChangeText={setUsername} />
      <TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button onPress={handleLogin}>Login</Button>
    </>
  );
};

export default LoginScreen;
