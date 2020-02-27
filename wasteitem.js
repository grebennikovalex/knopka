import React, { useState } from 'react'
import { View,  Text, TouchableOpacity, Image, Dimensions, Modal } from 'react-native'
import { globalStyles } from './globalstyle'
import { ScrollView } from 'react-native-gesture-handler'

const buttonString = ' ВЫВЕЗТИ '

const d = Dimensions.get('screen').width * 0.4

export default function WasteItem ({id, item, wastePress }) {

    const [modalOn, setModalOn] = useState(false)

    return(
        <View>
        <View style = {globalStyles.wasteItem}>
                    <TouchableOpacity onPress = {() => setModalOn(true)}>      
                    <View style = {{
                                borderWidth: 1,
                                borderColor: 'white',
                                height: d,
                                width: d,
                                borderRadius: d / 2,
                                alignContent: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.2)'
                                }}>
                            <Image source = {wasteImage.wasteTypes[id]}
                                style = {{height: d, width: d}}/>            
      
                    </View>
                    </TouchableOpacity>  

                    <View style = {{
                                paddingTop: 7, 
                                backgroundColor: 'rgba(255, 255, 255, 0.4)', 
                                width: '100%',
                                marginTop: 10,
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10
                                }}>
                    <TouchableOpacity onPress = {() => wastePress(id)}>
                            <Text style = {{
                                    alignSelf: 'center',
                                    fontFamily: 'custom',
                                    fontSize: d * 0.09,
                                    color: 'white',
                                    textShadowColor: 'rgba(0, 0, 0, 0.5)',
                                    textShadowOffset: {width: 1, height: 1},
                                    textShadowRadius: 7
                                    }}>
                                {' ' + item.type + ' '}
                            </Text>
                            <Text style = {{fontSize: 15, color: 'black', alignSelf: 'center'}}>
                                {item.price + ' ' + '\u20bd' + (item.price > 1000 ?  '/тонна' : '/кг')}
                            </Text>
                         
                            <View style = {{
                                    padding: 7, 
                                    marginTop: 5,
                                    backgroundColor: '#778ca3',
                                    borderRadius: 10,
                                    borderWidth: 2,
                                    borderColor:'#b2bec3',
                                    elevation: 2
                                    }}>
                                <Text style = {[globalStyles.text, {
                                    alignSelf: 'center',
                                    fontSize: 18,
                                    }]}>
                                    {buttonString}
                                </Text>
                            </View>
                          
                    </TouchableOpacity>
                    </View>
            </View>
            <Modal 
                presentationStyle = 'formSheet' 
                visible = {modalOn}
                animationType = 'fade'>
                <View style = {{
                    flex: 1,
                    padding: 10,
                    paddingVertical: 0,
                    justifyContent: 'space-between',
                    alignItems: 'center'                    
                    }}>
                    <View style = {{flex: 1, alignItems: 'center', paddingHorizontal: 25}}>

                    
                    <Image source = {wasteImage.wasteTypes[id]}
                           style = {{height: d * 0.75, width: d * 0.75}}/> 

                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute', 
                        top: d * 0.1, right: d * 0.1
                        }}>

                    <TouchableOpacity  onPress = {() => setModalOn(false)}>
                        <Text style = {[globalStyles.icon, {paddingLeft: 10, 
                            color: '#778ca3', 
                            fontSize: 30, 
                            alignSelf: 'flex-start', 
                            right: d * 0.03}]}>
                            Z
                        </Text>
                    </TouchableOpacity>
                    </View>
                           
                        <Text style = {{fontSize: 20, fontFamily: 'custom'}}>
                            {item.type}
                        </Text>
                        <ScrollView>
                            <Text style={{
                                fontSize: d * 0.075,
                                textAlign: 'left'

                                }}>{item.description}</Text>
                        </ScrollView>
                    </View>
                    <View style = {{height: d, width: d * 2 }}>
                    
                    <TouchableOpacity onPress = {() => {
                        wastePress(id)
                        setModalOn(false)
                        }}>
                                <View style = {{
                                        padding: 7, 
                                        marginTop: 5,
                                        backgroundColor: '#778ca3',
                                        borderRadius: 10,
                                        borderWidth: 2,
                                        borderColor: '#b2bec3',
                                        elevation: 2
                                        }}>
                                    <Text style = {[globalStyles.text, {
                                        alignSelf: 'center',
                                        fontSize: 18,
                                        
                                        }]}>
                                        {buttonString}
                                    </Text>
                                </View>
                    </TouchableOpacity>

                    

                    </View>
                </View>

            </Modal>
        </View>

    )
}


export const wasteImage = {
    wasteTypes: {
        '0': {uri: 'https://knoprka-e6c2e.firebaseapp.com/assets/waste-glass-0.png'},
        '1': {uri: 'https://knoprka-e6c2e.firebaseapp.com/assets/waste-glass-1.png'},
        '2': {uri: 'https://knoprka-e6c2e.firebaseapp.com/assets/waste-glass-2.png'},
        '3': {uri: 'https://knoprka-e6c2e.firebaseapp.com/assets/waste-glass-3.png'},
        '4': {uri: 'https://knoprka-e6c2e.firebaseapp.com/assets/waste-plastic-0.png'},
        '5': {uri: 'https://knoprka-e6c2e.firebaseapp.com/assets/waste-plastic-1.png'},
        '6': {uri: 'https://knoprka-e6c2e.firebaseapp.com/assets/waste-plastic-2.png'},
        '7': {uri: 'https://knoprka-e6c2e.firebaseapp.com/assets/waste-plastic-3.png'},
        '8': {uri: 'https://knoprka-e6c2e.firebaseapp.com/assets/waste-plastic-4.png'},
        '9': {uri: 'https://knoprka-e6c2e.firebaseapp.com/assets/waste-plastic-5.png'},
        '10': {uri: 'https://knoprka-e6c2e.firebaseapp.com/assets/waste-paper-0.png'},
        '11': {uri: 'https://knoprka-e6c2e.firebaseapp.com/assets/waste-paper-1.png'},
        '12': {uri: 'https://knoprka-e6c2e.firebaseapp.com/assets/waste-paper-2.png'},
        '13': {uri: 'https://knoprka-e6c2e.firebaseapp.com/assets/waste-paper-3.png'}
    }
}


