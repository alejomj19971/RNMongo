import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import React, { useState,useEffect } from'react';
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity, TextInput } from 'react-native';

import { Button } from 'react-native-paper';
import {styles} from '../styles/Styles';

import axios from 'axios'

export default function CustomerList() {
  //Variables de Estado
  const [data, setData] = useState([]);

  //Metodos
  const getCustomers = async () => {
   const url=`http://127.0.0.1:3000/api/clientes`;
   const response = await axios.get(url);
   setData(response.data);
  
  }

  /*useEffect(() => {
      getCustomers();
    });*/

  return (
    <View style={styles.container}>
        <Button icon='view-list' textColor='white' buttonColor='orange' onPress={getCustomers}>Mostrar Clientes</Button>
       <Text style={{padding:10,borderRadius:10,backgroundColor:'powderblue',marginBottom:10,marginTop:10}}> Clientes </Text>
       
         <FlatList
          data={data}
          //keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => {
          return(
          <TouchableOpacity style={{padding:10,borderRadius:10,backgroundColor:'powderblue',marginBottom:10}}> 
         
              <Text>{item._id} - {item.nombre} - {item.apellidos}</Text>

            </TouchableOpacity>
             )
          }
        }
        />
 
    </View>
  );
}

