import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo'; 
import Navigator from './homestack';


const getFonts = () => Font.loadAsync({
   'custom': require('./assets/fonts/MPLUSRounded1c-Black.ttf'),
   'knp': require('./assets/fonts/knp.ttf')
   });



export default function App()  {

  const[fontsLoaded, setFontsLoaded] = useState(false);
  
  

if(fontsLoaded){
    return (
      <Navigator/>
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
