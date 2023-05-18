
import { Button } from 'react-native-paper';
import {styles} from '../styles/styles';
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity,StyleSheet } from 'react-native';
import axios from 'axios'
import CustomerList from './assets/components/CustomerList';
import { useForm, Controller } from "react-hook-form";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Button,TextInput} from 'react-native-paper'
import { useState } from 'react';





export default function CustomerScreen() {

    const [alerta,setAlerta]=useForm();
    const [idSearch,setIdSearch]=useState('');

  const { control, handleSubmit, formState: { errors },reset } = useForm({
    defaultValues: {
      firstName: '',
      lastName: ''
    }
  });
  const onSave = async(data) => {
    //setLoading(true);
    const {firstname,lastname}=data
    let apellidos=lastname
    let nombres=firstname
    try {
      const response = await axios.post(`http://172.38.0.66:3000/api/clientes`, {
       
            nombres,
            apellidos
           
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

  const onSearch= async(idSearch)=>{
        try {
            const response = await axios.get(`http://172.38.0.66:3000/api/clientes/${idSearch}`);
            console.log(response.data);
            setIdSearch(response.data.id);
            setAlerta(response.data.nombres+" "+response.data.apellidos);
        }
        catch (error) {
                    console.log(error)
                }
  }

  return (
    <View style={styles.container}>
        <Text style={{fontWeight:'bold',fontSize:25,textAlign:'center',marginBottom:20}}>Actualización de Clientes</Text>

     <Text style={{color:'green',fontSize:20,}}>{alerta}</Text>
     
     <TextInput
     label="Id del Cliente a Buscar"
     mode='outlined'
     style={{}}
     onChangeText={(idSearch) => setIdSearch(idSearch)}
     />
      <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Nombre"
            mode="outlined"
            placeholder="First name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="firstName"
      />
      {errors.firstName && <Text>El Nombre es Obligatorio</Text>}

      <Controller
        control={control}
        rules={{
        required: true,
         maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Apellidos"
            mode="outlined"
            placeholder="Apellidos"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="lastName"
      />
      {errors.lastName && <Text>Los Apellidos son obligatorios</Text>}
      <View style={{flexDirection:'row',marginTop:20}}>

      <Button icon='plus' mode='contained' buttonColor='purple' textColor='white' title="Submit" onPress={handleSubmit(onSubmit)} > Aqui esta el botón </Button>

      
      <Button icon='account-search' buttonColor='purple' textColor='white' title="Submit" onPress={handleSubmit(onSubmit)} > Aqui esta el botón </Button>
      </View>


      <View style={{flexDirection:'row',marginTop:20}}>

        <Button  icon='account-search' buttonColor='purple' textColor='white' title="Submit" onPress={()=>{onSearch(idSearch)}} > Buscar </Button>


        <Button icon='account-search' buttonColor='purple' textColor='white' title="Submit" onPress={handleSubmit(onSave)} > Agregar  </Button>
    </View>


    </View>

  
  );
}


