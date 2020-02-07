import React, { Component } from 'react'
import { View,  Text, FlatList, Dimensions } from 'react-native'
import { globalStyles } from './globalstyle'
import { wasteColors } from './wastetab'
import { db } from './config'
import { TouchableOpacity } from 'react-native-gesture-handler'

const d = Dimensions.get('screen').width * 0.17

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
                        МОИ ЗАКАЗЫ
                    </Text>
            </View>

            <View style = {{marginTop: 0, backgroundColor: wasteColors[3], alignItems: 'stretch'}}>
                
                <FlatList
                    keyExtractor = {item => item.key}
                    data = {this.state.items}
                    inverted = {true}
                    renderItem = {({item}) => (
                        <View style = {{
                            height: Dimensions.get('screen').height * 0.1,
                            flexDirection: 'row',
                            justifyContent: 'space-between', 
                            paddingRight: 5,
                            alignItems: 'center',
                            borderBottomWidth: 2,
                            borderBottomColor: 'gray',
                            marginTop: 5
                            
                            }}>
                                <View style = {{
                                                backgroundColor: wasteColors[3],
                                                paddingLeft: 10,
                                                
                                                }}>
                                    <Text style = {{fontFamily: 'custom', fontSize: 15, color: 'gray'}}>
                                        {item.type + ' - ' + item.quantity + ' кг.'}</Text>
                                    <Text>{item.name}</Text>
                                    <Text>{item.address}</Text>
                                </View>

                                <TouchableOpacity onPress = {() => this.props.navigation.navigate('Orderform', {values: item})}>
                                <View style = {{
                                        
                                        backgroundColor: '#f6b93b',
                                        height: d,
                                        width: d,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 10,
                                        borderRadius: d / 2,
                                        borderWidth: 2,
                                        borderColor: 'white',
                                        elevation: 5,
                                        margin: 5
                                    
                                        }}>
                                    <Text style ={{fontFamily: 'custom', fontSize: 10, color: 'white'}}>ПОВТОР</Text>
                                    <Text style ={{fontFamily: 'custom', fontSize: 10, color: 'white'}}>ЗАКАЗА</Text>
                                </View>
                                </TouchableOpacity>

                        </View>
                    )}
                />
            </View>
           
        </View>
    )
    }
}