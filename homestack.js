import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import customBar from './custombar';
import Glass from './glass';
import Plastic from './plastic';
import Paper from './paper';


const HomeStack = createMaterialTopTabNavigator({

    Glass: {
        screen: Glass
    },

    Plastic: {
        screen: Plastic
    },

    Paper: {
        screen: Paper
    }
},
    {
        tabBarComponent: customBar,
        tabBarPosition: 'bottom'
        
    }
)    


export default createAppContainer(HomeStack)
