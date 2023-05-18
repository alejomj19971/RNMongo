
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Hometabs from './assets/components/HomeTabs';

const Stack = createNativeStackNavigator();
export default function App() {


  return (
   
    <NavigationContainer> 
       <Stack.Navigator>
        <Stack.Screen name="HomeTabs" title="Sistema de Inventario" component={Hometabs} />
       
      </Stack.Navigator>
    </NavigationContainer>
  )
}


