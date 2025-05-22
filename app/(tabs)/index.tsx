import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { Avatar, Button, Icon, Input, ListItem } from 'react-native-elements';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Defina o tipo do usuário
type User = {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
};

export default function HomeScreen() {
  const [users, setUsers] = useState<User[]>([
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
  ]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState<Omit<User, 'id'>>({ name: '', email: '', avatarUrl: '' });

  function handleEdit(user: User) {
    setEditingUser(user);
    setForm({
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
    });
  }

  function handleDelete(user: User) {
    Alert.alert('Excluir Usuário', `Deseja excluir ${user.name}?`, [
      {
        text: 'Sim',
        onPress() {
          setUsers(users.filter(u => u.id !== user.id));
        },
      },
      { text: 'Não' },
    ]);
  }

  function handleSave() {
    if (!form.name || !form.email) {
      Alert.alert('Preencha todos os campos obrigatórios!');
      return;
    }
    if (editingUser) {
      setUsers(users.map(u => (u.id === editingUser.id ? { ...editingUser, ...form } : u)));
    } else {
      setUsers([
        ...users,
        {
          id: Math.max(0, ...users.map(u => u.id)) + 1,
          ...form,
        },
      ]);
    }
    setEditingUser(null);
    setForm({ name: '', email: '', avatarUrl: '' });
  }

  function handleCancel() {
    setEditingUser(null);
    setForm({ name: '', email: '', avatarUrl: '' });
  }

  function renderUserItem({ item: user }: { item: User }) {
    return (
      <ListItem key={user.id} bottomDivider>
        <Avatar source={{ uri: user.avatarUrl }} />
        <ListItem.Content>
          <ListItem.Title>{user.name}</ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
        </ListItem.Content>
        <Button
          type="clear"
          icon={<Icon name="edit" size={25} color="orange" />}
          onPress={() => handleEdit(user)}
        />
        <Button
          type="clear"
          icon={<Icon name="delete" size={25} color="red" />}
          onPress={() => handleDelete(user)}
        />
      </ListItem>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={{ marginBottom: 16 }}>
        Lista de Usuários
      </ThemedText>
      <FlatList
        keyExtractor={user => user.id.toString()}
        data={users}
        renderItem={renderUserItem}
        style={{ marginBottom: 16 }}
      />
      <ThemedText type="subtitle" style={{ marginBottom: 8 }}>
        {editingUser ? 'Editar Usuário' : 'Adicionar Usuário'}
      </ThemedText>
      <View style={styles.form}>
        <Input
          placeholder="Nome"
          value={form.name}
          onChangeText={name => setForm(f => ({ ...f, name }))}
        />
        <Input
          placeholder="E-mail"
          value={form.email}
          onChangeText={email => setForm(f => ({ ...f, email }))}
        />
        <Input
          placeholder="URL do Avatar"
          value={form.avatarUrl}
          onChangeText={avatarUrl => setForm(f => ({ ...f, avatarUrl }))}
        />
        <Button
          title={editingUser ? 'Salvar Alterações' : 'Adicionar'}
          onPress={handleSave}
          containerStyle={{ marginBottom: 8 }}
        />
        {editingUser && (
          <Button
            title="Cancelar"
            type="outline"
            onPress={handleCancel}
            containerStyle={{ marginBottom: 8 }}
          />
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  form: {
    marginTop: 8,
  },
});