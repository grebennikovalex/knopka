import React, { useState }  from 'react'
import { View, Text, TouchableOpacity, Dimensions, TextInput } from 'react-native'
import { globalStyles } from './globalstyle'
import Firebase from 'firebase'

const d = Dimensions.get('screen').width * 0.40

const Auth = () => {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const changeEmail = (value) => setEmail(value)
    const changePassword = (value) => setPassword(value)

    const submitUser = (email, password) => {
        Firebase.auth().signInWithEmailAndPassword(email, password)
                .then(() => alert('Юзер залогинен...'))
                .catch(error => alert( error.message ))
    }

    

    return (
        
            <View>
                <View style = {{width: d * 2, marginBottom: 10}}>
                <Text style = {{margin: 3}}>Адрес электронной почты:</Text>
                <TextInput
                    style = {globalStyles.initialInput}
                    keyboardType = 'email-address'
                    onChangeText = {changeEmail}
                    placeholder = 'user@host.ru'
                    
                    />
                <Text style = {{margin: 3}}>Пароль:</Text>
                <TextInput
                    style = {globalStyles.initialInput}
                    secureTextEntry = {true}
                    onChangeText = {changePassword}
                    placeholder = '*************'
                    
                    />
            </View>
       
    
        <TouchableOpacity onPress = {() => {
                        submitUser(email, password)
                        }}>
        
            
                <View style = {[globalStyles.activeButton, {width: d * 2, margin: 0}]}>
                    <Text style = {[globalStyles.textShadow, {fontSize: 15}]}> РЕГИСТРАЦИЯ </Text>
                </View>
            
        
        </TouchableOpacity>
        </View>
        
    
    )
  
    
}

export default Auth