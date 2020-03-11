import React, { useState, useCallback, useEffect }  from 'react'
import { View, Text, TouchableOpacity, ImageBackground, Dimensions, Image, StyleSheet, ScrollView,
     TextInput, Alert, Keyboard, Linking, Platform, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import Modal from 'react-native-modal'
import { useFocusEffect } from '@react-navigation/native'
import { globalStyles } from './globalstyle'
import { wasteColors } from './wastetab'
import firebase from 'firebase'
import { Formik } from 'formik'
import { LinearGradient } from 'expo-linear-gradient'
import { db } from './config'



let modalId = 0
const d = Dimensions.get('screen').width * 0.40

const Settings = () => {

    const [modal, setModal] = useState(false)
    const [user, setUser] = useState({})
    const [extraData, setExtra] = useState([
        {image: '', about: '', title: ''},
        {image: '', about: '', title: ''},
        {image: '', about: '', title: ''}
    ])

    useEffect(() => {
        
        db.ref('/extraData').on('value', snapshot => {
        const extra = Object.values(snapshot.val())
        setExtra(extra)
        })
    },[])    
    


    useFocusEffect(

        useCallback(() => {
            
            setUser(firebase.auth().currentUser) 
           
          }, [])
          
    )

    

  

   
    const submitUser = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
                .then(() => Alert.alert('ВЫ ВОШЛИ В ПРОФИЛЬ'))
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
                            .then(() => Alert.alert('ВЫ ВЫШЛИ ИЗ ПРОФИЛЯ'))
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
                                height: d * 0.7, 
                                width: d *0.7, 
                                marginTop: 10,
                                alignItems: 'center', 
                                justifyContent: 'center'                                
                                }}>

                              
                                    <Image  source = {{uri: extraData[2].image}}
                                    style = {{resizeMode: 'stretch', alignSelf: 'center',  height: d * 0.7, 
                                    width: d *0.7, }}/> 
                                    
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

                    <View 
                        style={{width: '80%', height: d * 0.04, 
                        backgroundColor: '#778ca3', alignSelf: 'center',
                        marginVertical: d * 0.05, borderBottomColor: 'white', borderBottomWidth: 3}}>
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

                
                    <TouchableOpacity style = {{flexDirection: 'row', marginVertical: 3, alignItems: 'flex-end'}}
                                onPress={() => {
                                        setModal(true)
                                        modalId = 0
                                        }}>
                    <View style = {[style.icon, {backgroundColor: 'rgba(220,0,124,1)'}]}>
                        <Text style = {{fontFamily: 'icons', color: 'white', fontSize: d * 0.12 }}>{'\uF05A'}</Text>
                    </View>
                    
                    <Text style = {{paddingVertical: 5, fontSize: d * 0.1}}>
                        {'О проекте\n\"Кнопка Ресайклинг\"'}
                    </Text>
                    </TouchableOpacity>
                
     
              
                    <TouchableOpacity style = {{flexDirection: 'row', marginVertical: 3, alignItems: 'flex-end'}}
                                onPress={() => callNumber('+79063483827')}>
                    <View style = {style.icon}>
                        <Text style = {{fontFamily: 'icons', color: 'white', fontSize: d * 0.12 }}>{'\uf095'}</Text>
                    </View>
                    
                    <Text style = {{paddingVertical: 5, fontSize: d * 0.1}}>
                        {'+7 906 348 38 27'}
                    </Text>
                    </TouchableOpacity>
              
            
                
                    <TouchableOpacity style = {{flexDirection: 'row', marginVertical: 3, alignItems: 'flex-end'}}
                                onPress={() => openMaps(56.284471, 43.956362)}>
                    <View style = {[style.icon, {backgroundColor: 'rgba(65,151,230,1)'}]}>
                        <Text style = {{fontFamily: 'icons', color: 'white', fontSize: d * 0.12 }}>{'\uf57d'}</Text>
                    </View>
                    
                    <Text style = {{paddingVertical: 5, fontSize: d * 0.1}}>
                        {' г. Нижний Новгород, \n ул. Правдинская, 27'}
                    </Text>
                    </TouchableOpacity>
                

               
                <TouchableOpacity style = {{flexDirection: 'row', marginVertical: 3, alignItems: 'flex-end'}}
                                onPress={() => {
                                    setModal(true)
                                    modalId = 1}}>
                    <View style = {[style.icon, {backgroundColor: 'rgba(120,166,100,1)'}]}>
                        <Text style = {{fontFamily: 'icons', color: 'white', fontSize: d * 0.12 }}>{'\uf4fe'}</Text>
                    </View>
                
                    <Text style = {{paddingVertical: 5, fontSize: d * 0.1}}>
                        {' О разработчике'}
                    </Text>
                    </TouchableOpacity>
                

                
                <TouchableOpacity style = {{flexDirection: 'row', marginVertical: 3, alignItems: 'flex-end'}}
                                onPress={() => {
                                    setModal(true)
                                    modalId = 2
                                    console.log(extraData[modalId].image)}}>
                    <View style = {[style.icon, {backgroundColor: 'rgba(255,150,15,1)'}]}>
                        <Text style = {{fontFamily: 'icons', color: 'white', fontSize: d * 0.12 }}>{'\uf505'}</Text>
                    </View>
                
                    <Text style = {{paddingVertical: 5, fontSize: d * 0.1}}>
                        {' Политика\n конфиденциальности'}
                    </Text>
                    </TouchableOpacity>
                

                <Text style = {{paddingVertical: 5, fontSize: d * 0.075, alignSelf: 'center'}}>
                        {' © Кнопка Ресайклинг 2009-2020'}
                    </Text>

                </ScrollView>
            </View>

            
            {/* <TouchableOpacity onPress={() => {
                db.ref('/extraData').push({ about: 'Lorem ipsum' })
            }}>
                <View style = {[globalStyles.button, {borderColor: '#dfe6e9', backgroundColor: 'white'}]}>
                    <Text style = {[globalStyles.text, {color: '#778ca3' }]}> PUSH PAPER </Text>
                </View>
            </TouchableOpacity> */}

            

            </View>
            </LinearGradient>
            </ImageBackground>

            <Modal 
                isVisible = {modal}
                animationIn	= 'slideInRight'
                animationOut = 'fadeOutUpBig'
                animationInTiming = {500}
                onSwipeComplete={() => setModal(false)}
                onBackButtonPress={() => setModal(false)}
                swipeDirection={['down', 'up', 'left', 'right']}
                backdropColor='#778ca3'
                propagateSwipe
                style={{justifyContent: 'flex-start'}}
                >
                
                <View style={{paddingBottom: d * 0.5, backgroundColor: 'rgba(0,0,0,0)', borderRadius: 20}}>
                <View style={{
                    alignSelf: 'center',
                    width: Dimensions.get('screen').width * 0.9,
                    height: Dimensions.get('screen').height * 0.65,
                    backgroundColor: 'white',
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: '#778ca3',
                    padding: 15,
                    elevation: 5
                }}> 
                   
                            <Image source = {{uri: extraData[modalId].image}}
                                style = {{height: d * 0.75, width: d * 0.75, alignSelf: 'center'}}/> 
  
                            <Text style={{
                                fontFamily: 'custom',
                                color: '#778ca3',
                                fontSize: 20
                                     }}>
                        {'  ' + extraData[modalId].title}
                            </Text>
                        
                    <ScrollView> 
                    <TouchableWithoutFeedback>
                    <Text style={{fontSize: d * 0.1}}>{extraData[modalId].about}</Text>
                    </TouchableWithoutFeedback>
                    </ScrollView>
                    
                    <View style={{
                            
                            
                            alignItems: 'center',  
                            marginTop:  -d * 0.25,                          
                            position: 'relative',
                            top: d * 0.5,
                            
                            }}>
                            
                                <Text style={{fontFamily: 'icons', fontSize: d * 0.3, color: 'white' }}>
                                                    {'\uf103'}
                                </Text>
                            
                        </View>   

                    
                </View>
                </View>
            </Modal>

        </View>
        
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
        borderRadius: d * 0.15,
        borderWidth: 2,
        borderColor: 'white'
    }
})

