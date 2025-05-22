import React from 'react';
import { View, FlatList, Alert, StyleSheet, StatusBar } from 'react-native';
import { ListItem, Avatar, Button, Icon, Header, Text } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

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
    Alert.alert(
      'Excluir Usuário', 
      `Tem certeza que deseja excluir ${user.name}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress() {
            console.warn('Usuário excluído!');
          },
        },
      ],
      { cancelable: true }
    );
  }

  function getUserItem({ item: user }) {
    return (
      <View style={styles.listItemContainer}>
        <ListItem containerStyle={styles.listItem}>
          <Avatar 
            source={{ uri: user.avatarUrl }} 
            size="medium"
            rounded
            avatarStyle={styles.avatar}
          />
          <ListItem.Content style={styles.listContent}>
            <ListItem.Title style={styles.userName}>{user.name}</ListItem.Title>
            <ListItem.Subtitle style={styles.userEmail}>{user.email}</ListItem.Subtitle>
          </ListItem.Content>
          
          <View style={styles.actionButtons}>
            <Button
              onPress={() => navigation.navigate('UserForm', user)}
              buttonStyle={[styles.actionButton, styles.editButton]}
              icon={<MaterialIcon name="edit" size={18} color="#f59e0b" />}
            />
            <Button
              onPress={() => confirmUserDeletion(user)}
              buttonStyle={[styles.actionButton, styles.deleteButton]}
              icon={<MaterialIcon name="delete" size={18} color="#ef4444" />}
            />
          </View>
        </ListItem>
      </View>
    );
  }

  function renderEmptyList() {
    return (
      <View style={styles.emptyContainer}>
        <MaterialIcon name="people-outline" size={64} color="#d1d5db" />
        <Text style={styles.emptyText}>Nenhum usuário cadastrado</Text>
        <Text style={styles.emptySubtext}>Toque no botão abaixo para adicionar o primeiro usuário</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <Header
        centerComponent={{ 
          text: 'Lista de Usuários', 
          style: { color: '#fff', fontSize: 18, fontWeight: '600' }
        }}
        rightComponent={{
          icon: 'person-add',
          color: '#fff',
          onPress: () => navigation.navigate('UserForm')
        }}
        backgroundColor="#6366f1"
        statusBarProps={{ barStyle: 'light-content' }}
      />

      <View style={styles.content}>
        <FlatList
          keyExtractor={(user) => user.id.toString()}
          data={users}
          renderItem={getUserItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={users.length === 0 ? styles.emptyListContainer : styles.listContainer}
          ListEmptyComponent={renderEmptyList}
        />
        
        <View style={styles.fab}>
          <Button
            title="Novo Usuário"
            onPress={() => navigation.navigate('UserForm')}
            buttonStyle={styles.fabButton}
            titleStyle={styles.fabText}
            icon={<MaterialIcon name="add" size={20} color="#fff" style={{ marginRight: 8 }} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  listItemContainer: {
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  listItem: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  avatar: {
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  listContent: {
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#6b7280',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#fef3c7',
  },
  deleteButton: {
    backgroundColor: '#fee2e2',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  fabButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    paddingVertical: 15,
    shadowColor: '#6366f1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  fabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 20,
  },
});