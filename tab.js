import * as React from 'react'
import { TouchableOpacity, View, Text, Dimensions } from 'react-native'
import { Animated } from 'react-native-reanimated'

const wasteType = [
    {icon: '1', name: 'СТЕКЛО', color: '#63cdda'},
    {icon: '3', name: 'ПЛАСТИК', color: '#f8a5c2'},
    {icon: '2', name: 'БУМАГА', color: '#f7d794'}
]

const Tab = ({ onPress, index, focusAnim }) => {
//console.log(index)

    return ( 
      <TouchableOpacity onPress={onPress}>
        <Animated.View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: Dimensions.get('window').width / 3, 
            width: Dimensions.get('window').width / 3, 
            backgroundColor: focusAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['transparent', wasteType[index].color]
              }) 
            }}
        >
          <Text style={{fontFamily: 'knp', color: 'white', fontSize: 60, marginTop: 20}}>
          {wasteType[index].icon}
          </Text>
          <Text style={{fontFamily: 'custom', color: 'white', fontSize: 18, marginTop: 10}}>
              {wasteType[index].name}
          </Text>
        </Animated.View>
      </TouchableOpacity>
    )
  }

  export default Tab
  