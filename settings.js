import React, { useState, useCallback }  from 'react'
import { View, Text, TouchableOpacity, ImageBackground, Dimensions, TextInput, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { globalStyles } from './globalstyle'
import { wasteColors } from './wastetab'
import Firebase from 'firebase'
import { Formik } from 'formik'
import { LinearGradient } from 'expo-linear-gradient'




const d = Dimensions.get('screen').width * 0.40

const Settings = () => {

    
    const [user, setUser] = useState({})

    useFocusEffect(

        useCallback(() => {
            
            setUser( Firebase.auth().currentUser ) 
                
          }, [])
          
    )

  

   
    const submitUser = (email, password) => {
        Firebase.auth().signInWithEmailAndPassword(email, password)
                .then(() => Alert.alert('Вы вошли в аккаунт...'))
                .then(() => setUser(Firebase.auth().currentUser))
                .catch(error => alert( error.message ))
    }

    

    return(
        <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
        <View style = {[globalStyles.container, {backgroundColor: wasteColors[4], alignItems: 'stretch'}]}>
            <ImageBackground 
                    source = {require('./assets/knp_backG.png')}
                    style = {{alignItems: 'center', height: '100%', width: '100%'}}
                    imageStyle = {{resizeMode : 'repeat'}}>
            <LinearGradient
                        colors = {['transparent', wasteColors[4]]}
                        start = {[0, 0.85]}
                        end = {[0, 1.0]}>
            <View style = {[ 
                        globalStyles.headerWastes, {
                        flexDirection: 'row', 
                        justifyContent: 'space-between', 
                        paddingHorizontal: 25
                        }]}>
                <View style = {{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-start'}}>
                    <Text style = {[globalStyles.icon, {fontSize: 30, paddingBottom: 5, color: 'white'}]}>
                        4
                    </Text>
                    <Text style = {[globalStyles.text, {paddingLeft: 10, color: 'white'}]}>
                        ПРОФИЛЬ
                    </Text>
                </View>
                
            {user ?
                <View>
                    <TouchableOpacity
                            onPress = {() => {
                            Firebase.auth().signOut()
                            .then(() => Alert.alert('Вы вышли из аккаунта...'))
                            .then(() => setUser(Firebase.auth().currentUser))
                            .catch((error) => alert(error.message))
                            
                        }}>
                        <Text style = {[globalStyles.icon, {paddingLeft: 10, color: 'white', fontSize: 30}]}>
                        Z
                    </Text>
                    </TouchableOpacity>
                    </View> : <View></View> }
                
                    
            </View>

            <View style = {{flex: 1, height: '100%'}}>
            {user ? 
                <View style = {{alignItems: 'center'}}>
                    <View style = {{
                        width: Dimensions.get('screen').width * 0.9, 
                        marginTop: 10,
                        elevation: 3, 
                        backgroundColor: 'white',
                        borderRadius: 10,
                        padding: 10,
                        borderColor: '#dfe6e9',
                        borderWidth: 2,
                        justifyContent: 'space-between'
                        }}> 
                    <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style = {[globalStyles.text, {color: '#778ca3', fontSize: 15}]}>
                            ИМЯ:
                        </Text>
                        <Text style = {{fontSize: 18}}>
                            {user.displayName} 
                        </Text>
                    </View>
                    <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style = {[globalStyles.text, {color: '#778ca3', fontSize: 15}]}>
                            E-MAIL:
                        </Text>
                        <Text style = {{fontSize: 18}}>
                            {user.email} 
                        </Text>
                    </View>
                    <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style = {[globalStyles.text, {color: '#778ca3', fontSize: 15}]}>
                            ТЕЛЕФОН:
                        </Text>
                        <Text style = {{fontSize: 18}}>
                            {user.photoURL} 
                        </Text>
                    </View> 
                    </View>   
                
                    
                    
                        
                    
                </View>         
                :
                <Formik
                initialValues = {{ email: '', password: '+7' }}
                onSubmit = {(values) => {
                                      
                    submitUser(values.email, values.password)
                    Keyboard.dismiss()
                    
                }}> 

                {props => (

                <View style = {{alignItems: 'center'}}>
                    <View style = {{ marginBottom: 10 }}>
                    <Text style = {{marginLeft: 10}}>Адрес электронной почты:</Text>
                        <TextInput
                            style = {globalStyles.input}
                            keyboardType = 'email-address'
                            placeholder = 'user@host.ru'
                            onChangeText = {props.handleChange('email')}
                            value = {props.values.email}
                            
                            />
                    <Text style = {{marginLeft: 10}}>Номер телефона:</Text>
                        <TextInput
                            style = {globalStyles.input}
                            keyboardType = 'numeric'
                            onChangeText = {props.handleChange('password')}
                            placeholder = '+7'
                            value = {props.values.password}
                            />
                </View>
                    <TouchableOpacity 
                            onPress={props.handleSubmit}>
                        <View style = {[globalStyles.button, {borderColor: '#dfe6e9', backgroundColor: 'white'}]}>
                            <Text style = {[globalStyles.text, {color: '#778ca3' }]}> ВОЙТИ </Text>
                        </View>
                    </TouchableOpacity>
       
                </View>
                )}
            </Formik>
            }
            </View>
            </LinearGradient>
            </ImageBackground>
        </View>
        </TouchableWithoutFeedback>
    )
}

export default Settings