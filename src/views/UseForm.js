import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { Input, Button, Header } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function UserForm({ route, navigation }) {
  const user = route.params || {};
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || '');

  const isEditing = !!user.id;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <Header
        centerComponent={{ 
          text: isEditing ? 'Editar Usuário' : 'Novo Usuário', 
          style: { color: '#fff', fontSize: 18, fontWeight: '600' }
        }}
        leftComponent={{
          icon: 'arrow-back',
          color: '#fff',
          onPress: () => navigation.goBack()
        }}
        backgroundColor="#6366f1"
        statusBarProps={{ barStyle: 'light-content' }}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <Input
            placeholder="Nome completo"
            value={name}
            onChangeText={setName}
            leftIcon={<Icon name="person" size={20} color="#6b7280" />}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.input}
            placeholderTextColor="#9ca3af"
            autoCapitalize="words"
          />
          
          <Input
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            leftIcon={<Icon name="email" size={20} color="#6b7280" />}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.input}
            placeholderTextColor="#9ca3af"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <Input
            placeholder="URL do Avatar"
            value={avatarUrl}
            onChangeText={setAvatarUrl}
            leftIcon={<Icon name="image" size={20} color="#6b7280" />}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.input}
            placeholderTextColor="#9ca3af"
            autoCapitalize="none"
          />

          <View style={styles.buttonContainer}>
            <Button
              title={isEditing ? "Salvar Alterações" : "Criar Usuário"}
              onPress={() => {
                console.warn('Usuário salvo!');
                navigation.goBack();
              }}
              buttonStyle={styles.saveButton}
              titleStyle={styles.saveButtonText}
              icon={<Icon name="save" size={20} color="#fff" style={{ marginRight: 8 }} />}
            />
            
            <Button
              title="Cancelar"
              onPress={() => navigation.goBack()}
              buttonStyle={styles.cancelButton}
              titleStyle={styles.cancelButtonText}
              type="outline"
            />
          </View>
        </View>
      </ScrollView>
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
  form: {
    padding: 20,
    paddingTop: 30,
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    fontSize: 16,
    color: '#374151',
    paddingLeft: 10,
  },
  buttonContainer: {
    marginTop: 30,
    gap: 15,
  },
  saveButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    paddingVertical: 15,
    shadowColor: '#6366f1',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingVertical: 15,
    backgroundColor: 'transparent',
  },
  cancelButtonText: {
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '500',
  },
});