import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

//import Swipeable from 'react-native-gesture-handler/Swipeable';

export default function Paper( { navigation } ) {
    return(
        <View style = {styles.container}>
            <Text style = {{fontFamily: 'knp', fontSize: 50, color: 'white' }}>
                2
            </Text>
            <Text style = {{fontFamily: 'custom', fontSize: 30, color: 'white' }}>
                БУМАГА
            </Text>
        </View>
    )
 }

 const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f7d794'
    }
 })
