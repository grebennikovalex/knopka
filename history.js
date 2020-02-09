import React, { Component } from 'react'
import { View,  Text, FlatList, Dimensions, ImageBackground } from 'react-native'
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
        let items = Object.values(data)
        this.setState({ items })
      })
}

    
    render(){

    return(
        <View style = {[globalStyles.container, {backgroundColor: wasteColors[3], paddingTop: 10, alignItems: 'stretch'}]}>
             <ImageBackground 
                    source = {require('./assets/knp_backG.png')}
                    style = {{alignItems: 'center', height: '100%'}}
                    imageStyle = {{resizeMode : 'repeat'}}>

            
            <View style = { globalStyles.headerWastes }>
                    <Text style = {[globalStyles.icon, {fontSize: 30, paddingBottom: 5, color: 'white'}]}>
                        4
                    </Text>
                    <Text style = {[globalStyles.text, {paddingLeft: 10, color: 'white'}]}>
                        МОИ ЗАКАЗЫ
                    </Text>
            </View>

            <View style = {{
                flex: 1,
                
            }}>
                
                <FlatList
                    keyExtractor = {item => item.key}
                    data = {this.state.items.reverse()}
                    renderItem = {({item}) => (
                        <View style = {{
                            height: Dimensions.get('screen').height * 0.1,
                            flexDirection: 'row',
                            justifyContent: 'space-between', 
                            paddingRight: 5,
                            alignItems: 'center',
                            marginLeft: 10
                            
                            }}>
                                <View style = {{
                                                backgroundColor: '#dfe4ea',
                                                height: d,
                                                width: Dimensions.get('screen').width * 0.75,
                                                paddingLeft: 10,
                                                padding: 3,
                                                borderTopRightRadius: d / 2,
                                                borderBottomRightRadius: d / 2,
                                                borderBottomLeftRadius: 10,
                                                borderTopLeftRadius: 10,
                                                marginRight: 5,
                                                elevation: 3,
                                                borderWidth: 2,
                                                borderColor: 'white'
                                                }}>
                                    <Text style = {{fontFamily: 'custom', fontSize: d * 0.2, color: 'gray'}}>
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
                                    <Text style ={{fontFamily: 'custom', fontSize: d * 0.12, color: 'white'}}>ПОВТОР</Text>
                                    <Text style ={{fontFamily: 'custom', fontSize: d * 0.12, color: 'white'}}>ЗАКАЗА</Text>
                                </View>
                                </TouchableOpacity>

                        </View>
                    )}
                />
            </View>
            </ImageBackground>   
        </View>
    )
    }
}