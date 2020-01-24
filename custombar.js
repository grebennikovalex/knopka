import React from 'react'
import { View, Dimensions } from 'react-native'

import Tab from './tab'

const customBar = (props) => {
    const { navigationState, navigation } = props
    
    return (

        <View style = {{
            height: Dimensions.get('window').width / 3 * 0.6, 
            backgroundColor: '#636e72',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            
        }}>

        {navigationState.routes.map((route, index) => {
            
                return (
                <Tab 
                    index = {index}
                    isActive = {navigation.state.index}
                    onPress={() => navigation.navigate(route.routeName)}
                />
                )
            })}
        </View>
    )
}

export default customBar


      
 