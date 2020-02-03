import React from 'react'
import { TouchableOpacity, View, Text, Dimensions } from 'react-native'
import { globalStyles } from './globalstyle'


export const wasteColors = ['#82ccdd', '#bad2ff', '#fad390', '#dfe4ea']

const inactiveIcon = '#b2bec3'


let wasteType =
[{icon: '1', name: 'СТЕКЛО', color: wasteColors[0], iconColor: 'white'},
{icon: '3', name: 'ПЛАСТИК', color: 'transparent', iconColor: inactiveIcon},
{icon: '2', name: 'БУМАГА', color: 'transparent', iconColor: inactiveIcon},
{icon: '4', name: 'ЗАКАЗЫ', color: 'transparent', iconColor: inactiveIcon}]


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
            height: Dimensions.get('window').width / 4 * 0.7, 
            width: Dimensions.get('window').width / 4, 
            backgroundColor: wasteType[index].color
            }}
        >
          <Text style={[globalStyles.icon,
              { 
              color: wasteType[index].iconColor, 
              fontSize: 30, 
              marginTop: 10}
              ]}>
          {wasteType[index].icon}
          </Text>
          
        </View>
      </TouchableOpacity>
    )
  }

  export default Tab
  