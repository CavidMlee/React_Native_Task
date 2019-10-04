import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './headerStyle';


let icrada = 0
let novbede = 0
let bagli = 0

class Header extends Component {

    state = {
        button: 0
    }
    componentDidUpdate() {
        if (this.props.list.length > 0) {
            icrada = this.props.list[0].count
            novbede = this.props.list[1].count
            bagli = this.props.list[2].count
        }
    }

    _onPress = (num) => {
        this.props.dataStatus(num);
        this.setState({
            button: parseInt(num)
        })
    }

    render() {
        let { button } = this.state;
        return (
            <View style={styles.header}>
                <TouchableOpacity style={button == 0 ? styles.button1:styles.button} onPress={() => this._onPress("0")}>
                    <Text style={button == 0 ? styles.text : styles.text1}>{icrada} Növbədə</Text>
                </TouchableOpacity>
                <TouchableOpacity style={button == 1 ? styles.button2:styles.button} onPress={() => this._onPress("1")}>
                    <Text style={button == 1 ? styles.text : styles.text2}>{novbede} Icrada</Text>
                </TouchableOpacity>
                <TouchableOpacity style={button == 2 ? styles.button3:styles.button} onPress={() => this._onPress("2")}>
                    <Text style={button == 2 ? styles.text : styles.text3}>{bagli} Bağlı</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


export default Header;