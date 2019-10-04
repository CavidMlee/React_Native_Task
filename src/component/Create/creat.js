import React from 'react';
import { AsyncStorage } from 'react-native';
import CreatePage from './creatPage.js';
import { connect } from 'react-redux';
import { newTask } from '../../action/creatAction';
import NetInfo from '@react-native-community/netinfo';
import { listTask } from '../../action/listAction';
import moment from 'moment'


class CreatScreen extends React.Component {

    state = {
        title: '',
        description: '',
        priority: 0,
        chosenDate: null,
        pickerValue: "0"
    }

    changeState = (name) => {
        return (text) => {
            this.setState({ [name]: text })
        }
    }
    creatButton = async () => {
        const { title, description, pickerValue, priority, chosenDate } = this.state;
        let deadlineAt = moment(chosenDate).format('YYYY-MM-DD HH:MM:SS').toString();

        NetInfo.isConnected.fetch().then(async isConnected => {
            if (isConnected) {
                await this.props.newTask(title, description, pickerValue, priority, deadlineAt, () => {
                    this.props.listTask(true)
                })
            } else {
                alert("You are offline!");
                let offline = await AsyncStorage.getItem('offlineData');
                let parsed = JSON.parse(offline);
                let data =
                {
                    title,
                    description,
                    pickerValue,
                    priority,
                    deadlineAt
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

    setDate = (newDate) => {
        this.setState({ chosenDate: newDate });
        if (!newDate) {
            this.setState((prevstate) => ({ priority: 0 }))
        }
    }

    teciliDate = () => {
        if (!this.state.chosenDate) {
            this.setState((prevstate) => ({ chosenDate: new Date(), priority: 1}))
        }
    }

    picker = (item) => {
        this.setState({ pickerValue: item })
    }

    render() {
        let { title, description, priority, chosenDate, pickerValue } = this.state

        return (
            <CreatePage
                title={title}
                description={description}
                changeState={this.changeState}
                creatButton={this.creatButton}
                setDate={this.setDate}
                date={chosenDate}
                teciliDate={this.teciliDate}
                navigation={this.props.navigation}
                tecili={priority}
                picker={this.picker}
                pickerValue={pickerValue}
            />
        )
    }
}

mapStateToProps = (state, props) => ({
    state,
    create: state.newTaskReducer.newTask
});

mapDispatchToProps = {
    newTask,
    listTask
}


export default connect(mapStateToProps, mapDispatchToProps)(CreatScreen);