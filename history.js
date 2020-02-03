import React, { Component } from 'react'
import { View,  Text, FlatList } from 'react-native'
import { globalStyles } from './globalstyle'
import { wasteColors } from './tab'
import { db } from './config'


let itemsRef = db.ref('/items')

export default class History extends Component {
    state = {
        items: []
      }


componentDidMount(){
    itemsRef.on('value', snapshot => {
        let data = snapshot.val();
        let items = Object.values(data);
        this.setState({ items });
      })
}

    
    render(){

    return(
        <View style = {[globalStyles.container, {backgroundColor: wasteColors[3], alignItems: 'stretch'}]}>
            <View style = {globalStyles.headerWastes}>
                <Text style = {[globalStyles.icon, {fontSize: 30, paddingBottom: 5, color: '#a4b0be'}]}>
                        4
                </Text>
                <Text style = {[globalStyles.text, {paddingLeft: 10, color: '#a4b0be'}]}>
                    ИСТОРИЯ ЗАКАЗОВ
                </Text>
            </View>

            <View style = {{marginTop: 10, flex: 1}}>
                
                <FlatList
                    keyExtractor = {item => item.name.key}
                    data = {this.state.items}
                    inverted ={true}
                    renderItem = {({item}) => (
                    <View style = {{
                                    
                                    backgroundColor: wasteColors[3],
                                    margin: 5,
                                    padding: 5,
                                    paddingLeft: 20,
                                    //shadowColor: 'rgba(0, 0, 0, 0.7)',
                                    //shadowOffset: {width: 2, height: -2},
                                    //shadowRadius: 10,
                                    elevation: 5 
                                    }}>
                        <Text style = {[globalStyles.text, {color: 'gray'}]}>
                            {item.name.type + ' - ' + item.name.quantity + ' кг.'}</Text>
                        <Text>{item.name.name}</Text>
                        <Text>{item.name.address}</Text>
                        
                    </View>
                    )}
                />
            </View>
           
        </View>
    )
    }
}