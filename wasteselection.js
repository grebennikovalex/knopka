import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import WasteBar from './wastebar'
import Glass from './glass'
import Plastic from './plastic'
import Paper from './paper'
import History from './history'
import Settings from './settings'



const Tab = createMaterialTopTabNavigator()

function WasteSelection() {
  

    return (
      
      <Tab.Navigator
      initialRouteName = 'Paper' 
      tabBarPosition = 'bottom'
      
      tabBar = {props => <WasteBar {...props} />}

      >
        <Tab.Screen name = 'Glass' component = {Glass} />
        <Tab.Screen name = 'Plastic' component = {Plastic} />
        <Tab.Screen name = 'Paper' component = {Paper} />
        <Tab.Screen name = 'History' component = {History} />
        <Tab.Screen name = 'Settings' component = {Settings} />
      </Tab.Navigator>
      
    )
  }

export default WasteSelection
