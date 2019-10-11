import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native'
import styles from '../Main/mainstyle';
import moment from 'moment';
import { CheckBox, Icon } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';



let ilkHerif = ""
const renderComponent = (props) => {

    useEffect(() => {
        checkName()
    }, [props.listDelay]);

    checkName = async () => {
        let userData = await AsyncStorage.getItem('userData')
        let parsed = JSON.parse(userData);
        ilkHerif = Array.from(parsed.email).shift().toUpperCase();
    }


    //checkbox
    toggleSwitch = (item, bool) => {
        props.editTask(item.id, item.title, item.description, bool ? 0 : 2, item.priority, item.deadlineAt, () => {
            props.listTask(true)
        })
    }

    let vaxt = moment(props.item.createdAt).format('DD MMMM YYYY');
    return (
        <View style={styles.list}>
            <View style={styles.cardView}>
                <View style={styles.checkboxView}>
                    <CheckBox
                        color="black"
                        checked={props.item.status == 2 ? true : false}
                        onPress={() => toggleSwitch(props.item, props.item.status == 2 ? true : false)}
                        style={{ borderRadius: 30 }}
                    />
                </View>
                <View style={{ flex: 4, }}>
                    <Text style={styles.cardData}>{vaxt}</Text>
                    <Text style={styles.cardData}>{props.item.title}</Text>
                    <View style={[{ flexDirection: 'row' }, styles.cardData]}>
                        <View style={styles.ilkherifView}>
                            <Text style={styles.ilkherifText}>{ilkHerif}</Text>
                        </View>
                        <Text> Mən</Text>
                        {props.item.priority
                            ?
                            <View style={styles.priorityView}>
                                <Text style={styles.ilkherifText}>P</Text>
                            </View>
                            : null}
                    </View>
                </View>
                <View style={styles.imageIconView}>
                    <TouchableOpacity><Icon name="document" style={{ color: '#0288D1' }} /></TouchableOpacity>
                </View>
                <View style={styles.actionView}>
                    <TouchableOpacity onPress={() => props.showActionSheet(props.item)}><Icon name="more" /></TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

export default renderComponent;