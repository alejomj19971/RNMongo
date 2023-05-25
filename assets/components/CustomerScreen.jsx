
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity,StyleSheet } from 'react-native';
import axios from 'axios'
import CustomerList from './CustomerList';
import { useForm, Controller } from "react-hook-form";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Button,TextInput} from 'react-native-paper'
import { useState } from 'react';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default function CustomerScreen() {

    

    const [alerta,setAlerta]=useState("");
    const [messages,setMessage]=useState("");
    const [isError,setError]=useState(false);
    const [idSearch,setIdSearch]=useState('');

  const { control, handleSubmit, formState: { errors },reset,setValue } = useForm({
    defaultValues: {
      firstName: '',
      lastName: ''
    }
  });
  const onSave = async(data) => {
    //setLoading(true);
    const {firstName,lastName}=data
    let apellidos=lastName
    let nombre=firstName
    try {
      const response = await axios.post(`http://172.38.0.66:3000/api/clientes`, {
            nombre,
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


  const onUpdate = async(data) => {
    console.log(idSearch)
    try {
      const response = await axios.put(`http://127.0.0.1:3000/api/clientes/${idSearch}`, {
            nombre:data.firstName,
            apellidos:data.lastName
           
      });
      setAlerta("Cliente Actualizado correctamente ...");
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

  const onSearch= async()=>{
        try {
            const response = await axios.get(`http://172.38.0.66:3000/api/clientes/${idSearch}`);
            
            if(!response.data.error){
            //setIdSearch(response.data.id);
            setAlerta(response.data.nombre+" "+response.data.apellidos);
            setValue('firstName', response.data.nombre),
            setValue('lastName', response.data.apellidos);
            setError(false);
            setMessage("");
          }

          else{
            setError(true);
            setMessage("El id del client no existe intentelo con otro");

            setTimeout(() => {

              setMessage('');

            }, 3000);
            reset();
            //setIdSearch('');
          }
        }
      
        catch (error) {
                    console.log(error)
                }
  }


  const onDelete = async(data) => {

    if(confirm(`Esta seguro de eliminar el cliente : ${data.firstName} ${data.lastName}`)){
        const response = await axios.delete(`http://172.38.0.66:3000/api/clientes/${idSearch}`);
        setError(false);
        setMessage("Cliente Eliminado correctamente...");

                setTimeout(() => {
                  setMessage('');
                  reset();
                
        }, 3000);
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
     value={idSearch}
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
      <Text style={{color:'white',backgroundColor:isError ?'red':'green'}}>{messages}</Text>
      <View style={{flexDirection:'row',marginTop:20}}>

      <Button icon='plus' mode='contained' buttonColor='purple' textColor='white' title="Submit" onPress={handleSubmit(onDelete)} > Eliminar </Button>

      
      <Button icon='account-search' buttonColor='purple' textColor='white' title="Submit" onPress={handleSubmit(onUpdate)} > Actualizar Registro </Button>
      </View>


      <View style={{flexDirection:'row',marginTop:20}}>

        <Button  icon='account-search' buttonColor='purple' textColor='white' title="Submit" onPress={()=>{onSearch(idSearch)}} > Buscar </Button>


        <Button icon='account-search' buttonColor='purple' textColor='white' title="Submit" onPress={handleSubmit(onDelete)} > Agregar  </Button>
    </View>


    </View>

  
  );
}

