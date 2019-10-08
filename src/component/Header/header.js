import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './headerStyle';


const Header = (props) => {

    const [button, setButton] = useState(0);

    _onPress = (num) => {
        props.dataStatus(num);
        setButton(num)
    }

    let { novbede, icrada, bagli } = props
    return (
        <View style={styles.header}>
            <TouchableOpacity style={button == 0 ? styles.button1 : styles.button} onPress={() => _onPress(0)}>
                <Text style={button == 0 ? styles.text : styles.text1}>{novbede[0]} {novbede[1]}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={button == 1 ? styles.button2 : styles.button} onPress={() => _onPress(1)}>
                <Text style={button == 1 ? styles.text : styles.text2}>{icrada[0]} {icrada[1]}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={button == 2 ? styles.button3 : styles.button} onPress={() => _onPress(2)}>
                <Text style={button == 2 ? styles.text : styles.text3}>{bagli[0]} {[bagli[1]]}</Text>
            </TouchableOpacity>
        </View>
    )

}


export default Header;