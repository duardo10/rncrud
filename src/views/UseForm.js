import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';

export default function UserForm({ route, navigation }) {
  const user = route.params || {};
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || '');

  return (
    <View style={{ padding: 15 }}>
      <Input
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <Input
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        placeholder="URL do Avatar"
        value={avatarUrl}
        onChangeText={setAvatarUrl}
      />
      <Button
        title="Salvar"
        onPress={() => {
          console.warn('Usuário salvo!');
          navigation.goBack();
        }}
      />
    </View>
  );
}
