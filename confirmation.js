import React, { useState  } from 'react'
import { View,  Text, TouchableOpacity, Alert, Dimensions, ImageBackground } from 'react-native'
import { globalStyles } from './globalstyle'
import Check from './check'
import Firebase from 'firebase'
import { db } from './config'
import ItemDate from './date'



const Confirmation = ({ route, navigation }) => {

const [persData, setPersData] = useState(false)

const values = route.params.values
let user = route.params.user

const addOrder = (item) => {
    item.date = Firebase.database.ServerValue.TIMESTAMP
    db.ref('/users/' + user.uid).push(item)
    .then(Alert.alert('ВАШ ЗАКАЗ ОТПРАВЛЕН'))
    .then(navigation.navigate('History'))
    .catch(error => alert( error.message ))
}

const createUser = (values) => {

   Firebase.auth().createUserWithEmailAndPassword(values.email, values.phone)

            .then(function(user) {
                
                user = Firebase.auth().currentUser
                                
                user.updateProfile({
                    displayName: values.name,
                    photoURL: values.phone
                })
                .catch(error => alert( error.message ))
                
                
                return user

            }).then(function(user) {
                values.date = Firebase.database.ServerValue.TIMESTAMP
                db.ref('/users/' + user.uid).push(values)
                .then(Alert.alert(' ПОЗДРАВЛЯЕМ! \n ВАШ ПЕРВЫЙ ЗАКАЗ ОТПРАВЛЕН!'))
                .then(navigation.navigate('History'))
                .catch(error => alert( error.message ))

            })
   
} 


return (

<View style = {[globalStyles.container, {backgroundColor: '#ced6e0', alignItems: 'center', justifyContent: 'flex-start' }]}>
<ImageBackground 
            source = {require('./assets/knp_backG.png')}
            style = {{flex: 1, alignItems: 'center', width: '100%'}}
            imageStyle = {{resizeMode : 'repeat'}}>

    <View style = {{
            alignItems: 'center',
            width: Dimensions.get('screen').width * 0.8,
            marginTop: 50,
            paddingTop: 20,
            backgroundColor: 'white', 
            elevation: 3, 
            borderRadius: 10, 
            borderColor: '#dfe6e9', 
            borderWidth: 2, 
            
            }}>

        <Text style = {{marginBottom: 10}}>|| ВЫВОЗИМ ||</Text>

        <Text style = {[globalStyles.text, {color: 'gray', marginBottom: 10}]}>
      
                {values.type + ' - ' + values.quantity + ' кг.'}
        </Text>
        <View style = {{width: '90%'}}>
            <Text>{values.name}</Text>
            <Text>АДРЕС:  {values.address}</Text>
            <Text>ТЕЛЕФОН:  {values.phone}</Text>
            <Text>E-mail:  {values.email}</Text>
            <Text>ЭТАЖ:  {values.floor}</Text>
            <Text>ЛИФТ: {values.lift ? ' ЕСТЬ' : ' НЕТ'}</Text>
            <View style = {{flexDirection: 'row'}}>
                <Text>ДАТА ВЫВОЗА: </Text>
                <ItemDate  timestamp = {values.removalDate} mode = 'full'/>
            </View>
            
        </View>
       
        <TouchableOpacity
            style = {{width: '100%', alignItems: 'center'}}  
            disabled = {!persData}
            onPress = {() => {!user ? 
                    createUser(values) 
                    : addOrder(values)
                    
                    }}>
            <View style = { [persData ? globalStyles.activeButton : globalStyles.passiveButton, {width: '90%', marginTop: 20}]}>
               <Text style = {{fontFamily: 'custom', color: 'white'}}> ПОДТВЕРДИТЬ ЗАКАЗ</Text>
            </View>
        </TouchableOpacity>
       
        
        <View style = {{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '90%', 
                    paddingHorizontal: 5, 
                    paddingVertical: 5, 
                    margin: 10, 
                    backgroundColor: 'white',
                                    
                    }}>
            <View style={{ width: '80%'}}>
                <Text>Подтвердите согласие на обработку персональных данных:</Text>
            </View>
                        <View style = {{justifyContent: 'center' }}>
                            <Check  
                            value = {persData}
                            onPress = {() => persData ? setPersData(false) : setPersData(true)}
                            />
                        </View>
    </View>
    
    <TouchableOpacity
        style = {{width: '100%', alignItems: 'center'}}
        onPress = {() => {
        setPersData(false)
        navigation.goBack(null)
        }}>
        <View style = {[globalStyles.passiveButton, {width: '90%', backgroundColor: 'white'}]}>
            <Text style = {{fontFamily: 'custom', color: '#b2bec3'}}> ОТМЕНИТЬ </Text>
            </View>    
    </TouchableOpacity>
    
    </View>
    </ImageBackground>    
</View> 


)}

export default Confirmation