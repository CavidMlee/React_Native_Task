import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    FlatList,
    SafeAreaView
} from 'react-native'
import ActionSheet from 'react-native-actionsheet'
import styles from '../Main/mainstyle';
import { connect } from 'react-redux';
import { listTask } from '../../action/listAction';
import { listDelayTask } from '../../action/listDelayAction'
import { editTask } from '../../action/editAction';
import { deleteTask } from '../../action/deleteAction';
import { newTask } from '../../action/creatAction.js';
import Header from '../Header/header'
import RenderComponent from '../Components/renderComponent'
import Empty from '../Components/emptyComponent';

let actionItem = null
const options = [
    <Text style={{ color: 'red' }}>İmtina</Text>,
    'Düzəliş',
    'Silin',
]

const ExpiredScreen = (props) => {
    const [num, setNum] = useState(0);
    const [refreshing, setRefreshing] = useState(false)

    let actionSheet = useRef(null);

    actionTask = (index, items) => {
        switch (index) {
            case 1:
                props.navigation.navigate('Edit', { item: items })
                break;
            case 2:
                props.deleteTask(items.id, () => {
                    props.listTask(true),
                        props.listDelayTask(true)
                })
                break;
            default:
                break;
        }
    }

    onRefresh = () => {
        connect ? props.listDelayTask(true) : alert('No internet connection')
    }

    showActionSheet = (item) => {
        actionItem = item
        actionSheet.show()
    }

    renderItem = ({ item, index }) => {
        return (
            <RenderComponent
                item={item}
                showActionSheet={showActionSheet}
                editTask={props.editTask}
                listTask={props.listDelayTask}
            />
        )
    }

    dataStatus = (number) => {
        setNum(number)
    }

    console.log('expired seifesi')
    const { listDelay } = props;
    return (
        <View style={styles.main}>
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <Header
                        dataStatus={dataStatus}
                        novbede={[null, "Bir həftə"]}
                        icrada={[null, "Bir ay"]}
                        bagli={[null, "Bir aydan çox"]}
                    />
                </View>
                <SafeAreaView style={{ flex: 1 }}>
                    <FlatList
                        data={listDelay.length > 0 ? listDelay[num].data : []}
                        extraData={props.listDelay}
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
    listDelay: state.listDelayReducer.listDelayTask,
    delete: state.deleteReducer.deleteTask,
    page3: state.tabsReducer.tabsPage3
});

mapDispatchToProps = {
    listTask,
    deleteTask,
    newTask,
    editTask,
    listDelayTask
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpiredScreen);