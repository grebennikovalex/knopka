import React, { useState } from 'react'
import { View,  Text, TouchableOpacity, Switch, Alert, Dimensions } from 'react-native'
import { globalStyles } from './globalstyle'
import { db } from './config'

const addOrder = item => {
    db.ref('/items').push(item)
  }


const Confirmation = ({ navigation }) => {

const [persData, setPersData] = useState(false)

const values = navigation.getParam('values')

return (

<View style = {[globalStyles.container, {backgroundColor: '#dfe6e9', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 50}]}>
    <View style = {{
            
            alignItems: 'center',
            width: Dimensions.get('screen').width * 0.8,
            paddingTop: 20,
            backgroundColor: 'white', 
            elevation: 3, 
            borderRadius: 10, 
            borderColor: '#dfe6e9', 
            borderWidth: 2
            }}>
        <Text style = {{marginBottom: 10}}>|| ВАШ ЗАКАЗ ||</Text>

        <Text style = {[globalStyles.text, {color: 'gray', marginBottom: 10}]}>
             
                {values.type + ' - ' + values.quantity + ' кг.'}
        </Text>
            <Text>{values.name}</Text>
            <Text>АДРЕС:{' ' + values.address}</Text>
            <Text>ТЕЛЕФОН:{' ' + values.phone}</Text>
            <Text>E-mail:{' ' + values.email}</Text>
            <Text>ЭТАЖ:{ ' ' + values.floor}</Text>
            <Text>ЛИФТ:{' ' + values.lift}</Text>
        
        <View style = { [persData ? globalStyles.activeButton : globalStyles.passiveButton, {width: '90%', marginTop: 20}]}>
        <TouchableOpacity  
            disabled = {!persData}
            onPress = {() => {
                addOrder(values)
                Alert.alert('ВАШ ЗАКАЗ ПРИНЯТ')
                navigation.navigate('History')
                }}>
               <Text style = {{fontFamily: 'custom', color: 'white'}}> ПОДТВЕРДИТЬ </Text>
        </TouchableOpacity>
        </View>
        
        <View style = {{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '90%', 
                paddingLeft: 10, 
                paddingRight: 20, 
                margin: 10, 
                borderWidth: 2, 
                backgroundColor: 'white',
                borderColor: '#b2bec3', 
                borderRadius: 10
                }}>
            <View style={{ padding: 10, width: '80%'}}>
                <Text>Подтвердите согласие на обработку персональных данных:</Text>
            </View>
                        <View style = {{alignItems: 'flex-end', justifyContent: 'center'}}>
                            <Switch
                                thumbColor = {'red'}
                                trackColor = {{false: '#636e72', true: '#b2bec3'}}
                                value = {persData}
                                onValueChange = {v => {
                                setPersData(v)
                                }}
                            />
                            <Text>{persData ? 'ДА' : 'НЕТ'}</Text>
                        </View>
    </View>
    <View style = {[globalStyles.passiveButton, {width: '90%', backgroundColor: 'white'}]}>
    <TouchableOpacity  onPress = {() => {
        setPersData(false)
        navigation.goBack(null)
        }}>
        
            <Text style = {{fontFamily: 'custom', color: '#b2bec3'}}> ОТМЕНИТЬ </Text>
        
    </TouchableOpacity>
    </View>
    </View>
</View> 

)}

export default Confirmation