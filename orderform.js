import React, { useState, useCallback  } from 'react'
import { View,  Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Switch, ImageBackground, Dimensions } from 'react-native'
import { globalStyles } from './globalstyle'
import { useFocusEffect } from '@react-navigation/native'
import { Formik } from 'formik'
import { TextInput, ScrollView } from 'react-native-gesture-handler'
import { uuid } from 'uuidv4'
import Firebase from 'firebase'
import DateTimePicker from '@react-native-community/datetimepicker'
import { LinearGradient } from 'expo-linear-gradient'
import ItemDate from './date'




const d = Dimensions.get('screen').width
const orderString = '  ЗАКАЗАТЬ  '

export default function Orderform ({ route, navigation }) {
   
    let initialValues = route.params.values
    let initialDate = initialValues.removalDate ? new Date (initialValues.removalDate) : new Date()

    const [lift, setLift] = useState(initialValues.lift)
    const [user, setUser] = useState({})

    const [date, setDate] = useState(new Date(initialDate))
    const [time, setTime] = useState(new Date(initialDate))
  
    const [showTime, setShowTime] = useState(false)
    const [showDate, setShowDate] = useState(false)

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date
        setShowDate(Platform.OS === 'ios' ? true : false)
        setDate(currentDate)
        
      }
    
      const onTimeChange = (event, selectedTime) => {
        const currentTime = selectedTime || time
        setShowTime(Platform.OS === 'ios' ? true : false)
        setTime(currentTime)
        
      }
    
      let today = new Date(time.getFullYear(), time.getMonth(), time.getDate())
      let diff = time - today
      let dateTemp = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() + diff 
      let dateFinal = new Date(dateTemp)
    

    useFocusEffect(

        useCallback(() => {
            
            setUser(Firebase.auth().currentUser) 
                    
          }, [])
    )

    
       
    
    user ? initialValues.name = user.displayName : initialValues.name = ''
    user ? initialValues.phone = user.photoURL : initialValues.phone = '+7'
    user ? initialValues.email = user.email : initialValues.email = ''
        
    
    
 
    return(
        <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
        <View style = {[globalStyles.container, { backgroundColor: initialValues.color }]}>
            <ImageBackground 
                        source = {require('./assets/knp_backG.png')}
                        style = {{flex: 1, alignItems: 'center', }}
                        imageStyle = {{resizeMode : 'repeat'}}>
            <LinearGradient
                        colors = {['transparent', initialValues.color]}
                        start = {[0, 0.75]}
                        end = {[0, 0.9]}>
                <View style = {[globalStyles.orderheader, {alignSelf: 'center'}] }>
                    <Text style = {[globalStyles.text, {color: 'white'}]}>
                            { ' ВЫВОЗИМ: ' + initialValues.type + ' '}
                    </Text>
                </View>
        <ScrollView style = {{
            height: Dimensions.get('screen').height,
            
            }}>
        <View style = {globalStyles.ordercontainer}>
            

            
                <Formik
                    initialValues = {initialValues}
                    onSubmit = {(values) => {
                        values.key = uuid()
                        values.lift = lift
                        values.removalDate = dateFinal.getTime()
                        Keyboard.dismiss()
                        navigation.navigate('Confirmation', { values: values, user: user })
                    }}>
                
                    {props => (
                        <View style = {{width: '100%'}}>
                            {user ?
                            <View style = { [globalStyles.input, {backgroundColor: 'transparent', borderWidth: 2, justifyContent: 'center'} ]}>
                                <Text style = {globalStyles.text}>
                                    {user.displayName}
                                </Text>
                                
                            </View>

                            :

                            <View>
                            <Text style = {{marginLeft: 25}}>Ваше имя:</Text>
                            <TextInput
                                style = { globalStyles.input }
                                placeholderTextColor = '#a5b1c2'
                                placeholder = 'Имя Фамилия'
                                onChangeText = {props.handleChange('name')}
                                value = {props.values.name}
                               
                            /></View>}
                            
                            
                            
                            {user ? 
                            <View style = { [globalStyles.input, {backgroundColor: 'transparent', borderWidth: 2, justifyContent: 'center'} ] }>
                                <Text style = {globalStyles.text}>
                                    {user.photoURL}
                                </Text>
                                
                            </View>
                     
                            :

                            <View>
                            <Text style = {{marginLeft: 25}}>Номер телефона *:</Text>
                            <TextInput
                                style = { globalStyles.input }
                                placeholderTextColor = '#a5b1c2'
                                placeholder = 'мобильный телефон'
                                onChangeText = {props.handleChange('phone')}
                                value = {props.values.phone}
                                keyboardType = 'numeric'
                             
                            /></View>}

                            {user ?
                            <View style = { [globalStyles.input, {backgroundColor: 'transparent', borderWidth: 2, justifyContent: 'center'} ] }>
                                <Text style = {globalStyles.text}>
                                    {user.email}
                                </Text>
                                
                            </View>
                    
                            :
                            
                            <View>
                            <Text style = {{marginLeft: 25}}>Адрес электронной почты *:</Text>
                            <TextInput
                                style = { globalStyles.input}
                                placeholderTextColor = '#a5b1c2'
                                placeholder = 'e-mail'
                                onChangeText = {props.handleChange('email')}
                                value = {props.values.email}
                                keyboardType = 'email-address'
                                
                                
                            /></View>}

                            <Text style = {{marginLeft: 25}}>Адрес вывоза:</Text>
                            <TextInput
                                style = { globalStyles.input }
                                placeholderTextColor = '#a5b1c2'
                                multiline
                                placeholder = 'адрес'
                                onChangeText = {props.handleChange('address')}
                                value = {props.values.address}
                                
                                
                            />
                            <View style = {globalStyles.inputSmallContainer}>
                            <View>
                            <Text style = {{marginLeft: 5}}>Количество, кг:</Text>    
                            <TextInput
                                style = {[globalStyles.input,
                                {width: d *0.4,
                                marginLeft: 0
                                }]}
                                placeholderTextColor = '#a5b1c2'
                                placeholder = 'кол-во, кг'
                                onChangeText = {props.handleChange('quantity')}
                                value = {props.values.quantity}
                                keyboardType = 'numeric'
                                
                            />
                            </View>

                            <View>
                            <Text style = {{marginLeft: 10}}>Этаж:</Text> 
                            <TextInput
                                style = {[ globalStyles.input,
                                {width: d * 0.2,
                                marginRight: 0,
                                paddingRight: 0,
                                paddingLeft: 15                                
                                }]}
                                placeholderTextColor = '#a5b1c2'
                                placeholder = 'этаж'
                                onChangeText = {props.handleChange('floor')}
                                value = {props.values.floor}
                                keyboardType = 'numeric'
                               
                                                                
                            />
                            </View>

                            <View style = {{
                                alignItems: 'flex-end',
                                height: 50, 
                                width: '30%'
                                
                                }}>
                                
                                
                                    <Switch
                                        thumbColor = {'#778ca3'}
                                        trackColor = {{false: 'white', true: 'rgba(255, 255, 255, 0.5)'}}
                                        value = {lift}
                                        onValueChange = {v => setLift(v)}
                                    />
                                
                                <Text style = {{
                                                fontFamily: 'custom',
                                                color: 'white'
                                                }}>
                                    ЛИФТ: {lift ? ' ЕСТЬ' : ' НЕТ'}
                                </Text>     
                            </View>
                        </View>
 
                        <View>
                            <Text style = {{marginLeft: 25}}>Желаемые дата и время вывоза:</Text>
                       
                        </View>

                        
                        <View style = {[globalStyles.inputSmallContainer, {alignItems: 'flex-start'}]}>
                            <TouchableOpacity 
                                onPress = {() => setShowDate(true)} 
                                style = {[globalStyles.button, {width: '45%', margin: 0, marginTop: 5, borderColor: '#dfe6e9', backgroundColor: 'white'}]}>
                                   <ItemDate  
                                        timestamp = {dateFinal.getTime()} 
                                        mode = 'date'
                                        textStyle = {{fontFamily: 'custom', fontSize: 17, color: '#778ca3'}}
                                        />
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress = {() => setShowTime(true)}
                                style = {[globalStyles.button, {width: '45%', margin: 0, marginTop: 5, borderColor: '#dfe6e9', backgroundColor: 'white'}]}>
                                    <ItemDate
                                        timestamp = {dateFinal.getTime()} 
                                        mode = 'time'
                                        textStyle = {{fontFamily: 'custom', fontSize: 17, color: '#778ca3'}}
                                        />
                            </TouchableOpacity>
                        </View>
                       
      
                                <View>

                                {showTime && (
                                    <DateTimePicker
                                    testID = 'dateTimePicker'
                                    timeZoneOffsetInMinutes = {60 * 3}
                                    value = {time}
                                    mode = 'time'
                                    is24Hour = {true}
                                    display = 'default'
                                    onChange = {onTimeChange}
                                    />
                                )}
                                
                                </View>

                                <View>
                                
                                {showDate && (
                                    <DateTimePicker
                                    testID = 'dateTimePicker'
                                    timeZoneOffsetInMinutes = {0}
                                    value = {time}
                                    mode = 'date'
                                    display = 'default'
                                    onChange = {onDateChange}
                                    />
                                )}
                                
                                </View>
                                
                           

                            <TouchableOpacity
                                 onPress={props.handleSubmit}>
                                <View style = {[globalStyles.button,
                                    {
                                        backgroundColor: '#778ca3', 
                                        borderColor: '#b2bec3'
                                    }]}>
                                    <Text style = {globalStyles.text}>
                                         {orderString}     
                                    </Text>

                                </View>
                                
                            </TouchableOpacity>

                        </View>
                       )}

                       </Formik>
                 
                </View>
                </ScrollView>  
                <TouchableOpacity
                        onPress = {() => {
                            navigation.goBack(null)
                            }}>
                             <View style = {[globalStyles.button,
                                    {
                                        backgroundColor: initialValues.color, 
                                        borderColor: initialValues.color
                                    }]}>

                                <Text style = {globalStyles.text}>
                                НАЗАД
                                </Text>
                            </View>
                    
                </TouchableOpacity>    
                </LinearGradient>                 
        </ImageBackground>
        
        </View>
        </TouchableWithoutFeedback>

    )
}