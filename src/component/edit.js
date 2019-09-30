import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { getTask, editTask } from '../action/editAction';
import EditPage from './editPage';
import styles from './editStyle';

class EditScreen extends Component {
    constructor(props) {
        super(props);
        let item = this.props.navigation.getParam('item')
        this.state = {
            id:item.id,
            title: item.title,
            description: item.description,
            status: item.status+'',
            priority: item.priority + '',
        }
    }


    changeState = (name) => {
        return (text) => {
            this.setState({ [name]: text })
        }
    }

    editButton = () => {
        const { id,title, description, status, priority } = this.state;
        this.props.editTask(id,title, description, status, priority)
    }

    render() {
        let { title, description, status, priority } = this.state
        return (
            <View style={styles.edit}>
                <EditPage
                    title={title}
                    description={description}
                    status={status}
                    priority={priority}
                    changeState={this.changeState}
                    editButton={this.editButton}
                />
            </View>
        )
    }
};

mapStateToProps = (state, props) => ({
    task: state.editReducer.getTask,
    edit: state.editReducer.editTask

});

mapDispatchToProps = {
    getTask,
    editTask
}

export default connect(mapStateToProps, mapDispatchToProps)(EditScreen);