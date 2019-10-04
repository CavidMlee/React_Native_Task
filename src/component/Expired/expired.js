import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    AsyncStorage,
    ScrollView,
    SafeAreaView
} from 'react-native'
import { CheckBox, Icon } from 'native-base';
import ActionSheet from 'react-native-actionsheet'
import styles from './expiredStyle';
import { connect } from 'react-redux';
import { listTask } from '../../action/listAction';
import { editTask } from '../../action/editAction';
import { deleteTask } from '../../action/deleteAction';
import { newTask } from '../../action/creatAction.js';
import Header from './expiredHeader';
import moment from 'moment';


let ilkHerif = '';
let actionItem = null
const options = [
    <Text style={{ color: 'red' }}>İmtina</Text>,
    'Düzəliş',
    'Silin',
]

let weekData = [];
let oneMoonthData = [];
let moonthsData = [];


const ExpiredScreen = (props) => {
    const [num, setNum] = useState(0);
    const [listData, setListData] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    let actionSheet = useRef(null);
    
    useEffect(() => {
        checkData()
    }, [props.list]);

    checkData = () => {
        weekData = [];
        oneMoonthData = [];
        moonthsData = [];

        let dateW = new Date();
        let dateM = new Date();
        dateW.setDate(dateW.getDate() - 7)
        dateM.setDate(dateM.getDate() - 30);

        if (props.list) {
            let allData = props.list.map(data1 => {
                if (data1.count > 0) {
                    data1.data.map(data2 => {
                        let deadline = new Date(data2.deadlineAt).getTime()

                        if (deadline < new Date && deadline > new Date(dateW).getTime()) {
                            weekData.push(data2)
                        }
                        else if (deadline < new Date(dateW).getTime() && deadline > new Date(dateM).getTime()) {
                            oneMoonthData.push(data2)
                        }
                        else if (deadline < new Date(dateM).getTime()) {
                            moonthsData.push(data2)
                        }
                    })
                }
            })
            Promise.all(allData).then(async () => {
                let userData = await AsyncStorage.getItem('userData')
                let parsed = JSON.parse(userData);
                ilkHerif = Array.from(parsed.email).shift().toUpperCase();
                setListData(weekData)
            })
        }
    }

    actionTask = (index, items) => {
        switch (index) {
            case 1:
                props.navigation.navigate('Edit', { item: items })
                break;
            case 2:
                props.deleteTask(items.id, () => {
                    props.listTask(true)
                })
                break;
            default:
                break;
        }
    }

    onRefresh = () => {
        connect ? props.listTask(true) : alert('No internet connection')
    }

    toggleSwitch = (item, bool) => {
        props.editTask(item.id, item.title, item.description, bool ? 0 : 2, item.priority, item.deadlineAt, () => {
            props.listTask(true)
        })
    }

    showActionSheet = (item) => {
        actionItem = item
        actionSheet.show()
    }

    renderItem = ({ item, index }) => {
        let vaxt = moment(item.createdAt).format('DD MMMM YYYY');
        return (
            <View style={styles.list}>
                <View style={styles.cardView}>
                    <View style={styles.checkboxView}>
                        <CheckBox
                            color="black"
                            checked={item.status == 2 ? true : false}
                            onPress={() => toggleSwitch(item, item.status == 2 ? true : false)}
                            style={{ borderRadius: 30 }}
                        />
                    </View>
                    <View style={{ flex: 4, }}>
                        <Text style={styles.cardData}>{vaxt}</Text>
                        <Text style={styles.cardData}>{item.title}</Text>
                        <View style={[{ flexDirection: 'row' }, styles.cardData]}>
                            <View style={styles.ilkherifView}>
                                <Text style={styles.ilkherifText}>{ilkHerif}</Text>
                            </View>
                            <Text> Mən</Text>
                            {item.priority
                                ?
                                <View style={styles.priorityView}>
                                    <Text style={styles.ilkherifText}>P</Text>
                                </View>
                                : null
                            }
                        </View>
                    </View>
                    <View style={styles.imageIconView}>
                        <TouchableOpacity><Icon name="document" style={{ color: '#0288D1' }} /></TouchableOpacity>
                    </View>
                    <View style={styles.actionView}>
                        <TouchableOpacity onPress={() => showActionSheet(item)}><Icon name="more" /></TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    dataStatus = (number) => {
        setNum(number)
        switch (number) {
            case 0:
                setListData(weekData)
                break;
            case 1:
                setListData(oneMoonthData)
                break;
            case 2:
                setListData(moonthsData)
                break;
            default:
                break;
        }
    }

    return (
        <View style={styles.main}>
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <Header
                        list={[]}
                        dataStatus={this.dataStatus}
                    />
                </View>
                <SafeAreaView style={{ flex: 1 }}>
                    {props.list.length > 0
                        ?
                        listData.length > 0 ?
                            <FlatList
                                data={listData}
                                extraData={props.list}
                                renderItem={renderItem}
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                keyExtractor={(item, index) => index.toString()}
                            />
                            :
                            <View style={styles.emptyIcons}>
                                <Icon name="folder-open" style={styles.iconem} />
                                <Text style={styles.emptyText}>Tapşırıq yoxdur</Text>
                            </View>
                        :
                        <View style={styles.emptyIcons}>
                            <Icon name="folder-open" style={styles.iconem} />
                            <Text style={styles.emptyText}>Tapşırıq yoxdur</Text>
                        </View>
                    }
                </SafeAreaView>
            </View>
            <ActionSheet
                ref={r => actionSheet = r}
                title={null}
                options={options}
                cancelButtonIndex={0}
                destructiveButtonIndex={4}
                onPress={(index) => actionTask(index, actionItem)}
            />
        </View>
    )
}


mapStateToProps = (state, props) => ({
    list: state.listReducer.listTask,
    delete: state.deleteReducer.deleteTask,
    state
});

mapDispatchToProps = {
    listTask,
    deleteTask,
    newTask,
    editTask
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpiredScreen);