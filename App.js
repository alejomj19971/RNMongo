
import { Button } from 'react-native-paper';
import {styles} from './assets/styles/Styles'
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity, TextInput,StyleSheet } from 'react-native';
import axios from 'axios'
import CustomerList from './assets/components/CustomerList';
import { useForm, Controller } from "react-hook-form";
import {MaterialCommunityIcons} from '@expo/vector-icons';

export default function App() {

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: ''
    }
  });
  const onSubmit = data => console.log(data);
  



  return (
    <View style={styles.container}>

     <Text>Inicio</Text>
     
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
      {errors.firstName && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
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
      {errors.lastName && <Text>This is required.</Text>}

      <Button icon='account-search' buttonColor='purple' textColor='white' title="Submit" onPress={handleSubmit(onSubmit)} > Aqui esta el botón </Button>

      
      <Button icon='account-search' buttonColor='purple' textColor='white' title="Submit" onPress={handleSubmit(onSubmit)} > Aqui esta el botón </Button>

    </View>

  
  );
}


