import * as React from 'react'
import { View, Dimensions } from 'react-native'

import Tab from './tab'

const customBar = (props) => {
    const { navigationState, navigation, position } = props
    console.log(props)

    return (

        <View style = {{
            height: Dimensions.get('window').width / 3, 
            backgroundColor: 'silver',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            
        }}>

        {navigationState.routes.map((route, index) => {
            const focusAnim = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [0, 1, 0]
              })
                return (
                <Tab 
                    focusAnim = {focusAnim}
                    index = {index}
                    onPress={() => navigation.navigate(route.routeName)}
                />
                )
            })}
        </View>
    )
}

export default customBar


      
 