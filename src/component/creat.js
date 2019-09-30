import React from 'react';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import CreatePage from './creatPage.js';
import { connect } from 'react-redux';
import { newTask } from '../action/creatAction.js';
import NetInfo from '@react-native-community/netinfo';


class CreatScreen extends React.Component {

    state = {
        title: '',
        description: '',
        status: '',
        priority: '',
    }

    changeState = (name) => {
        return (text) => {
            this.setState({ [name]: text })
        }
    }
    creatButton = async () => {
        const { title, description, status, priority } = this.state;
        NetInfo.isConnected.fetch().then(async isConnected => {
            if (isConnected) {
                await this.props.newTask(title, description, status, priority)
            } else {
                alert("You are offline!");
                let offline = await AsyncStorage.getItem('offlineData');
                let parsed = JSON.parse(offline);
                let data =
                {
                    title,
                    description,
                    status,
                    priority
                }
                let arr = []
                if (parsed != null) {
                    arr.push(...parsed)
                }
                arr.push(data)
                AsyncStorage.setItem("offlineData", JSON.stringify(
                    arr
                ));

            }
        });
    }
    render() {
        let { title, description, status, priority } = this.state
        //this.props.navigation.state.params.update
        
        return (
            <CreatePage
                title={title}
                description={description}
                status={status}
                priority={priority}
                changeState={this.changeState}
                creatButton={this.creatButton}
                storuYoxla={this.storuYoxla}
                remov={this.remov}
            />
        )
    }
}

mapStateToProps = (state, props) => ({
    state,
    create:state.newTaskReducer.newTask
    

});

mapDispatchToProps = {
    newTask,
}


export default connect(mapStateToProps, mapDispatchToProps)(CreatScreen);