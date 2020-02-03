import React, { useState } from 'react'
import { View,  Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Modal, Alert, Switch } from 'react-native'
import { globalStyles } from './globalstyle'
import { Formik } from 'formik'
import { TextInput } from 'react-native-gesture-handler'
import Orderheader from './orderheader'
import SendSMS from 'react-native-sms'
import { db } from './config'


const orderString = '  ЗАКАЗАТЬ  '

const addOrder = item => {
    db.ref('/items').push({
      name: item
    })
  }


export default function Orderform ({ navigation }) {
  
    const [inputStyle, setInputStyle] = useState([false, false, false, false, false, false])
    const [lift, setLift] = useState(false)
        
    let type = navigation.getParam('type')
                
    return(
        <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
        <View style = {[globalStyles.container, { backgroundColor: navigation.getParam('color') }]}>
        <Orderheader 
            type = {type}
            id = {navigation.getParam('id')}
            />
        <View style = {globalStyles.ordercontainer}>
        

                <Formik
                    initialValues = {{
                        name: '',
                        phone: '',
                        email: '',
                        address: '',
                        floor: '',
                        quantity: '',
                        key: '',
                        date: '',
                        type: '',
                        lift: ''
                           
                    }}
                    onSubmit = {(values) => {
                        values.key = toString(Math.floor(Math.random() * Math.floor(1000)))
                        values.type = type
                        values.lift = lift ? 'есть' : 'нет'
                        Keyboard.dismiss()
                        Alert.alert('ВАШ ЗАКАЗ ПРИНЯТ')
                        addOrder(values)
                        navigation.navigate( 'History')
                    }}>
                
                    {props => (
                        <View style = {{width: '100%'}}>
                            
                            <TextInput
                                style = { inputStyle[0] ? globalStyles.inputFocused : globalStyles.input }
                                placeholderTextColor = '#a5b1c2'
                                placeholder = 'Имя Фамилия'
                                onChangeText = {props.handleChange('name')}
                                value = {props.values.name}
                                onFocus = {() => setInputStyle([true, false, false, false, false, false])}
                                onBlur = {() => setInputStyle([false, false, false, false, false, false])}
                            />
                            
                            <TextInput
                                style = {inputStyle[1] ? globalStyles.inputFocused : globalStyles.input }
                                placeholderTextColor = '#a5b1c2'
                                placeholder = 'мобильный телефон'
                                onChangeText = {props.handleChange('phone')}
                                value = {props.values.phone}
                                keyboardType = 'numeric'
                                onFocus = {() => setInputStyle([false, true, false, false, false, false])}
                                onBlur = {() => setInputStyle([false, false, false, false, false, false])}
                                
                                
                            />
                            <TextInput
                                style = {inputStyle[2] ? globalStyles.inputFocused : globalStyles.input}
                                placeholderTextColor = '#a5b1c2'
                                placeholder = 'e-mail'
                                onChangeText = {props.handleChange('email')}
                                value = {props.values.email}
                                keyboardType = 'email-address'
                                onFocus = {() => setInputStyle([false, false, true, false, false, false])}
                                onBlur = {() => setInputStyle([false, false, false, false, false, false])}
                                
                            />
                            <TextInput
                                style = {inputStyle[3] ? globalStyles.inputFocused : globalStyles.input }
                                placeholderTextColor = '#a5b1c2'
                                multiline
                                placeholder = 'адрес'
                                onChangeText = {props.handleChange('address')}
                                value = {props.values.address}
                                onFocus = {() => setInputStyle([false, false, false, true, false, false])}
                                onBlur = {() => setInputStyle([false, false, false, false, false, false])}
                                
                            />
                            <View style = {globalStyles.inputSmallContainer}>
                            <TextInput
                                style = {[inputStyle[4] ? globalStyles.inputFocused : globalStyles.input,
                                {width: '68%',
                                marginLeft: 0
                                }]}
                                placeholderTextColor = '#a5b1c2'
                                placeholder = 'количество, кг'
                                onChangeText = {props.handleChange('quantity')}
                                value = {props.values.quantity}
                                keyboardType = 'numeric'
                                onFocus = {() => setInputStyle([false, false, false, false, true, false])}
                                onBlur = {() => setInputStyle([false, false, false, false, false, false])}
                            />

                            <TextInput
                                style = {[inputStyle[5] ? globalStyles.inputFocused : globalStyles.input,
                                {width: '30%',
                                marginRight: 0
                                }]}
                                placeholderTextColor = '#a5b1c2'
                                placeholder = 'этаж'
                                onChangeText = {props.handleChange('floor')}
                                value = {props.values.floor}
                                keyboardType = 'numeric'
                                onFocus = {() => setInputStyle([false, false, false, false, false, true])}
                                onBlur = {() => setInputStyle([false, false, false, false, false, false])}
                                                                
                            />
                            </View>
                            
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Switch
                                    value = {lift}
                                    onValueChange = {v => {
                                    setLift(v)
                                    }}
                                />
                            </View>
                           

                            <TouchableOpacity
                                 onPress={props.handleSubmit}>
                                <View style = {[globalStyles.button,
                                    {
                                        backgroundColor: '#778ca3', 
                                        borderStyle: 'solid'
                                    }]}>
                                    <Text style = {[
                                                globalStyles.text, 
                                                {color: 'white',  
                                                textShadowColor: 'rgba(0, 0, 0, 0.5)',
                                                textShadowOffset: {width: -1, height: 1},
                                                textShadowRadius: 20
                                                }]}>
                                         {orderString}     
                                    </Text>

                                </View>
                                
                            </TouchableOpacity>

                        </View>
                    )}

                </Formik>
                </View>

            <TouchableOpacity
                    onPress = {() => {
                        navigation.goBack(null)
                        }}>
                        <View style = {globalStyles.button}>
                            <Text style = {[globalStyles.text, {color: 'white'}]}>
                             ВЕРНУТЬСЯ
                            </Text>
                        </View>
                
            </TouchableOpacity>
            
       
       </View>
       </TouchableWithoutFeedback>

    )
}