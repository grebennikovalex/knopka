import React from 'react'
import { View, Dimensions } from 'react-native'
import OrderTab from './ordertab'

const OrderBar = ({ navigationState, navigation }) => {
    
    
    return (

        <View style = {{
            height: Dimensions.get('window').height * 0.1, 
            backgroundColor: '#636e72',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center'
            
        }}>

        {navigationState.routes.map((route, index) => {
            
                return (
                <OrderTab 
                    index = {index}
                    isActive = {navigation.state.index}
                    onPress={() => navigation.navigate(route.routeName)}
                />
                )
            })}
        </View>
    )
}

export default OrderBar