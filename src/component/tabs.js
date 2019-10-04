import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Dimensions } from 'react-native'
import { Container, Header, Tab, Tabs, ScrollableTab, Left, Right, Button, Icon, Body, Title } from 'native-base';
import Main from './Main/main';
import Assigned from './Assigned/assigned'
import Expired from './Expired/expired'
import styles from './Main/mainstyle';


export default class Tabscreen extends Component {
    render() {
        <StatusBar backgroundColor="#5fb99e" barStyle="light-content" />
        return (
            <Container>
                <Header hasTabs androidStatusBarColor='#46a085' style={{ backgroundColor: '#7BC5AF' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.toggleDrawer()}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Tapşırıqlar</Title>
                    </Body>
                </Header>

                <Tabs tabBarUnderlineStyle={{ backgroundColor: "orange", }} renderTabBar={() => <ScrollableTab
                    tabsContainerStyle={{ width: Dimensions.get("window").width }} />}>
                    <Tab tabStyle={{ backgroundColor: 'white' }} textStyle={{ color: 'black' }} activeTabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: 'black', fontWeight: 'normal' }} heading="Gündəlik">
                        <Main navigation={this.props.navigation} />
                    </Tab>
                    <Tab tabStyle={{ backgroundColor: 'white' }} textStyle={{ color: 'black' }} activeTabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: 'black', fontWeight: 'normal' }} heading="Tapşırılan">
                        <Assigned />
                    </Tab>
                    <Tab tabStyle={{ backgroundColor: 'white' }} textStyle={{ color: 'black' }} activeTabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: 'black', fontWeight: 'normal' }} heading="Yubanan">
                        <Expired />
                    </Tab>
                    <Tab tabStyle={{ backgroundColor: 'white' }} textStyle={{ color: 'black' }} activeTabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: 'black', fontWeight: 'normal' }} heading="Layihələr">
                        <Main />
                    </Tab>
                </Tabs>
                <View>
                    <TouchableOpacity style={styles.buttonUpdate} onPress={() => { this.props.navigation.navigate('Creat') }} >
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        );
    }
}