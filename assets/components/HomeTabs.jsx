
import { Button } from 'react-native-paper';

import { ActivityIndicator, FlatList, Text, View, TouchableOpacity, TextInput,StyleSheet } from 'react-native';
import axios from 'axios'

import { useForm, Controller } from "react-hook-form";
import {MaterialCommunityIcons} from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomerScreen from './CustomerScreen';
import CustomerList from './CustomerList';
import {MaterialIcons} from'react-native-vector-icons';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Hometabs() {

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: ''
    }
  });
  const onSubmit = data => console.log(data);
  



  return (
    <Tab.Navigator
        screenOptions={{
            headerShown:false,
            tabBarActiveBackgroundColor:'orange',
            tabBarActiveTintColor:'black'

        }}
    >
      <Tab.Screen name="Customer" component={CustomerScreen} options={{
        
        tabBarIcon:({color,size})=>(
            <MaterialIcons name="account-circle" color='red' size={25}/>
        )
        
        
        }} />
      <Tab.Screen name="List" component={CustomerList} 
      
      options={{
        title:" Listar Clientes",
        tabBarIcon:({color,size})=>(
            <MaterialIcons name="account-circle" color='red' size={25} />
        )
        
        
        }} />
      
      
    </Tab.Navigator>

  
  );
}


