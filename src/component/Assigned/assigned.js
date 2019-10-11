import React, { useState } from 'react';
import {
    View,
    Text,
} from 'react-native';
import { CheckBox, Icon } from 'native-base';
import styles from './assignedStyle';
import { connect } from 'react-redux';
import Header from '../Header/header'



const AssignedScreen = (props) => {
    const [num, setNum] = useState(0);

    dataStatus = (number) => {
        setNum(number);
    }
    console.log('assigned')
    return (
        <View style={styles.assignedView}>

            <View style={styles.header}>
                <Header
                    dataStatus={dataStatus}
                    novbede={[0, "Növbədə"]}
                    icrada={[0, "Icrada"]}
                    bagli={[0, "Bağlı"]}
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
    page2: state.tabsReducer.tabsPage2,
});


export default connect(mapStateToProps,{})(AssignedScreen);