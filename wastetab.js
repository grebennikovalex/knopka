import React from 'react'
import { TouchableOpacity, View, Text, Dimensions } from 'react-native'
import { globalStyles } from './globalstyle'

export const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

export const wasteColors = ['#33d9b2', '#ffb142', '#45aaf2', '#dfe4ea', '#c7ecee']

const inactiveIcon = '#b2bec3'

let wasteType =
        [{icon: '1', name: 'СТЕКЛОБОЙ', color: wasteColors[0], iconColor: 'white'},
        {icon: '3', name: 'ПЛАСТИК', color: 'transparent', iconColor: inactiveIcon},
        {icon: '2', name: 'МАКУЛАТУРА', color: 'transparent', iconColor: inactiveIcon},
        {icon: '4', name: 'ЗАКАЗЫ', color: 'transparent', iconColor: inactiveIcon},
        {icon: '0', name: 'НАСТРОЙКИ', color: 'transparent', iconColor: inactiveIcon}]  

export const glassType =
        [{ id: '0', type: 'ЗЕЛЕНЫЙ ТАРНЫЙ', price: '1 500 руб. / тонна' },
        { id: '1', type: 'БЕЛЫЙ ТАРНЫЙ', price: '1 500 руб. / тонна' },
        { id: '2', type: 'КОРИЧНЕВЫЙ ТАРНЫЙ', price: '1 500 руб. / тонна' },
        { id: '3', type: 'ЛИСТОВОЙ', price: '1 500 руб. / тонна' }]

export const plasticType =        
        [{ id: '4', type: 'ПЭТ БУТЫЛКИ', price: '7 руб. / кг.' },
        { id: '5', type: 'ПНД КАНИСТРЫ', price: '8 руб. / кг.' },
        { id: '6', type: 'ПНД ФЛАКОНЫ', price: '8 руб. / кг.' },
        { id: '7', type: 'ПЛЕНКА ПВД', price: '7 руб. / кг.' },
        { id: '8', type: 'ПЛЕНКА ПНД', price: '7 руб. / кг.' },
        { id: '9', type: 'ПЛЕНКА СТРЕЙЧ', price: '7 руб. / кг.' }]

export const paperType =
        [{ id: '10', type: 'КАРТОН', price: '4 руб. / кг.' },
        { id: '11', type: 'БУМАГА', price: '4 руб. / кг.' },
        { id: '12', type: 'КНИГИ', price: '4 руб. / кг.' },
        { id: '13', type: 'ГАЗЕТЫ / ЖУРНАЛЫ', price: '4 руб. / кг.' }]  


const WasteTab = ({ onPress, index, isActive }) => {
       
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
            height: Dimensions.get('window').height * 0.1, 
            width: Dimensions.get('window').width / 5, 
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
          <Text style = {{
            color: wasteType[index].iconColor,
            fontSize: 10,
            paddingTop: 5
          }}>
            {wasteType[index].name}
          </Text>
          
        </View>
      </TouchableOpacity>
    )
  }

  export default WasteTab
  