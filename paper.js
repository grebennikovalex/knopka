import React, { useState } from 'react'
import { Alert, View, Text, FlatList } from 'react-native'
import { globalStyles } from './globalstyle'
import WasteItem from './wasteitem'
import { wasteColors } from './tab'
import OrderButton from './orderbutton'

let selectedPaper = {}
    selectedPaper.type = ''
    selectedPaper.typeInCase = ''
    selectedPaper.color = wasteColors[2]

export default function Paper( { navigation } ) {

    const [paperType, setPaper] = useState(
        [{ id: '10', type: 'КАРТОН', typeInCase: 'КАРТОНА', selected: false, price: '4 руб. / кг.'},
        { id: '11', type: 'БУМАГА', typeInCase: 'БУМАГИ', selected: false, price: '4 руб. / кг.'},
        { id: '12', type: 'КНИГИ', typeInCase: 'КНИГ', selected: false, price: '4 руб. / кг.'}]
    )

    const onPressWaste = (id) => setPaper((paperType) => {
        return paperType.map(paper => {
            paper.selected = false
            if(paper.id === id) {
                paper.selected ? paper.selected = false : paper.selected = true
                selectedPaper.type = paperType[id-10].type
                selectedPaper.typeInCase = paperType[id-10].typeInCase
                selectedPaper.id = paperType[id-10].id
                }
            return paper
        })
    })

    const uncheckWaste = (id) => setPaper((paperType) => {
        return paperType.map(paper => {
            selectedPaper.type = ''
            selectedPaper.typeInCase = ''
            if(paper.id === id && paper.selected) paper.selected = false
            return paper
        })
    })

    return(
        <View style = {[globalStyles.container, {backgroundColor: wasteColors[2],  paddingTop: 10}]}>
            <View style = {globalStyles.headerWastes}>
            <Text style = {[globalStyles.icon, {fontSize: 25, paddingBottom: 5}]}>
                2
            </Text>
            
            <Text style = {[globalStyles.text, {paddingLeft: 12}]}>
                БУМАГА
            </Text>
            </View>
            <View style = {globalStyles.wasteListContainer}>
            <FlatList
                horizontal = {true}
                data = {paperType}
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
                type = {selectedPaper.typeInCase}
                showMeWastes = {() => {
                    
                    if(!selectedPaper.type) Alert.alert('ВЫ НИЧЕГО НЕ ВЫБРАЛИ')
                    else navigation.navigate('Orderform', selectedPaper )
                                
                }}         
            />
            </View>  
        </View>
    )
 }

 