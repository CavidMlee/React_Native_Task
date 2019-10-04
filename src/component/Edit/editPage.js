import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView,Picker } from 'react-native';
import styles from './editStyle.js'
import { Container, Header, Left, Right, Button, Icon, Body, Title } from 'native-base';
import DatePicker from 'react-native-datepicker'

const EditPage = (props) => {
    return (
        <View style={styles.backGroundView}>
            <Header hasTabs androidStatusBarColor='#46a085' style={{ backgroundColor: '#7BC5AF' }}>
                <Left>
                    <Button transparent onPress={() => props.navigation.goBack()}>
                        <Icon name="arrow-round-back" />
                    </Button>
                </Left>
                <Body>
                    <Title>Düzəliş</Title>
                </Body>
                <Right>
                    <Button transparent onPress={() => props.editButton()}>
                        <Text style={styles.headerAdd}>Düzəliş</Text>
                    </Button>
                </Right>
            </Header>

            <ScrollView keyboardShouldPersistTaps="handled">
                <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
                    <View style={styles.inputCard}>
                        <View>
                            <Text style={styles.textCard}>Tapşırığın başlığı</Text>
                        </View>
                        <View style={styles.viewCard}>
                            <TextInput
                                style={styles.inputStyle}
                                autoCorrect={false}
                                value={props.title}
                                onChangeText={props.changeState("title")}
                            />
                        </View>
                    </View>
                    <View style={styles.inputCard}>
                        <View>
                            <Text style={styles.textCard}>Ətraflı</Text>
                        </View>
                        <View style={styles.viewCardDes}>
                            <TextInput
                                placeholder="Tapşırıq mətnini daxil edin"
                                style={styles.inputStyle}
                                multiline={true}
                                autoCorrect={false}
                                value={props.description}
                                onChangeText={props.changeState("description")}
                            />
                            <View style={styles.viewPhoteVoice}>
                                <TouchableOpacity style={styles.iconButton}>
                                    <Icon name="camera" style={{ color: '#0288D1' }} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Icon name="mic" style={{ color: '#0288D1' }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.dateView}>
                        <View style={styles.inputCardDate}>
                            <View>
                                <Text style={styles.textCard}>Son icra tarixi</Text>
                            </View>
                            <View style={styles.viewCardDate}>
                                <View style={styles.dateCard}>
                                    <DatePicker
                                        style={{ width: 150 }}
                                        date={props.tecili == 1 ? new Date() : props.date}
                                        mode="date"
                                        placeholder="__.__.____"
                                        format="YYYY-MM-DD"
                                        minDate="1900-05-01"
                                        maxDate="2100-05-01"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        showIcon={false}
                                        customStyles={{
                                            dateInput: {
                                                marginRight: 20,
                                                borderWidth: 0,
                                            },
                                            dateText: {
                                                fontSize: 16
                                            }
                                        }}
                                        onDateChange={(date) => { props.setDate(date) }}
                                    />
                                    <TouchableOpacity style={styles.dateIcon} onPress={() => props.date ? props.setDate(null) : null}>
                                        <Icon name={props.date ? "trash" : "calendar"} style={{ color: props.date ? '#bf2e1d' : 'gray' }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.inputCardDate}>
                            <View>
                                <Text style={styles.textCard}>Prioritet</Text>
                            </View>
                            <TouchableOpacity style={props.tecili == 1 ? styles.buttonPrioritet : styles.buttonPrioritet1} onPress={() => props.teciliDate()}>
                                <Text style={props.tecili == 1 ? styles.dateText : styles.dateText1}>Təcili</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.inputCard}>
                        <View>
                            <Text style={styles.textCard}>Status</Text>
                        </View>
                        <View style={styles.viewCard}>
                            <Picker
                                selectedValue={props.pickerValue}
                                style={{ height: 50, width: "100%" }}
                                onValueChange={(itemValue, itemIndex) =>
                                    props.picker(itemValue)
                                }>
                                <Picker.Item label="Növbədə" value="0" />
                                <Picker.Item label="İcrada" value="1" />
                                <Picker.Item label="Bağlı" value="2" />
                            </Picker>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>

    )
}
export default EditPage;
