import React, { useState, useCallback }  from 'react'
import { View, Text, TouchableOpacity, ImageBackground, Dimensions, Image, StyleSheet, ScrollView,
     TextInput, Alert, Keyboard, TouchableWithoutFeedback, Linking, Platform, Modal } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { globalStyles } from './globalstyle'
import { wasteColors, paperType } from './wastetab'
import firebase from 'firebase'
import { Formik } from 'formik'
import { LinearGradient } from 'expo-linear-gradient'
// import { db } from './config'

let about = 'lorem ipsum blah blah blah na progulkah'

const d = Dimensions.get('screen').width * 0.40

const Settings = () => {

    const [modal, setModal] = useState(false)
    const [user, setUser] = useState({})

    useFocusEffect(

        useCallback(() => {
            
            setUser(firebase.auth().currentUser) 
                
          }, [])
          
    )

  

   
    const submitUser = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
                .then(() => Alert.alert('Вы вошли в аккаунт'))
                .then(() => setUser(firebase.auth().currentUser))
                .catch(error => {
                    if(error.code === 'auth/wrong-password') Alert.alert('НЕПРАВИЛЬНЫЙ НОМЕР ТЕЛЕФОНА')
                    if(error.code === 'auth/invalid-email')  Alert.alert('НЕПРАВИЛЬНЫЙ АДРЕС ЭЛЕКТРОННОЙ ПОЧТЫ')
                    if(error.code === 'auth/user-not-found') Alert.alert('ПОЛЬЗОВАТЕЛЬ НЕ НАЙДЕН')
                    if(error.code === 'auth/user-disabled')  Alert.alert('ПОЛЬЗОВАТЕЛЬ ОТКЛЮЧЕН')
                })
    }

    const callNumber = phone => {
            let phoneNumber = phone
            if (Platform.OS !== 'android') {
                phoneNumber = `telprompt:${phone}`
            } else {
                phoneNumber = `tel:${phone}` 
                }
        
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
            if (!supported) {
                Alert.alert('ЗВОНКИ НЕ ПОДДЕРЖИВАЮТСЯ')
            } else {
                return Linking.openURL(phoneNumber)
                }
        })
        
    }

    const openMaps = (lat, lng) => {
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' })
        const latLng = `${lat},${lng}`
        const label = 'Custom Label'
        const url = Platform.select({ios: `${scheme}${label}@${latLng}`, android: `${scheme}${latLng}(${label})`})

        Linking.openURL(url)
    }
    

    

    return(
        <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>

        <View style = {[globalStyles.container, {backgroundColor: wasteColors[4], alignItems: 'stretch'}]}>
            <ImageBackground 
                    source = {require('./assets/knp_backGb.png')}
                    style = {{alignItems: 'center', height: '100%', width: '100%'}}
                    imageStyle = {{resizeMode : 'repeat'}}>
            <LinearGradient
                        colors = {['transparent', Platform.OS === 'android' ? wasteColors[4] : 'transparent' ]}
                        start = {[0, 0.85]}
                        end = {[0, 1.0]}>
            <View style = {[ 
                        globalStyles.headerWastes, {
                        flexDirection: 'row', 
                        justifyContent: 'space-between', 
                        paddingHorizontal: 25
                        }]}>
                <View style = {{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-start'}}>
                    <Text style = {[globalStyles.icon, {fontSize: 30, paddingBottom: 5, color: '#778ca3'}]}>
                        4
                    </Text>
                    <Text style = {[globalStyles.text, {paddingLeft: 10, color: '#778ca3'}]}>
                        О ПРОЕКТЕ
                    </Text>
                </View>

               
                
            {user ?
                <View>
                    <TouchableOpacity
                            onPress = {() => {
                            firebase.auth().signOut()
                            .then(() => Alert.alert('ВЫ ВЫШЛИ ИЗ АККАУНТА'))
                            .then(() => setUser(firebase.auth().currentUser))
                            .catch((error) => alert(error.message))
                            
                        }}>
                        <Text style = {[globalStyles.icon, {paddingLeft: 10, color: '#778ca3', fontSize: 30}]}>
                        Z
                    </Text>
                    </TouchableOpacity>
                    </View> : null }
                
                    
            </View>

           

            <View style = {{flex: 1, height: '100%'}}>
            {user ? 
                <View style = {{width: '90%', alignSelf: 'center', marginBottom: 10, paddingBottom: 10}}>

                    
                   
                   <View style = {{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                   <View style = {{
                                height: d * 0.5, 
                                width: d *0.5, 
                                borderRadius: d * 0.25, 
                                marginVertical: 15,
                                backgroundColor: 'white', 
                                elevation: 4, 
                                alignItems: 'center', 
                                justifyContent: 'center'                                
                                }}>
                                <Image  source = {require('./assets/icon.png')}
                                style = {{resizeMode: 'cover', height: d * 0.48, width: d * 0.48, alignSelf: 'center', right: 1, top: -1}}/>
                        </View>
                        <Text style = {{fontSize: d * 0.1, fontFamily: 'custom', color: '#778ca3'}}>
                            {user.displayName}
                        </Text>
                        <Text style = {{fontSize: d * 0.1, fontFamily: 'custom', color: '#778ca3'}}>
                            {user.email}
                        </Text>
                        <Text style = {{fontSize: d * 0.1, fontFamily: 'custom', color: '#778ca3'}}>
                            {user.photoURL}
                        </Text>



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

                <View style = {{alignItems: 'center', marginTop: 10}}>
                    <View style = {{ marginBottom: 10 }}>
                    <Text style = {{marginLeft: 10}}>Адрес электронной почты:</Text>
                        <TextInput
                            style = {globalStyles.inputFocused}
                            keyboardType = 'email-address'
                            placeholder = 'user@host.ru'
                            onChangeText = {props.handleChange('email')}
                            value = {props.values.email}
                            
                            />
                    <Text style = {{marginLeft: 10}}>Номер телефона:</Text>
                        <TextInput
                            style = {globalStyles.inputFocused}
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

           
            <View style = {{width: '90%', flex: 1, alignSelf: 'center'}}>
                <ScrollView>

                <View style = {{flexDirection: 'row', marginVertical: 3}}>
                    <TouchableOpacity onPress={() => setModal(true)}>
                    <View style = {[style.icon, {backgroundColor: 'magenta'}]}>
                        <Text style = {{fontFamily: 'icons', color: 'white', fontSize: d * 0.12 }}>{'\uF05A'}</Text>
                    </View>
                    </TouchableOpacity>
                    <Text style = {{paddingVertical: 5, fontSize: d * 0.1}}>
                        {'О проекте\n\"Кнопка Ресайклинг\"'}
                    </Text>
                </View>
     
                <View style = {{flexDirection: 'row', marginVertical: 3}}>
                    <TouchableOpacity onPress={() => callNumber('+79063483827')}>
                    <View style = {style.icon}>
                        <Text style = {{fontFamily: 'icons', color: 'white', fontSize: d * 0.12 }}>{'\uf095'}</Text>
                    </View>
                    </TouchableOpacity>
                    <Text style = {{paddingVertical: 5, fontSize: d * 0.1}}>
                        {'+7 906 348 38 27 \n fomin@knopka-r.ru'}
                    </Text>
                </View>
            
                <View style = {{flexDirection: 'row', marginVertical: 3}}>
                    <TouchableOpacity onPress={() => openMaps(56.284471, 43.956362)}>
                    <View style = {[style.icon, {backgroundColor: 'blue'}]}>
                        <Text style = {{fontFamily: 'icons', color: 'white', fontSize: d * 0.12 }}>{'\uf57d'}</Text>
                    </View>
                    </TouchableOpacity>
                    <Text style = {{paddingVertical: 5, fontSize: d * 0.1}}>
                        {' г. Нижний Новгород, \n ул. Правдинская, 27'}
                    </Text>
                </View>

                <View style = {{flexDirection: 'row', marginVertical: 3}}>
                    <View style = {[style.icon, {backgroundColor: 'orange'}]}>
                        <Text style = {{fontFamily: 'icons', color: 'white', fontSize: d * 0.12 }}>{'\uf1f9'}</Text>
                    </View>
                    <Text style = {{paddingVertical: 5, fontSize: d * 0.1}}>
                        {' © Кнопка Ресайклинг \n 2009-2020'}
                    </Text>
                </View>

                <View style = {{flexDirection: 'row', marginVertical: 3}}>
                <TouchableOpacity onPress={() => callNumber('+79107911101')}>
                    <View style = {[style.icon, {backgroundColor: 'green'}]}>
                        <Text style = {{fontFamily: 'icons', color: 'white', fontSize: d * 0.12 }}>{'\uf4fe'}</Text>
                    </View>
                </TouchableOpacity>
                    <Text style = {{paddingVertical: 5, fontSize: d * 0.1}}>
                        {' Александр Гребенников \n +79107911101'}
                    </Text>
                </View>
                
                </ScrollView>
            </View>

            
            {/* <TouchableOpacity onPress={() => {
                db.ref('/glassType').push({ id: '3', type: 'ЛИСТОВОЙ', price: 1500, description: 'Bla...' })
            }}>
                <View style = {[globalStyles.button, {borderColor: '#dfe6e9', backgroundColor: 'white'}]}>
                    <Text style = {[globalStyles.text, {color: '#778ca3' }]}> PUSH PAPER </Text>
                </View>
            </TouchableOpacity> */}

            

            </View>
            </LinearGradient>
            </ImageBackground>

            <Modal 
                presentationStyle = 'formSheet' 
                visible = {modal}
                animationType = 'fade'>
                <View style = {{
                    flex: 1,
                    padding: 10,
                    paddingVertical: 0,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    
                    }}>
                        <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute', 
                        top: d * 0.1, right: d * 0.1
                        }}>

                    <TouchableOpacity  onPress = {() => setModal(false)}>
                        <Text style = {[globalStyles.icon, {paddingLeft: 10, 
                            color: '#778ca3', 
                            fontSize: 30, 
                            alignSelf: 'flex-start', 
                            right: d * 0.03}]}>
                            Z
                        </Text>
                    </TouchableOpacity>
                    </View>
                    <View style = {{flex: 1, alignItems: 'center', paddingHorizontal: 25}}>
                    
                        <ScrollView>
                            <Text style={{
                                fontSize: d * 0.075,
                                textAlign: 'left'

                                }}>{about}</Text>
                        </ScrollView>
                    </View>
                    <View style = {{height: d, width: d * 2 }}>
                    
                    
                    

                    </View>
                </View>

            </Modal>

        </View>
        </TouchableWithoutFeedback>
    )
}

export default Settings

const style = StyleSheet.create({
    icon: {
        marginHorizontal: 20, 
        height: d * 0.3, 
        width: d * 0.3, 
        backgroundColor: 'red', 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: d * 0.15
    }
})