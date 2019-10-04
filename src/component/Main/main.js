import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    FlatList,
    AsyncStorage,
    ScrollView,
    SafeAreaView
} from 'react-native'
import { CheckBox, Icon } from 'native-base';
import NetInfo from '@react-native-community/netinfo';
import ActionSheet from 'react-native-actionsheet'
import styles from './mainstyle';
import { connect } from 'react-redux';
import { listTask } from '../../action/listAction';
import { editTask } from '../../action/editAction';
import { deleteTask } from '../../action/deleteAction';
import { newTask } from '../../action/creatAction.js';
import { checkEmail } from '../../action/loginAction';
import Header from './header';
import moment from 'moment';


let ilkHerif = '';
let actionItem = null
const options = [
    <Text style={{ color: 'red' }}>İmtina</Text>,
    'Düzəliş',
    'Silin',
]

class MainScreen extends React.Component {
    constructor(props) {
        super(props)
        this.actionTask = this.actionTask.bind(this)
    }

    state = {
        num: 0,
        refreshing: false,
        refresh: true,
        connect: true,
        update: 0,
        checkbox: false,
    }

    async componentDidMount() {
        let userData = await AsyncStorage.getItem('userData')
        let parsed = JSON.parse(userData);
        ilkHerif = Array.from(parsed.email).shift().toUpperCase();

        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentDidUpdate(oldProps) {
        const newProps = this.props
        if (oldProps.list !== newProps.list) {
            this.setState((prevstate) => ({ update: prevstate.update + 1 }))
        }
    }

    //log out
    signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
        this.props.checkEmail('logOut')
    };

    //Interneti yoxlayir
    handleConnectivityChange = async isConnected => {
        if (isConnected) {
            this.setState({ connect: true })
            this.props.listTask(isConnected)
            let offline = await AsyncStorage.getItem('offlineData');
            let parsed = JSON.parse(offline);

            if (parsed != null) {
                let mapData = parsed.map((item) => {
                    console.log(item)
                    this.props.newTask(item.title, item.description, item.status, item.priority)
                })
                Promise.all(mapData).then(() => {
                    AsyncStorage.removeItem("offlineData")
                })
            }
        } else {
            this.setState({ connect: false })
            this.props.listTask(isConnected)
        }
    }

    actionTask = (index, items) => {
        switch (index) {
            case 1:
                this.props.navigation.navigate('Edit', { item: items })
                break;
            case 2:
                this.props.deleteTask(items.id, () => {
                    this.props.listTask(true)
                })
                break;
            default:
                break;
        }
    }

    onRefresh = () => {
        this.state.connect ? this.props.listTask(true) : alert('No internet connection')
    }

    //checkbox
    toggleSwitch = (item, bool) => {
        this.props.editTask(item.id, item.title, item.description, bool ? 0 : 2, item.priority, item.deadlineAt, () => {
            this.props.listTask(true)
        })
    }

    //actionsheet
    showActionSheet = (item) => {
        actionItem = item
        this.ActionSheet.show()

    }

    renderItem = ({ item, index }) => {
        console.log('flatlist update')
        let vaxt = moment(item.createdAt).format('DD MMMM YYYY');

        return (
            <View style={styles.list}>
                <View style={styles.cardView}>
                    <View style={styles.checkboxView}>
                        <CheckBox
                            color="black"
                            checked={item.status == 2 ? true : false}
                            onPress={() => this.toggleSwitch(item, item.status == 2 ? true : false)}
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
                                :null}
                        </View>
                    </View>
                    <View style={styles.imageIconView}>
                        <TouchableOpacity><Icon name="document" style={{ color: '#0288D1' }} /></TouchableOpacity>
                    </View>
                    <View style={styles.actionView}>
                        <TouchableOpacity onPress={() => this.showActionSheet(item)}><Icon name="more" /></TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }

    dataStatus = (text) => {
        this.setState({ num: parseInt(text) })
    }

    render() {

        return (
            <View style={styles.main}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={this.signOutAsync}><Text>Log out</Text></TouchableOpacity>
                    <View style={styles.header}>
                        <Header
                            list={this.props.list}
                            dataStatus={this.dataStatus}
                        />
                    </View>
                    <SafeAreaView style={{ flex: 1 }}>
                        {this.props.list.length > 0
                            ?
                            this.props.list[this.state.num].data.length > 0 ?
                                <FlatList
                                    ref={ref => this.flatList = ref}
                                    data={this.props.list[this.state.num].data}
                                    extraData={this.state}
                                    renderItem={this.renderItem}
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.onRefresh}
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
                    ref={o => this.ActionSheet = o}
                    title={null}
                    options={options}
                    cancelButtonIndex={0}
                    destructiveButtonIndex={4}
                    onPress={(index) => this.actionTask(index, actionItem)}
                />
            </View>
        )
    }
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
    checkEmail,
    editTask
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);