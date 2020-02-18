import React, { useState, useEffect, useCallback } from 'react'
import { View,  Text, FlatList, Dimensions, ImageBackground, Image } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { globalStyles } from './globalstyle'
import { wasteColors } from './wastetab'
import { db } from './config'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import Firebase from 'firebase'
import { wasteImage } from './wasteitem'
import ItemDate from './date'
import { LinearGradient } from 'expo-linear-gradient'

const d = Dimensions.get('screen').width * 0.17

const History = ({ navigation }) => {

    const [user, setUser] = useState({})
    const [items, setItems] = useState([])
  
    useFocusEffect(

        useCallback(() => {
            
            setUser( Firebase.auth().currentUser ) 
            //console.log(user)
                    
          }, [])
    )

    useEffect(() => {

        user ? 
                db.ref('/users/' + user.uid).on('value', snapshot => {
                const newItems = Object.values(snapshot.val())
                setItems(newItems)
                })
             : 
                setItems([])
     
    },[items.length, user])    

    const setItemHeight = (key) => {
        setItems((items) => {
            return items.map(item => {
            if (item.key == key) item.height ? item.height = false : item.height = true
            return item
            }).reverse()
        })
    }

    return(

        <View style = {[globalStyles.container, {backgroundColor: wasteColors[3], alignItems: 'stretch'}]}>
            <ImageBackground 
                    source = {require('./assets/knp_backG.png')}
                    style = {{alignItems: 'center', height: '100%', width: '100%'}}
                    imageStyle = {{resizeMode : 'repeat'}}>

            <LinearGradient
                        colors = {['transparent', wasteColors[3]]}
                        start = {[0, 0.85]}
                        end = {[0, 1.0]}>
            <View style = { globalStyles.headerWastes }>
                    <Text style = {[globalStyles.icon, {fontSize: 30, paddingBottom: 5, color: 'white'}]}>
                        5
                    </Text>
                    <Text style = {[globalStyles.text, {paddingLeft: 10, color: 'white'}]}>
                        МОИ ЗАКАЗЫ
                    </Text>
            </View>

            <View style = {{
                flex: 1,
                
                
            }}>
                
                {items.length ? 
                
                <FlatList
                    keyExtractor = {item => item.key}
                    data = {items.reverse()}
                    renderItem = {({item}) => (
                        <View style = {{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between', 
                            alignItems: 'flex-start',
                            backgroundColor: 'rgba(255,255,255,0.35)'
                            
                            }}>
                                <TouchableOpacity onPress = {() => setItemHeight(item.key)}>
                                    <View style = {{
                                                backgroundColor: '#dfe4ea',
                                                height: item.height ? d * 2 : d,
                                                width: Dimensions.get('screen').width * 0.78,
                                                paddingLeft: 10,
                                                padding: 3,
                                                borderTopRightRadius: d / 2,
                                                borderBottomRightRadius: d / 2,
                                                borderBottomLeftRadius: 10,
                                                borderTopLeftRadius: 10,
                                                marginRight: 5,
                                                margin: 5,
                                                elevation: 3,
                                                borderWidth: 2,
                                                borderColor: 'white',
                                                flexDirection: 'row',
                                                alignItems: 'flex-start',
                                                justifyContent: 'space-between'
                                                }}>
                                        <View>
                                            <Text style = {{fontFamily: 'custom', fontSize: d * 0.2, color: 'gray'}}>
                                                {item.type + ' - ' + item.quantity + ' кг.'}</Text>
                                            <ScrollView style = {{width: d * 3}}>
                                                <ItemDate  timestamp = {item.date} mode = 'full'/>
                                            <Text>{item.address}</Text>
                                            <Text>Лифт: {item.lift ? ' ЕСТЬ' : ' НЕТ'}</Text>
                                            <View style = {{flexDirection: 'row'}}>
                                                <Text style = {{fontWeight: 'bold'}}>ВЫВОЗ: </Text> 
                                                <ItemDate  timestamp = {item.removalDate} mode = 'full'/>
                                            </View>
                                            
                                                
                                            </ScrollView>    
                                        </View>

                                       
                                                    <Image source = {wasteImage.wasteTypes[item.id]}
                                                    style = {{height: d/1.5, width: d/1.5, marginRight: 5, marginTop: 5}}/>

                                                

                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress = {() => navigation.navigate('Orderform', {values: item})}>
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
                : 
                <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style = {globalStyles.text}> ВЫ ЕЩЕ НИЧЕГО НЕ ЗАКАЗАЛИ </Text>
                </View>}


            </View>
            </LinearGradient>
            </ImageBackground>   
        </View>
    )
}

export default History