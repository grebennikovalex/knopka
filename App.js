import React, { useState  } from 'react'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import WasteSelection from './wasteselection'
import Orderform from './orderform'
import Confirmation from './confirmation'


const Stack = createStackNavigator()


console.disableYellowBox = true

const getFonts = () => Font.loadAsync({
   'custom': require('./assets/fonts/MPLUSRounded1c-Black.ttf'),
   'knp': require('./assets/fonts/knp.ttf')
   });



export default function App()  {

  const[fontsLoaded, setFontsLoaded] = useState(false)
  

if(fontsLoaded){
    return (
      
      <NavigationContainer>
      <Stack.Navigator 
        initialRouteName = 'WasteSelection' 
        headerMode = 'none'
        >
          <Stack.Screen name = 'WasteSelection'  component = {WasteSelection} />
          <Stack.Screen name = 'Orderform'  component = {Orderform} />
          <Stack.Screen name = 'Confirmation'  component = {Confirmation} />
      </Stack.Navigator>
      </NavigationContainer>
      
    )

  } else {
    return (
    <AppLoading 
    startAsync = {getFonts}
    onFinish = {() => setFontsLoaded(true)}
    />
    )
  }

}
