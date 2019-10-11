import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import { getTask, editTask } from '../../action/editAction';
import EditPage from '../Components/inputComponent/inputComponent.js'
import { listTask } from '../../action/listAction';
import { listDelayTask } from '../../action/listDelayAction';
import moment from 'moment';
import useNetworkStatus from '../Hooks/useNetworkStatus';

const EditScreen = (props) => {

    let item = props.navigation.getParam('item')

    const [id , setId] = useState(item.id)
    const [values, setValues] = useState({ title: item.title, description: item.description })
    const [priority, setPriority] = useState(item.priority)
    const [chosenDate, setChosenDate] = useState(item.deadlineAt)
    const [pickerValue, setPickerValue] = useState(item.status)

    const networkStatus = useNetworkStatus();

    changeState = (name) => {
        return (text) => {
            setValues({ ...values, [name]: text })
        }
    }


    editButton = () => {
        if(networkStatus){
        const {  title, description} = values;
        let deadlineAt = moment(chosenDate).format('YYYY-MM-DD HH:MM:SS').toString();

        props.editTask(id, title, description, pickerValue, priority, deadlineAt, () => {
            props.listTask(true)
            props.listDelayTask(true)
            props.navigation.goBack()
        })
    }
    else{
        alert("You are offline!")
    }
    };

    setDate = (newDate) => {
        setChosenDate(newDate)
        if (!newDate) {
            setPriority(0)
        }
    };

    teciliDate = () => {
        if (chosenDate) {
            setChosenDate(new Date ())
            setPriority(1)
        }

    };

    picker = (item) => {
        setPickerValue(item)
    };

        let { title, description } = values
        return (
            <EditPage
                headerTitle={"Düzəliş"}
                headerButtonTitle={"Düzəliş"}
                button={editButton}
                title={title}
                description={description}
                changeState={changeState}
                setDate={setDate}
                date={chosenDate}
                teciliDate={teciliDate}
                navigation={props.navigation}
                tecili={priority}
                picker={picker}
                pickerValue={pickerValue}
            />
        )
    }

mapStateToProps = (state, props) => ({
    task: state.editReducer.getTask,
    edit: state.editReducer.editTask

});

mapDispatchToProps = {
    getTask,
    editTask,
    listTask,
    listDelayTask
}

export default connect(mapStateToProps, mapDispatchToProps)(EditScreen);