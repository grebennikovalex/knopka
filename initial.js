import React  from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, ImageBackground, TextInput, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { globalStyles } from './globalstyle'
import { lorem } from './wastetab'

const d = Dimensions.get('screen').width * 0.40

const Initial = ({ navigation }) => {

    return(
        <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
        <View style = {{backgroundColor: 'white', justifyContent: 'flex-start', alignItems: 'center', alignContent: 'center',
                        padding: 20, height: Dimensions.get('screen').height}}>
            <ScrollView>
            <View style = {{alignItems: 'center'}}>
            <View style = {{
                alignItems: 'center',
                justifyContent: 'center',
                width: d * 0.8, 
                height: d * 0.8,
                borderRadius: d * 0.8 / 2,
                backgroundColor: 'white',
                marginTop: 30, 
                padding: 20,
                elevation: 10, 
                margin: 5             
                }}>
                <Image  
                    resizeMode = 'center'
                    top = {-2}
                    right = {1}
                    source = {require('./assets/icon_.png')} />
            </View>
            <View style = {{alignItems: 'center', margin: 10}}>
                <Text style = {{fontFamily: 'custom', fontSize: 28, color: '#0984e3'}}>
                    КНОПКА РЕСАЙКЛИНГ</Text>
                <Text style = {{fontSize: 20}}>заказ вывоза вторсырья</Text>
            </View>
            <View style = {{width: d * 2, marginBottom: 20}}>
                <Text style = {{margin: 3}}>Адрес электронной почты:</Text>
                <TextInput
                    style = {globalStyles.initialInput}
                    onChangeText = {text => onChangeText(text)}
                    placeholder = 'предлагаю сделать поля аутентификации...'
                    //value = {value}
                    />
                <Text style = {{margin: 3}}>Пароль:</Text>
                <TextInput
                    style = {globalStyles.initialInput}
                    onChangeText = {text => onChangeText(text)}
                    placeholder = 'и показывать здесь "юзер залогинен"...'
                    //value = {value}
                    />
            </View>
            <View style = {{paddingLeft: 20, paddingRight: 20, marginBottom: 10}}>
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
            
        </View>
        </TouchableWithoutFeedback>
    )
}

export default Initial