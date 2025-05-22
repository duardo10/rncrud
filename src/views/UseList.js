import React from 'react';
import { View, FlatList, Alert } from 'react-native';
import { ListItem, Avatar, Button, Icon } from 'react-native-elements';

const users = [
  {
    id: 1,
    name: 'Maria Silva',
    email: 'maria@email.com',
    avatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: 2,
    name: 'João Santos',
    email: 'joao@email.com',
    avatarUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
];

export default function UserList({ navigation }) {
  function confirmUserDeletion(user) {
    Alert.alert('Excluir Usuário', `Deseja excluir ${user.name}?`, [
      {
        text: 'Sim',
        onPress() {
          console.warn('Excluído!');
        },
      },
      {
        text: 'Não',
      },
    ]);
  }

  function getUserItem({ item: user }) {
    return (
      <ListItem bottomDivider>
        <Avatar source={{ uri: user.avatarUrl }} />
        <ListItem.Content>
          <ListItem.Title>{user.name}</ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
        </ListItem.Content>
        <Button
          type="clear"
          icon={<Icon name="edit" size={25} color="orange" />}
          onPress={() => navigation.navigate('UserForm', user)}
        />
        <Button
          type="clear"
          icon={<Icon name="delete" size={25} color="red" />}
          onPress={() => confirmUserDeletion(user)}
        />
      </ListItem>
    );
  }

  return (
    <View>
      <FlatList
        keyExtractor={(user) => user.id.toString()}
        data={users}
        renderItem={getUserItem}
      />
      <Button
        title="Adicionar Usuário"
        onPress={() => navigation.navigate('UserForm')}
        containerStyle={{ margin: 10 }}
      />
    </View>
  );
}
