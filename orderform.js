import React, { useState } from 'react'
import { View,  Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Switch } from 'react-native'
import { globalStyles } from './globalstyle'
import { Formik } from 'formik'
import { TextInput } from 'react-native-gesture-handler'
import { uuid } from 'uuidv4'
import Orderheader from './orderheader'


const orderString = '  ЗАКАЗАТЬ  '

export default function Orderform ({ navigation }) {
  
    const [inputStyle, setInputStyle] = useState([false, false, false, false, false, false])
    const [lift, setLift] = useState(false)
    

    let initialValues = navigation.getParam('values')

    console.log(initialValues)

    
    
              
    return(
        <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
        <View style = {[globalStyles.container, { backgroundColor: initialValues.color }]}>
        <Orderheader 
            type = {initialValues.type}
            id = {initialValues.id}
            />
        <View style = {globalStyles.ordercontainer}>
        

                <Formik
                    initialValues = {initialValues}
                    onSubmit = {(values) => {
                        values.key = uuid()
                        values.lift = lift ? 'ЕСТЬ' : 'НЕТ'
                        Keyboard.dismiss()
                        navigation.navigate('Confirmation', { values: values })
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
                                {width: '40%',
                                marginLeft: 0
                                }]}
                                placeholderTextColor = '#a5b1c2'
                                placeholder = 'кол-во, кг'
                                onChangeText = {props.handleChange('quantity')}
                                value = {props.values.quantity}
                                keyboardType = 'numeric'
                                onFocus = {() => setInputStyle([false, false, false, false, true, false])}
                                onBlur = {() => setInputStyle([false, false, false, false, false, false])}
                            />

                            <TextInput
                                style = {[inputStyle[5] ? globalStyles.inputFocused : globalStyles.input,
                                {width: '20%',
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
                            <View style = {{
                                alignItems: 'flex-end',
                                height: 50, 
                                width: '30%'
                                }}>
                                
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Switch
                                        thumbColor = {'#778ca3'}
                                        trackColor = {{false: 'white', true: 'rgba(255, 255, 255, 0.5)'}}
                                        value = {lift}
                                        onValueChange = {v => {
                                        setLift(v)
                                        }}
                                    />
                                </View>
                                <Text style = {{
                                                fontFamily: 'custom',
                                                color: 'white'
                                                }}>
                                    ЛИФТ: {lift ? ' ЕСТЬ' : ' НЕТ'}
                                </Text>     
                            </View>
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
                                                textShadowOffset: {width: 2, height: 2},
                                                textShadowRadius: 5
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