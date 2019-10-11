import React from 'react'
import { Text, } from 'react-native';
import { Header, Left, Right, Button, Icon, Body, Title } from 'native-base';


const header = (props) => {
    return (
        <Header hasTabs androidStatusBarColor='#46a085' style={{ backgroundColor: '#7BC5AF' }}>
            <Left>
                <Button transparent onPress={() => props.navigation.goBack()}>
                    <Icon name="arrow-round-back" />
                </Button>
            </Left>
            <Body>
                <Title>{props.headerTitle}</Title>
            </Body>
            <Right>
                <Button transparent onPress={() => props.button()}>
                    <Text style={{ color: "white" }}>{props.headerButtonTitle}</Text>
                </Button>
            </Right>
        </Header>
    )
}

export default header;
