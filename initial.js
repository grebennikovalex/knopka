import React, { useState, useEffect }  from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, ImageBackground, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { globalStyles } from './globalstyle'
import { lorem } from './wastetab'
import Auth from './auth'
import Firebase from 'firebase'

const d = Dimensions.get('screen').width * 0.40
let user = {}
user.email = null
user.password = null
Firebase.auth().onAuthStateChanged(e => e ? 
    user = Firebase.auth().currentUser : null)

    const Initial = ({ navigation }) => {

    const [isLogged, setLogged] = useState(true)
    Firebase.auth().onAuthStateChanged(e => e ? setLogged(true) : setLogged(false))

    

    return(
        <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
        <View style = {{backgroundColor: 'white', justifyContent: 'flex-start', alignItems: 'center', alignContent: 'center',
                        height: Dimensions.get('screen').height, paddingTop: 10 }}>
        <ImageBackground 
            source = {require('./assets/knp_backGb.png')}
            style = {{alignItems: 'center', height: '100%'}}
            imageStyle = {{resizeMode : 'repeat' }}>
            <ScrollView>
            <View style = {{alignItems: 'center'}}>
            <View style = {{
                alignItems: 'center',
                justifyContent: 'center',
                width: d * 0.7, 
                height: d * 0.7,
                borderRadius: d * 0.7 / 2,
                backgroundColor: 'white',
                marginTop: 30, 
                padding: 20,
                elevation: 10, 
                margin: 5             
                }}>
                <Image
                    style = {{width: d * 0.65, height: d * 0.65}}  
                    top = {-2}
                    right = {0}
                    source = {require('./assets/icon_.png')} />
            </View>
            <View style = {{alignItems: 'center', margin: 10}}>
                <Text style = {{fontFamily: 'custom', fontSize: d * 0.15, color: '#0984e3'}}>
                    КНОПКА РЕСАЙКЛИНГ</Text>
                <Text style = {{ fontSize: d * 0.1}}>заказ вывоза вторсырья</Text>
            </View>

            {isLogged ? 
                <View>
                <Text>ЮЗЕР {user.email}</Text> 
                <TouchableOpacity onPress = {() => Firebase.auth().signOut().then(function() {
                    alert('signed out...')
                  }).catch(function(error) {
                    alert('ERRROR!!!!')
                  })}>
                      <Text>SIGNOUT</Text>

                </TouchableOpacity>
                </View>

                
                : <Auth/>}
            
            
            
            <View style = {{paddingLeft: 20, paddingRight: 20, marginBottom: 10, width: '95%'}}>
                <Text>{lorem}</Text>
            </View>

           
            <TouchableOpacity onPress = {() => navigation.navigate('Glass')}>
            <ImageBackground
                       style = {{ resizeMode: 'contain' }}
                       source = {require('./assets/glass-1.png')}>
                
                    <View style = {{
                        alignItems: 'center', 
                        justifyContent: 'center',
                        width: d * 2,
                        height: d * 0.4
                        }}>
                            <Text style = {globalStyles.textShadow}> СТЕКЛОБОЙ </Text>
                    </View>
                
            </ImageBackground>
            </TouchableOpacity>
            
            <TouchableOpacity onPress = {() => navigation.navigate('Plastic')}>
            <ImageBackground
                       style = {{ resizeMode: 'contain' }}
                       source = {require('./assets/plastic-0.png')}>
                
                    <View style = {{
                        alignItems: 'center', 
                        justifyContent: 'center',
                        width: d * 2,
                        height: d * 0.4
                        }}>
                            <Text style = {globalStyles.textShadow}> ПЛАСТИКИ </Text>
                    </View>
                
            </ImageBackground>
            </TouchableOpacity>
            
            <TouchableOpacity onPress = {() => navigation.navigate('Paper')}>
            <ImageBackground
                       style = {{ resizeMode: 'stretch' }}
                       source = {require('./assets/paper-3.png')}>
                
                    <View style = {{
                        alignItems: 'center', 
                        justifyContent: 'center',
                        width: d * 2,
                        height: d * 0.4
                        }}>
                            <Text style = {globalStyles.textShadow}> МАКУЛАТУРА </Text>
                    </View>
                
            </ImageBackground>
            </TouchableOpacity>
            <Text>ООО "Кнопка"  2020</Text>
            </View>
            
            
            </ScrollView>
            </ImageBackground>    
        </View>
        </TouchableWithoutFeedback>
    )
}

export default Initial