import React, { useState, useEffect,useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    SafeAreaView
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
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
import RenderComponent from '../renderComponent';
import Empty from '../emptyComponent';


let actionItem = null
const options = [
    <Text style={{ color: 'red' }}>İmtina</Text>,
    'Düzəliş',
    'Silin',
]

const MainScreen = (props) => {

    const [num, setNum] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const [connect, setConnect] = useState(true);


    useEffect(() => {
        NetInfo.isConnected.addEventListener('connectionChange', handleConnectivityChange);
        return () => {
            NetInfo.isConnected.removeEventListener('connectionChange', handleConnectivityChange);
        };
    }, []);

    //log out
    signOutAsync = async () => {
        await AsyncStorage.clear();
        props.navigation.navigate('Auth');
        props.checkEmail('logOut')
    };

    //Interneti yoxlayir
    handleConnectivityChange = async isConnected => {
        if (isConnected) {
            setConnect(true)
            props.listTask(isConnected)
            props.listDelayTask(isConnected)

            let offline = await AsyncStorage.getItem('offlineData');
            let parsed = JSON.parse(offline);

            if (parsed != null) {
                let mapData = parsed.map((item) => {
                    console.log(item)
                    props.newTask(item.title, item.description, item.status, item.priority)
                })
                Promise.all(mapData).then(() => {
                    AsyncStorage.removeItem("offlineData")
                })
            }
        } else {
            setConnect(false)
            props.listTask(isConnected)
            props.listDelayTask(isConnected)
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
                    props.listDelayTask(true)
                })
                break;
            default:
                break;
        }
    }

    onRefresh = () => {
        connect ? props.listTask(true) : alert('No internet connection')
    }

    //actionsheet
    showActionSheet = (item) => {
        actionItem = item
        actionSheet.show()

    }

    renderItem = ({ item, index }) => {
        console.log('flatlist update')
        return (
            <RenderComponent
                item={item}
                showActionSheet={showActionSheet}
                editTask={props.editTask}
                listTask={props.listTask}
            />
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
                            list={list}
                            dataStatus={dataStatus}
                            novbede={[list.length > 0 ? list[0].count : 0, "Növbədə"]}
                            icrada={[list.length > 0 ? list[1].count : 0, "Icrada"]}
                            bagli={[list.length > 0 ? list[2].count : 0, "Bağlı"]}
                        />
                    </View>
                    <SafeAreaView style={{ flex: 1 }}>
                        {list.length > 0
                            ?
                            list[num].data.length > 0 ?
                                <FlatList
                                    data={list[num].data}
                                    extraData={props.list}
                                    renderItem={renderItem}
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                                :
                                <Empty />
                            :
                            <Empty />
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