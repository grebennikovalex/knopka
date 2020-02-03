import React, { useState, useEffect, useRef } from 'react'
import { Alert, View,  Text, FlatList } from 'react-native'
import { globalStyles } from './globalstyle'
import WasteItem from './wasteitem'
import { wasteColors } from './tab'
import OrderButton from './orderbutton'


let selectedGlass = {}
    selectedGlass.type = ''
    selectedGlass.typeInCase = ''
    selectedGlass.color = wasteColors[0]

export default function Glass( { navigation } ) {

    const [glassType, setGlass] = useState(
        [{id: '0', type: 'ЗЕЛЕНОЕ', typeInCase: 'ЗЕЛЕНОГО СТЕКЛА', selected: false, price: '1 500 руб. / тонна' },
        {id: '1', type: 'БЕЛОЕ', typeInCase: 'БЕЛОГО СТЕКЛА', selected: false, price: '1 500 руб. / тонна' },
        {id: '2', type: 'КОРИЧНЕВОЕ', typeInCase: 'КОРИЧНЕВОГО СТЕКЛА', selected: false, price: '1 500 руб. / тонна' },
        {id: '3', type: 'ОКОННОЕ', typeInCase: 'ОКОННОГО СТЕКЛА', selected: false, price: '1 500 руб. / тонна' }]  
    )

    // const flatListRef = useRef()
    
    // useEffect(() => {
    //     flatListRef.scrollToIndex({animated: true, index: 1, viewPosition: 0.5})
    //   }, [])
    
    const onPressWaste = (id) => setGlass((glassType) => {
        return glassType.map(glass => {
            glass.selected = false
            if(glass.id === id) {
                glass.selected ? glass.selected = false : glass.selected = true
                selectedGlass.type = glassType[id].type + ' СТЕКЛО'
                selectedGlass.typeInCase = glassType[id].typeInCase
                selectedGlass.id = glassType[id].id
                }
            return glass
        })
    })

    const uncheckWaste = (id) => setGlass((glassType) => {
        return glassType.map(glass => {
            selectedGlass.type = ''
            selectedGlass.typeInCase = ''
            if(glass.id === id && glass.selected) glass.selected = false
            return glass
        })
    })
    


    return(
        <View style = {[globalStyles.container, {backgroundColor: wasteColors[0], paddingTop: 10}]}>
            <View style = {globalStyles.headerWastes}>
                <Text style = {[globalStyles.icon, {fontSize: 30, paddingBottom: 5}]}>
                    1
                </Text>
            
            <Text style = {[globalStyles.text, {paddingLeft: 10}]}>
                СТЕКЛО
            </Text>
            </View>
            <View style = {globalStyles.wasteListContainer}>
            <FlatList
                data = {glassType}
                keyExtractor = {item => item.id}
                horizontal = {true}
                //ref = {flatListRef}
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
                    type = {selectedGlass.typeInCase}
                    showMeWastes = {() => {
                        
                        if(!selectedGlass.type) Alert.alert('ВЫ НИЧЕГО НЕ ВЫБРАЛИ')
                        else navigation.navigate('Orderform', selectedGlass )
                    }}         
                />   
            </View>    
        </View>
    )
 }

