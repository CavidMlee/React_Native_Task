import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Dimensions } from 'react-native'
import { Container, Header, Tab, Tabs, ScrollableTab, Left, Right, Button, Icon, Body, Title } from 'native-base';
import Main from '../Main/main';
import Assigned from '../Assigned/assigned'
import Expired from '../Expired/expired'
import styles from '../Main/mainstyle';
import { tabsPage1, tabsPage2, tabsPage3, tabsPage4 } from '../../action/tabsAction';
import { listTask } from '../../action/listAction';
import { connect } from 'react-redux';


const Tabscreen = (props) => {

    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        let n = Math.random();
        switch (currentPage) {
            case 0:
                props.tabsPage1(currentPage + n)
                break;
            case 1:
                props.tabsPage2(currentPage + n)
                break;
            case 2:
                props.tabsPage3(currentPage + n)
                break;
            case 3:
                props.tabsPage4(currentPage + n)
                break;
            default:
                break;
        }
    }, [currentPage])

    return (
        <Container>
            <StatusBar backgroundColor="#5fb99e" barStyle="light-content" />
            <Header hasTabs androidStatusBarColor='#46a085' style={{ backgroundColor: '#7BC5AF' }}>
                <Left>
                    <Button transparent onPress={() => props.navigation.toggleDrawer()}>
                        <Icon name="menu" />
                    </Button>
                </Left>
                <Body>
                    <Title>Tapşırıqlar</Title>
                </Body>
            </Header>
            <Tabs initialPage={0} onChangeTab={({ i }) => setCurrentPage(i)}
                tabBarUnderlineStyle={{ backgroundColor: "orange", }} renderTabBar={() => <ScrollableTab
                    tabsContainerStyle={{ width: Dimensions.get("window").width }} />}>
                <Tab tabStyle={{ backgroundColor: 'white' }} textStyle={{ color: 'black' }} activeTabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: 'black', fontWeight: 'normal' }} heading="Gündəlik">
                    <Main navigation={props.navigation} />
                </Tab>
                <Tab tabStyle={{ backgroundColor: 'white' }} textStyle={{ color: 'black' }} activeTabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: 'black', fontWeight: 'normal' }} heading="Tapşırılan">
                    <Assigned navigation={props.navigation} />
                </Tab>
                <Tab tabStyle={{ backgroundColor: 'white' }} textStyle={{ color: 'black' }} activeTabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: 'black', fontWeight: 'normal' }} heading="Yubanan">
                    <Expired navigation={props.navigation} />
                </Tab>
                <Tab tabStyle={{ backgroundColor: 'white' }} textStyle={{ color: 'black' }} activeTabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: 'black', fontWeight: 'normal' }} heading="Layihələr">
                    <Main navigation={props.navigation} />
                </Tab>
            </Tabs>
            <View>
                <TouchableOpacity style={styles.buttonUpdate} onPress={() => {props.navigation.navigate('Creat') }} >
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
        </Container>
    );
}

mapStateToProps = (state, props) => ({
    //state
});

mapDispatchToProps = {
    tabsPage1,
    tabsPage2,
    tabsPage3,
    tabsPage4,
    listTask,
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabscreen);