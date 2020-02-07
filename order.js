import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import Orderform from './orderform'
import OrderBar from './orderbar'
import Initial from './initial'
import Settings from './settings'



const Order = createMaterialTopTabNavigator({

    Orderform: {
        screen: Orderform
    },

    Initial: {
        screen: Initial,
      },

    Settings: {
        screen: Settings
    }
      
}, 
    {
        tabBarComponent: OrderBar,
        tabBarPosition: 'bottom'
    }
    
)   


export default Order