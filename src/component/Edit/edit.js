import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getTask, editTask } from '../../action/editAction';
import EditPage from './editPage';
import { listTask } from '../../action/listAction';
import moment from 'moment'

class EditScreen extends Component {
    constructor(props) {
        super(props);
        let item = this.props.navigation.getParam('item')
        this.state = {
            id: item.id,
            title: item.title,
            description: item.description,
            priority: item.priority,
            chosenDate: item.deadlineAt,
            pickerValue: item.status + ''
        }
    }


    changeState = (name) => {
        return (text) => {
            this.setState({ [name]: text })
        }
    };

    editButton = () => {
        const { id, title, description, pickerValue, priority,chosenDate } = this.state;
        let deadlineAt = moment(chosenDate).format('YYYY-MM-DD HH:MM:SS').toString();

        this.props.editTask(id, title, description, pickerValue, priority,deadlineAt, () => {
            this.props.listTask(true)
            this.props.navigation.goBack()
        })
    };

    setDate = (newDate) => {
        this.setState({ chosenDate: newDate });
        if (!newDate) {
            this.setState((prevstate) => ({ priority: 0 }))
        }
    };

    teciliDate = () => {
        if (!this.state.chosenDate) {
            this.setState((prevstate) => ({ chosenDate: new Date(), priority: 1 }))
        }

    };

    picker = (item) => {
        this.setState({ pickerValue: item })
    };

    render() {
        let { title, description, priority, chosenDate, pickerValue } = this.state
        return (
                <EditPage
                    editButton={this.editButton}
                    title={title}
                    description={description}
                    changeState={this.changeState}
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
};

mapStateToProps = (state, props) => ({
    task: state.editReducer.getTask,
    edit: state.editReducer.editTask

});

mapDispatchToProps = {
    getTask,
    editTask,
    listTask
}

export default connect(mapStateToProps, mapDispatchToProps)(EditScreen);