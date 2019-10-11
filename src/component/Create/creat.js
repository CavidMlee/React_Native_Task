import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import CreatePage from '../Components/inputComponent/inputComponent.js';
import { connect } from 'react-redux';
import { newTask } from '../../action/creatAction';
import { listTask } from '../../action/listAction';
import { listDelayTask } from '../../action/listDelayAction';
import {uploadFileAction} from '../../action/uploadFileAction'
import moment from 'moment';
import useNetworkStatus from '../Hooks/useNetworkStatus';



const CreatScreen = (props) => {

    const [values, setValues] = useState({ title: '', description: '' })
    const [priority, setPriority] = useState(0)
    const [chosenDate, setChosenDate] = useState(null)
    const [pickerValue, setPickerValue] = useState(0)

    const networkStatus = useNetworkStatus();


    changeState = (name) => {
        return (text) => {
            setValues({ ...values, [name]: text })
        }
    }
    creatButton = async () => {
        const { title, description } = values
        let deadlineAt = moment(chosenDate).format('YYYY-MM-DD HH:MM:SS').toString();
        if (networkStatus) {
            await props.newTask(title, description, pickerValue, priority, deadlineAt, () => {
                props.listTask(true)
                props.listDelayTask(true)
            })
        } else {
            alert("You are offline!");
            let offline = await AsyncStorage.getItem('offlineData');
            let parsed = JSON.parse(offline);
            let data = { title, description, pickerValue, priority, deadlineAt }
            let arr = []
            if (parsed != null) {
                arr.push(...parsed)
            }
            arr.push(data)
            AsyncStorage.setItem("offlineData", JSON.stringify(
                arr
            ));
        }

    }

    setDate = (newDate) => {
        setChosenDate(newDate)
        if (!newDate) {
            setPriority(0)
        }
    }

    teciliDate = () => {
        if (!chosenDate) {
            setChosenDate(new Date())
            setPriority(1)
        }
    }

    picker = (item) => {
        setPickerValue(item)
    }

    uploadImg=(path)=>{
        props.uploadFileAction(path)
    }

    let { title, description } = values
    return (
        <CreatePage
            headerTitle={"Yeni tapşırıq"}
            headerButtonTitle={"Əlavə edin"}
            button={creatButton}
            uploadImg={uploadImg}
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
    state,
    create: state.newTaskReducer.newTask
});

mapDispatchToProps = {
    newTask,
    listTask,
    listDelayTask,
    uploadFileAction

}


export default connect(mapStateToProps, mapDispatchToProps)(CreatScreen);