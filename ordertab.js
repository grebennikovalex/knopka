import React from 'react'
import { TouchableOpacity, View, Text, Dimensions } from 'react-native'
import { globalStyles } from './globalstyle'

const screenColors = ['#33d9b2', '#dfe4ea', '#c7ecee']

const inactiveIcon = '#b2bec3'

let screenType =
        [{icon: '0', name: 'ЗАКАЗ', color: screenColors[0], iconColor: 'white'},
        {icon: '0', name: 'НАЧАЛЬНЫЙ', color: 'transparent', iconColor: inactiveIcon},
        {icon: '0', name: 'НАСТРОЙКИ', color: 'transparent', iconColor: inactiveIcon}]  


const OrderTab = ({ onPress, index, isActive }) => {
       
        screenType.map(screen => {
            screen.color = 'transparent'
            screen.iconColor = inactiveIcon
            
            })

            screenType[isActive].color = screenColors[isActive]
            screenType[isActive].iconColor = 'white'
        
    
    return ( 
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: Dimensions.get('window').height * 0.1, 
            width: Dimensions.get('window').width / 3, 
            backgroundColor: screenType[index].color
            }}
        >
          <Text style={[globalStyles.icon,
              { 
              color: screenType[index].iconColor, 
              fontSize: 30, 
              marginTop: 10}
              ]}>
          {screenType[index].icon}
          </Text>
          <Text style = {{
            color: screenType[index].iconColor,
            fontSize: 10,
            paddingTop: 5
          }}>
            {screenType[index].name}
          </Text>
          
        </View>
      </TouchableOpacity>
    )
  }

  export default OrderTab
  