import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './headerStyle';


let icrada = 0
let novbede = 0
let bagli = 0

class Header extends Component {

    componentDidUpdate() {
        if (this.props.list.length > 0) {
            icrada = this.props.list[0].count
            novbede = this.props.list[1].count
            bagli = this.props.list[2].count
        }
    }

    render() {
        return (
            <View style={styles.header}>
                <TouchableOpacity style={styles.button} onPress={() => this.props.dataStatus("0")}>
                    <Text style={styles.text}>Icrada {icrada} </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => this.props.dataStatus("1")}>
                    <Text style={styles.text}>Növbədə {novbede} </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => this.props.dataStatus("2")}>
                    <Text style={styles.text}>Bağlı {bagli} </Text>
                </TouchableOpacity>
            </View>
        )
    }

}




export default Header;