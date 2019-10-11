import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Picker } from 'react-native';
import styles from './inputComponentStyle.js'
import { Icon, } from 'native-base';
import DatePicker from 'react-native-datepicker'
import Header from '../header.js';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob'

const options = {
    title: 'Select Avatar',
    quality: 1.0,
    maxWidth: 500,
    maxHeight: 500,
    customButtons: [],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

const inputComponent = (props) => {

    selectImage = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            console.log(RNFetchBlob.wrap(response.path))
            props.uploadImg(response)

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                //   this.setState({
                //     avatarSource: source,
                //   });
            }
        });
    }

    return (
        <View style={styles.backGroundView}>
            <Header
                navigation={props.navigation}
                headerTitle={props.headerTitle}
                button={props.button}
                headerButtonTitle={props.headerButtonTitle}
            />
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
                                <TouchableOpacity style={styles.iconButton} onPress={()=>selectImage()} >
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
                                <Picker.Item label="Növbədə" value={0} />
                                <Picker.Item label="İcrada" value={1} />
                                <Picker.Item label="Bağlı" value={2} />
                            </Picker>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>

    )
}
export default inputComponent;
