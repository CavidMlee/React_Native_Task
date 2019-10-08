import React from 'react';
import {Text,View} from 'react-native';
import { Icon } from 'native-base';
import styles from './Main/mainstyle';

const Empty = () => {
    return (
        <View style={styles.emptyIcons}>
            <Icon name="folder-open" style={styles.iconem} />
            <Text style={styles.emptyText}>Tapşırıq yoxdur</Text>
        </View>
    )
}

export default Empty;