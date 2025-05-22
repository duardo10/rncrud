import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserList from './views/UserList';
import UserForm from './views/UserForm';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserList">
        <Stack.Screen
          name="UserList"
          component={UserList}
          options={{ title: 'Lista de Usuários' }}
        />
        <Stack.Screen
          name="UserForm"
          component={UserForm}
          options={{ title: 'Formulário de Usuário' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
