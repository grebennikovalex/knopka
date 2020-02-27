import React from 'react'
import { TouchableOpacity, View, Text, Dimensions } from 'react-native'
import { globalStyles } from './globalstyle'

export const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

export const wasteColors = ['#33d9b2', '#ffb142', '#45aaf2', '#a5b1c2', 'white']

const inactiveIcon = '#b2bec3'

let wasteType =
        [{icon: '1', name: 'СТЕКЛОБОЙ', color: wasteColors[0], iconColor: 'white', ears: true},
        {icon: '3', name: 'ПЛАСТИК', color: 'transparent', iconColor: inactiveIcon, ears: false},
        {icon: '2', name: 'МАКУЛАТУРА', color: 'transparent', iconColor: inactiveIcon, ears: false},
        {icon: '5', name: 'ЗАКАЗЫ', color: 'transparent', iconColor: inactiveIcon, ears: false},
        {icon: '4', name: 'О ПРОЕКТЕ', color: 'transparent', iconColor: inactiveIcon, ears: false}]  

// export const glassType =
//         [{ id: '0', type: 'ЗЕЛЕНЫЙ ТАРНЫЙ', price: '1 500 руб. / тонна' },
//         { id: '1', type: 'БЕЛЫЙ ТАРНЫЙ', price: '1 500 руб. / тонна' },
//         { id: '2', type: 'КОРИЧНЕВЫЙ ТАРНЫЙ', price: '1 500 руб. / тонна' },
//         { id: '3', type: 'ЛИСТОВОЙ', price: '1 500 руб. / тонна' }]

// export const plasticType =        
//         [{ id: '4', type: 'ПЭТ БУТЫЛКИ', price: '7 руб. / кг.' },
//         { id: '5', type: 'ПНД КАНИСТРЫ', price: '8 руб. / кг.' },
//         { id: '6', type: 'ПНД ФЛАКОНЫ', price: '8 руб. / кг.' },
//         { id: '7', type: 'ПЛЕНКА ПВД', price: '7 руб. / кг.' },
//         { id: '8', type: 'ПЛЕНКА ПНД', price: '7 руб. / кг.' },
//         { id: '9', type: 'ПЛЕНКА СТРЕЙЧ', price: '7 руб. / кг.' }]

// export const paperType =
//         [{ id: '10', type: 'КАРТОН', price: '4 руб. / кг.' },
//         { id: '11', type: 'БУМАГА', price: '4 руб. / кг.' },
//         { id: '12', type: 'КНИГИ', price: '4 руб. / кг.' },
//         { id: '13', type: 'ГАЗЕТЫ / ЖУРНАЛЫ', price: '4 руб. / кг.' }]  


const WasteTab = ({ onPress, index, isActive }) => {
       
        wasteType.map(waste => {
             waste.color = 'transparent'
             waste.iconColor = inactiveIcon
             waste.ears = false
            
            })
        
        if(isActive === 4) {
          wasteType[isActive].iconColor = '#778ca3'
        } else {
          wasteType[isActive].iconColor = 'white'
        }

        wasteType[isActive].color = wasteColors[isActive]
        wasteType[isActive].ears = true
      
    
    return ( 
      
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: Dimensions.get('screen').height * 0.1, 
            width: Dimensions.get('screen').width / 5, 
            backgroundColor: wasteType[index].color,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10
            }}
        >
          {wasteType[index].ears ?
          <View style = {{
                position: 'absolute',
                left: -20,
                top: 0, 
                width: 20, 
                height: 20, 
                backgroundColor: wasteType[index].color
                }}></View> : null }

          {wasteType[index].ears ?
          <View style = {{
                position: 'absolute',
                left: -20,
                top: 0, 
                width: 20, 
                height: 20, 
                borderTopRightRadius: 20, 
                backgroundColor: '#636e72'
                }}></View> : null }

          {wasteType[index].ears ?
          <View style = {{
                position: 'absolute',
                right: -20,
                top: 0, 
                width: 20, 
                height: 20, 
                backgroundColor: wasteType[index].color
                }}></View> : null }

          {wasteType[index].ears ?
          <View style = {{
                position: 'absolute',
                right: -20,
                top: 0, 
                width: 20, 
                height: 20, 
                borderTopLeftRadius: 20, 
                backgroundColor: '#636e72'
                }}></View> : null }
              
            <TouchableOpacity 
              onPress = {onPress}
              style = {{alignItems: 'center'}}>
            <Text style = {[globalStyles.icon,
                { 
                color: wasteType[index].iconColor, 
                fontSize: 30, 
                marginTop: 10}
                ]}>
            {wasteType[index].icon}
            </Text>
          <Text style = {{
            color: wasteType[index].iconColor,
            fontSize: Dimensions.get('window').width * 0.02,
            paddingTop: 5
          }}>
            {wasteType[index].name}
          </Text>
          </TouchableOpacity>
        </View>
      
    )
  }

  export default WasteTab
  