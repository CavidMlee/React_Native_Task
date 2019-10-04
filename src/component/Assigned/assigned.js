import React,{useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    FlatList,
    AsyncStorage,
    ScrollView,
    SafeAreaView
} from 'react-native'
import { CheckBox, Icon } from 'native-base';
import styles from './assignedStyle';
import { connect } from 'react-redux';
import Header from './assignedHeader';



const AssignedScreen = (props) => {
    const [num, setNum] = useState(0);

    dataStatus = (text) => {
        setNum(parseInt(text)); 
    }
    return (
        <View style={styles.assignedView}>

            <View style={styles.header}>
                <Header
                    list={[]}
                    dataStatus={this.dataStatus}
                />
            </View>
            <View style={styles.emptyIcons}>
                <Icon name="folder-open" style={styles.iconem} />
                <Text style={styles.emptyText}>Tapşırıq yoxdur</Text>
            </View>
        </View>
    )
}


mapStateToProps = (state, props) => ({

});

mapDispatchToProps = {


}


export default connect(mapStateToProps, mapDispatchToProps)(AssignedScreen);