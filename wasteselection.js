import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import WasteBar from './wastebar'
import Glass from './glass'
import Plastic from './plastic'
import Paper from './paper'
import History from './history'
import Settings from './settings'



const WasteSelection = createMaterialTopTabNavigator({

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
    },

    Settings: {
        screen: Settings
    }

},
    {
        tabBarComponent: WasteBar,
        tabBarPosition: 'bottom'
        
    }
)    


export default WasteSelection
