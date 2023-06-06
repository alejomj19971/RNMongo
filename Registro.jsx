import { StyleSheet, Text, FlatList,SafeAreaView, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importar el metodo para generar el bottom tabs
import axios from 'axios'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from "react";
import { useState } from 'react';
import { useForm, Controller } from "react-hook-form";



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })

const Registrar= ({navigation})=> {

    const [alerta,setAlerta]=useState("");
    const [messages,setMessage]=useState("");
    const [isError,setError]=useState(false);
    const [idSearch,setIdSearch]=useState('');

    const onSave = async(data) => {
        //setLoading(true);
        if(data.password!=data.passwordRep){
            setAlerta("Las contraseñas no son iguales");
            return
        }

        try {
          const response = await axios.post(`http://172.38.0.66:3000/api/clientes`, {
           
            response.data.username,
            response.data.name,
            response.data.rol,
            response.data.palabraReservada,
            response.data.password,
        
               
          });
          setAlerta("Cliente agregado correctamente ...");
          setTimeout(() => {
            setAlerta('');
            reset();
          }, 2000);
        
          
        } catch (error) {
          console.log(error)
        }
        finally{
          //setLoading(false);
        }
      }
   
    const [errormessage, setErrorMessage] = useState('');
    const { control, handleSubmit, formState: { errors },reset} = useForm({
        defaultValues: {
        username: '',
        name: '',
        rol:'',
        palabraReservada:'',
        password:'',
        passwordRep:''
        }
    });
  

    return(

        <View style={styles.container}>
         <Text style={{color:'black',fontSize:25,fontWeight:'bold',textTransform:'capitalize'}}>Registrate</Text>
     
      <Text style={{color:'red',fontSize:12,fontWeight:'bold',textTransform:'uppercase'}}>{errormessage}</Text>

             {/*UserName */}
      <Controller
        control={control}
        rules={{
         required: true,
         pattern:/^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9]+$/g
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={{marginTop:10}}
            left={<TextInput.Icon icon="account" />}
          />
        )}
        name="username"
      />
      {errors.username?.type==='required' && <Text>Este Campo es Obligatorio</Text>}
      {errors.username?.type==='pattern' && <Text>Escribe un nombre de usuario solo con letras y numeros</Text>}



        {/*Palabra Reservada */}
        <Controller
        control={control}
        rules={{
         required: true,
         pattern:/^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9]+$/g
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Palabra Reservada"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={{marginTop:10}}
            left={<TextInput.Icon icon="account" />}
          />
        )}
        name="palabraReservada"
      />
      {errors.username?.type==='required' && <Text>Este Campo es Obligatorio</Text>}
      {errors.username?.type==='pattern' && <Text>Escriba una palabra reservada solo con letras y numeros</Text>}
  
  
  
        {/*Name */}
        <Controller
        control={control}
        rules={{
         required: true,
         pattern:/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={{marginTop:10}}
            left={<TextInput.Icon icon="nature-people" />}
          />
        )}
        name="name"
      />
      {errors.name?.type==='required' && <Text>Este Campo es Obligatorio</Text>}
      {errors.name?.type ==='pattern' && <Text>Escriba un Nombre solo con Letras y Espacios</Text>}



         {/*Rol */}
         <Controller
        control={control}
        rules={{
         required: true,
         pattern:/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={{marginTop:10}}
            left={<TextInput.Icon icon="nature-people" />}
          />
        )}
        name="rol"
      />
      {errors.name?.type==='required' && <Text>Este Campo es Obligatorio</Text>}
      {errors.name?.type ==='pattern' && <Text>Escriba un Rol solo con Letras y Espacios</Text>}
      
  
  
        {/*Password*/}
  
      <Controller
        control={control}
        rules={{
         maxLength: 100,
         required:true,
         pattern:/(?=.*\d)(?=.*[A-Za-zÁÉÍÓÚáéíóúñÑ])[A-Za-zÁÉÍÓÚáéíóúñÑ0-9]+/g
  
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={{marginTop:10}}
            secureTextEntry
            left={<TextInput.Icon icon="key" />}
         
          />
        )}
        name="password"
      />
      {errors.password?.type==="required" && <Text>Este Campo es Obligatorio</Text>}
      {errors.password?.type==="pattern" && <Text>El Password Debe contener  números y letras</Text>}
  
          
        {/* Repetir Password*/}
  
      <Controller
        control={control}
        rules={{
        maxLength: 100,
        required:true,
        pattern:/(?=.*\d)(?=.*[A-Za-zÁÉÍÓÚáéíóúñÑ])[A-Za-zÁÉÍÓÚáéíóúñÑ0-9]+/g
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Repite tu Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={{marginTop:10}}
            secureTextEntry
            left={<TextInput.Icon icon="key" />}
          />
        )}
        name="passwordRep"
      />
      {errors.passwordRep?.type==="required" && <Text>Este Campo es Obligatorio</Text>}
      {errors.passwordRep?.type==="pattern" && <Text>El Password debe contener  números y letras</Text>}
  
  
          {/* */}
  
      <Button buttonColor='orange' textColor='white' style={{marginTop:10,width:280,fontSize:15}}  mode="contained" title="Submit" icon='car-convertible' onPress={handleSubmit(onSave)}> Enviar </Button>
    </View>
    )
  }