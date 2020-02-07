import React  from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { globalStyles } from './globalstyle'

const Settings = ({navigation}) => {

    return(
        <View style = {[globalStyles.container, {backgroundColor: '#c7ecee'}]}>
            <View>
                <Text style = {globalStyles.text}>НАСТРОЙКИ</Text>
            </View>
            <TouchableOpacity onPress = {() => navigation.navigate('Initial')}>
            <View style = {globalStyles.button}>
                <Text style = {globalStyles.text}>В НАЧАЛО</Text>
            </View>
            </TouchableOpacity>
        </View>
    )
}

export default Settings