import { createStackNavigator } from '@react-navigation/stack'
import { createAppContainer } from 'react-navigation'
import WasteSelection from './wasteselection'
import Orderform from './orderform'
import Confirmation from './confirmation'



const MainNavigator = createStackNavigator({
    
  WasteSelection: {
    screen: WasteSelection
  },

  Orderform: {
    screen: Orderform 
  },

  Confirmation: {
    screen: Confirmation
  }


},
{
  headerMode: 'none' 
})

export default createAppContainer(MainNavigator)