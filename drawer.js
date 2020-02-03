import { createDrawerNavigator } from 'react-navigation-drawer'
import { createAppContainer } from 'react-navigation'
import wasteselection from './wasteselection'
import Order from './order'


const RootDrawerNavigator = createDrawerNavigator({
    
  Home: {
    screen: wasteselection,
  },

  Order: {
    screen: Order,
  },
});

export default createAppContainer(RootDrawerNavigator);