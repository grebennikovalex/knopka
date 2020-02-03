import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import customBar from './custombar'
import Glass from './glass'
import Plastic from './plastic'
import Paper from './paper'
import History from './history'



const wasteselection = createMaterialTopTabNavigator({

    Glass: {
        screen: Glass
    },
      
    Plastic: {
        screen: Plastic
        
    },

    Paper: {
        screen: Paper
        
    },

    History: {
        screen: History
    }
},
    {
        tabBarComponent: customBar,
        tabBarPosition: 'bottom'
        
    }
)    


export default wasteselection
