import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation'
import WasteSelection from './wasteselection'
import Order from './order'
import Initial from './initial'
import Settings from './settings'
import Confirmation from './confirmation'



const MainNavigator = createStackNavigator({
    
  Initial: {
    screen: Initial,
  },

  WasteSelection: {
    screen: WasteSelection,
  },

  Order: {
    screen: Order,
  },

  Settings: {
    screen: Settings
  },

  Confirmation: {
    screen: Confirmation
  }


},
{
  headerMode: 'none' 
})

export default createAppContainer(MainNavigator)