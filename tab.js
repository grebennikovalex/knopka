import React from 'react'
import { TouchableOpacity, View, Text, Dimensions } from 'react-native'
//import { Animated } from 'react-native-reanimated'

let wasteType =
[{icon: '1', name: 'СТЕКЛО', color: '#63cdda', iconColor: 'white'},
{icon: '3', name: 'ПЛАСТИК', color: 'transparent', iconColor: '#b2bec3'},
{icon: '2', name: 'БУМАГА', color: 'transparent', iconColor: '#b2bec3'}]

const wasteColors = ['#63cdda', '#f8a5c2', '#f7d794']
const inactiveIcon = '#b2bec3'

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
            height: Dimensions.get('window').width / 3, 
            width: Dimensions.get('window').width / 3, 
            backgroundColor: wasteType[index].color,
                         
            }}
        >
          <Text style={{fontFamily: 'knp', color: wasteType[index].iconColor, fontSize: 60, marginTop: 20}}>
          {wasteType[index].icon}
          </Text>
          <Text style={{fontFamily: 'custom', color: wasteType[index].iconColor, fontSize: 18, marginTop: 10}}>
              {wasteType[index].name}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  export default Tab
  