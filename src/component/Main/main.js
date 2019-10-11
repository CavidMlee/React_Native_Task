import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    PanResponder,
    Animated,
    Dimensions
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import ActionSheet from 'react-native-actionsheet'
import styles from './mainstyle';
import { connect } from 'react-redux';
import { listTask } from '../../action/listAction';
import { listDelayTask } from '../../action/listDelayAction';
import { editTask } from '../../action/editAction';
import { deleteTask } from '../../action/deleteAction';
import { newTask } from '../../action/creatAction.js';
import { checkEmail } from '../../action/loginAction';
import Header from '../Header/header';
import RenderComponent from '../Components/renderComponent';
import Empty from '../Components/emptyComponent';
import useNetworkStatus from '../Hooks/useNetworkStatus';

let Window = Dimensions.get('window');
let panResponder = null
let actionItem = null
const options = [
    <Text style={{ color: 'red' }}>İmtina</Text>,
    'Düzəliş',
    'Silin',
]

const MainScreen = (props) => {

    const [num, setNum] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const [pan, setPan] = useState(new Animated.ValueXY())

    const networkStatus = useNetworkStatus()
    const status = useCallback(() => { networkStatus }, [networkStatus])


    useEffect(() => {
        panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([null, {
                dx: pan.x,
                dy: pan.y
            }]),
            onPanResponderRelease: (e, gesture) => {
                Animated.spring(
                    pan,
                    { toValue: { x: 0, y: 0 } }
                ).start();
            }
        });
        networkChangeStatus()
    }, [status]);

    //log out
    signOutAsync = async () => {
        await AsyncStorage.clear();
        props.navigation.navigate('Auth');
        props.checkEmail('logOut')
    };

    //Internet
    networkChangeStatus = async () => {
        if (networkStatus) {
            props.listTask(networkStatus)
            props.listDelayTask(networkStatus)

            let offline = await AsyncStorage.getItem('offlineData');
            let parsed = JSON.parse(offline);

            if (parsed != null) {
                let mapData = parsed.map((item) => {
                    props.newTask(item.title, item.description, item.pickerValue, item.priority, item.deadlineAt, () => {
                        props.listTask(true)
                        props.listDelayTask(true)
                    })
                })
                Promise.all(mapData).then(() => {
                    AsyncStorage.removeItem("offlineData")
                })
            }
        } else {
            props.listTask(networkStatus)
            props.listDelayTask(networkStatus)
        }
    }

    actionTask = (index, items) => {
        switch (index) {
            case 1:
                props.navigation.navigate('Edit', { item: items })
                break;
            case 2:
                networkStatus ?
                    props.deleteTask(items.id, () => {
                        props.listTask(true)
                        props.listDelayTask(true)
                    })
                    :
                    alert("You are Offline!")
                break;
            default:
                break;
        }
    }

    onRefresh = () => {
        networkStatus ? props.listTask(true) : alert('No internet connection')
    }

    //actionsheet
    showActionSheet = (item) => {
        actionItem = item
        actionSheet.show()

    }

    renderItem = ({ item, index }) => {
        return (
            <Animated.View
                {...panResponder.panHandlers}
                style={[pan.getLayout()]}>
                <RenderComponent
                    item={item}
                    showActionSheet={showActionSheet}
                    editTask={props.editTask}
                    listTask={props.listTask}
                />
            </Animated.View>
        )
    }

    dataStatus = (number) => {
        setNum(number)
    }
    console.log('main seifesi')
    let { list } = props
    let actionSheet = useRef(null);
    return (
        <View style={styles.main}>
            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={signOutAsync}><Text>Log out</Text></TouchableOpacity>
                <View style={styles.header}>
                    <Header
                        dataStatus={dataStatus}
                        novbede={[list.length > 0 ? list[0].count : 0, "Növbədə"]}
                        icrada={[list.length > 0 ? list[1].count : 0, "Icrada"]}
                        bagli={[list.length > 0 ? list[2].count : 0, "Bağlı"]}
                    />
                </View>
                <SafeAreaView style={{ flex: 1 }}>
                    <FlatList
                        data={list.length > 0 ? list[num].data : []}
                        extraData={props.list}
                        renderItem={renderItem}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        keyExtractor={(item, index) => index.toString()}
                        ListEmptyComponent={Empty}
                    />
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
    page1: state.tabsReducer.tabsPage1
});

mapDispatchToProps = {
    listTask,
    deleteTask,
    newTask,
    checkEmail,
    editTask,
    listDelayTask
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);