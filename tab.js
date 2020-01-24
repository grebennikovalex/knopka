import React from 'react'
import { TouchableOpacity, View, Text, Dimensions } from 'react-native'
import { globalStyles } from './globalstyle'
//import { LinearGradient } from 'expo-linear-gradient'
//import { Animated } from 'react-native-reanimated'

export const wasteColors = ['#82ccdd', '#b8e994', '#fad390']
const inactiveIcon = '#b2bec3'


let wasteType =
[{icon: '1', name: 'СТЕКЛО', color: wasteColors[0], iconColor: 'white'},
{icon: '3', name: 'ПЛАСТИК', color: 'transparent', iconColor: inactiveIcon},
{icon: '2', name: 'БУМАГА', color: 'transparent', iconColor: inactiveIcon}]


const Tab = ({ onPress, index, isActive }) => {
       
        wasteType.map(waste => {
             waste.color = 'transparent'
             waste.iconColor = inactiveIcon
            
            })

        wasteType[isActive].color = wasteColors[isActive]
        wasteType[isActive].iconColor = 'white'
        
    
    return ( 
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: Dimensions.get('window').width / 3 * 0.6, 
            width: Dimensions.get('window').width / 3, 
            backgroundColor: wasteType[index].color,
            }}
        >
          <Text style={[globalStyles.icon,
              { 
              color: wasteType[index].iconColor, 
              fontSize: 40, 
              marginTop: 10}
              ]}>
          {wasteType[index].icon}
          </Text>
          <Text style={[globalStyles.text, 
              {
              color: wasteType[index].iconColor, 
              fontSize: 18, 
              marginTop: 5}
              ]}>
              {wasteType[index].name}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  export default Tab
  