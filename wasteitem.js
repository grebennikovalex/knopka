import React, { useState } from 'react'
import { View,  Text, TouchableOpacity, Image, Dimensions, Modal } from 'react-native'
import { globalStyles } from './globalstyle'
import { lorem } from './wastetab'

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
                                    fontSize: 15,
                                    color: 'white',
                                    textShadowColor: 'rgba(0, 0, 0, 0.5)',
                                    textShadowOffset: {width: 1, height: 1},
                                    textShadowRadius: 7
                                    }}>
                                {' ' + item.type + ' '}
                            </Text>
                            <Text style = {{fontSize: 15, color: 'black', alignSelf: 'center',}}>
                                {item.price}
                            </Text>
                         
                            <View style = {{
                                    padding: 7, 
                                    marginTop: 5,
                                    backgroundColor: '#778ca3',
                                    borderRadius: 10,
                                    borderColor: 'white',
                                    borderWidth: 2
                                    }}>
                                <Text style = {[globalStyles.text, {
                                    alignSelf: 'center',
                                    fontSize: 18,
                                    textShadowColor: 'rgba(0, 0, 0, 0.5)',
                                    textShadowOffset: {width: 2, height: 2},
                                    textShadowRadius: 7
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
                    paddingTop: 0,
                    justifyContent: 'space-between',
                    alignItems: 'center'
                    }}>
                    <View style = {{alignItems: 'center', padding: 20}}>
                    <Image source = {wasteImage.wasteTypes[id]}
                           style = {{height: d, width: d}}/> 
                        <Text style = {{fontSize: 20, fontFamily: 'custom'}}>{item.type}</Text>
                            <Text>{lorem}</Text>
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
                                        borderRadius: 10
                                        }}>
                                    <Text style = {[globalStyles.text, {
                                        alignSelf: 'center',
                                        fontSize: 18,
                                        textShadowColor: 'rgba(0, 0, 0, 0.5)',
                                        textShadowOffset: {width: 2, height: 2},
                                        textShadowRadius: 7
                                        }]}>
                                        {buttonString}
                                    </Text>
                                </View>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress = {() => setModalOn(false)}>
                    <View style = {{marginTop: 10, alignSelf: 'center'}}>
                        <Text style = {{fontSize: 20, fontFamily: 'custom'}}>ЗАКРЫТЬ</Text>
                    </View>
                    </TouchableOpacity>
                    </View>
                </View>

            </Modal>
        </View>

    )
}

const wasteImage = {
    wasteTypes: {
        '0': require('./assets/waste-glass-0.png'),
        '1': require('./assets/waste-glass-1.png'),
        '2': require('./assets/waste-glass-2.png'),
        '3': require('./assets/waste-glass-3.png'),
        '4': require('./assets/waste-plastic-0.png'),
        '5': require('./assets/waste-plastic-1.png'),
        '6': require('./assets/waste-plastic-2.png'),
        '7': require('./assets/waste-plastic-3.png'),
        '8': require('./assets/waste-plastic-4.png'),
        '9': require('./assets/waste-plastic-5.png'),
        '10': require('./assets/waste-paper-0.png'),
        '11': require('./assets/waste-paper-1.png'),
        '12': require('./assets/waste-paper-2.png'),
        '13': require('./assets/waste-paper-3.png')
    }
}