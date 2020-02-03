import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import Orderform from './orderform'
import OrderBar from './orderbar'
import History from './history'


const Order = createMaterialTopTabNavigator({

    Orderform: {
        screen: Orderform
    },

    History: {
        screen: History
    }
      
}, 
    {
        tabBarComponent: OrderBar,
        tabBarPosition: 'bottom'
    }
    
)   


export default Order