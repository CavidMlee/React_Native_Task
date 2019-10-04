import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './expiredHeaderStyle';


class Header extends Component {

    state = {
        button: 0
    }

    _onPress = (num) => {
        this.props.dataStatus(num);
        this.setState({
            button: num
        })
    }

    render() {
        let { button } = this.state;
        return (
            <View style={styles.header}>
                <TouchableOpacity style={button == 0 ? styles.button1:styles.button} onPress={() => this._onPress(0)}>
                    <Text style={button == 0 ? styles.text : styles.text1}>Bir həftə</Text>
                </TouchableOpacity>
                <TouchableOpacity style={button == 1 ? styles.button2:styles.button} onPress={() => this._onPress(1)}>
                    <Text style={button == 1 ? styles.text : styles.text2}>Bir ay</Text>
                </TouchableOpacity>
                <TouchableOpacity style={button == 2 ? styles.button3:styles.button} onPress={() => this._onPress(2)}>
                    <Text style={button == 2 ? styles.text : styles.text3}>Bir aydan çox</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Header;