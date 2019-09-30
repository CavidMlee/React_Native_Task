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
import NetInfo from '@react-native-community/netinfo';
import styles from './mainstyle';
import { connect } from 'react-redux';
import { listTask } from '../action/listAction';
import { deleteTask } from '../action/deleteAction';
import { getTask } from '../action/editAction';
import { newTask } from '../action/creatAction.js';
import { checkEmail } from '../action/loginAction';
import Header from './header';



class MainScreen extends React.Component {

    state = {
        num: 0,
        refreshing: false,
        refresh: true,
        connect: true,
        update: 0
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }

    updateFunc = () => {
        console.log('updateeeee')
        this.setState((prewstate) => ({
            update: prewstate.update + 1
        }))
    }

    componentDidUpdate(oldProps) {
        const newProps = this.props
        if(oldProps.list !== newProps.list) {
          this.setState((prevstate)=>({ update:prevstate.update+1}))
          console.log('Update gedir')
          console.log(oldProps),
          console.log(newProps)
        }
      }

    // componentDidUpdate() {
    //         this.state.connect ? this.props.listTask(true) : null

    // }

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

    actionTask = (items) => {
        Alert.alert(
            'Action',
            'Edit or Delete task',
            [{
                text: 'Cancel', style: 'cancel',
            },
            { text: 'Edit', onPress: () => this.props.navigation.navigate('Edit', { item: items }) },

            { text: 'Delete', onPress: () => { this.props.deleteTask(items.id) } },
            ],
            { cancelable: false },
        );
    }

    onRefresh = () => {
        this.state.connect ? this.props.listTask(true) : alert('No internet connection')
        // this.setState({
        //     refresh: !this.state.refresh
        // })
    }

    renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => this.actionTask(item)} style={styles.list}>
                <Text>Title: {item.title}</Text>
                <Text>Description: {item.description}</Text>
                <Text>Status: {item.status}</Text>
            </TouchableOpacity>
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
                        <FlatList
                            data={this.props.list.length > 0 ? this.props.list[this.state.num].data : null}
                            renderItem={this.renderItem}
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                            //extraData={this.state.refresh}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </SafeAreaView>
                </View>

                <TouchableOpacity style={styles.buttonUpdate} onPress={() => { this.props.navigation.navigate('Creat',{update:this.updateFunc()})}} >
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

mapStateToProps = (state, props) => ({
    list: state.listReducer.listTask,
    delete: state.deleteReducer.deleteTask

});

mapDispatchToProps = {
    listTask,
    deleteTask,
    getTask,
    newTask,
    checkEmail

}


export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);