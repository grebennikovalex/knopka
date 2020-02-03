import React, { useState } from 'react'
import { Alert, View, Text, FlatList } from 'react-native'
import { globalStyles } from './globalstyle'
import WasteItem from './wasteitem'
import { wasteColors } from './tab'
import OrderButton from './orderbutton'

let selectedPlastic = {}
    selectedPlastic.type = ''
    selectedPlastic.typeInCase = ''
    selectedPlastic.color = wasteColors[1]

export default function Plastic( { navigation } ) {

    const [plasticType, setPlastic] = useState(
        [{ id: '4', type: 'ПЭТ БУТЫЛКИ', typeInCase: 'ПЭТ БУТЫЛОК', selected: false, price: '7 руб. / кг.'},
        { id: '5', type: 'ПНД КАНИСТРЫ', typeInCase: 'ПНД КАНИСТР', selected: false, price: '8 руб. / кг.'},
        { id: '6', type: 'ПНД ФЛАКОНЫ', typeInCase: 'ПНД ФЛАКОНОВ', selected: false, price: '8 руб. / кг.'},
        { id: '7', type: 'ПЛЕНКА ПВД', typeInCase: 'ПЛЕНКИ ПВД', selected: false, price: '7 руб. / кг.'},
        { id: '8', type: 'ПЛЕНКА ПНД', typeInCase: 'ПЛЕНКИ ПНД', selected: false, price: '7 руб. / кг.'},
        { id: '9', type: 'ПЛЕНКА СТРЕЙЧ', typeInCase: 'ПЛЕНКИ СТРЕЙЧ', selected: false, price: '7 руб. / кг.'}]
    )

    const onPressWaste = (id) => setPlastic((placticType) => {
        return placticType.map(plastic => { 
            plastic.selected = false
            if(plastic.id === id) {
                plastic.selected ? plastic.selected = false : plastic.selected = true 
                selectedPlastic.type = plasticType[id-4].type
                selectedPlastic.typeInCase = plasticType[id-4].typeInCase
                selectedPlastic.id = plasticType[id-4].id
                }
            return plastic
            
        })
    })

    const uncheckWaste = (id) => setPlastic((plasticType) => {
        return plasticType.map(plastic => {
            selectedPlastic.type = ''
            selectedPlastic.typeInCase = ''
            if(plastic.id === id && plastic.selected) plastic.selected = false
            return plastic
        })
    })

    return(
        <View style = {[globalStyles.container, {backgroundColor: wasteColors[1],  paddingTop: 10}]}>
            <View style = {globalStyles.headerWastes}>
            <Text style = {[globalStyles.icon, {fontSize: 30, paddingBottom: 5}]}>
                3
            </Text>
            <Text style = {[globalStyles.text, {paddingLeft: 12}]}>
                ПЛАСТИК
            </Text>
            </View>
            <View style = {globalStyles.wasteListContainer}>
            <FlatList
                horizontal = {true}
                data = {plasticType}
                keyExtractor = {item => item.id}
                renderItem = {({item}) => ( 
                
                <WasteItem
                    id = {item.id}
                    onPressWaste = {onPressWaste}
                    uncheckWaste = {uncheckWaste}
                    item = {item}
                    
                />
                )}
            />
            </View>
            <View style = {{
                    flex: 1,
                    justifyContent: 'center'
                    }}>
            <OrderButton
                    type = {selectedPlastic.typeInCase}
                    showMeWastes = {() => {
                        
                        if(!selectedPlastic.type) Alert.alert('ВЫ НИЧЕГО НЕ ВЫБРАЛИ')
                        else navigation.navigate('Orderform', selectedPlastic )
                            
                    }}         
            />
            </View>  
        </View>
    )
 }

 