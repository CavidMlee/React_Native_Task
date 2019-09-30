import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import styles from './editStyle.js'


const EditPage = (props) => {
    return (
        <View>
            <ScrollView keyboardShouldPersistTaps="handled">
                <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
                    <View>
                        <View style={styles.borderstyle11}>
                            <View style={styles.inputView}>

                                <Text style={styles.labelStyle}>
                                    Title
                        </Text>
                                <TextInput
                                    style={styles.inputStyle}
                                    autoCorrect={false}
                                    value={props.title}
                                    onChangeText={props.changeState("title")}
                                />
                            </View>
                        </View>
                        <View>
                            <View style={styles.borderstyle11}>
                                <View style={styles.inputView}>

                                    <Text style={styles.labelStyle}>
                                        Description
                        </Text>
                                    <TextInput
                                        style={styles.inputStyle}
                                        autoCorrect={false}
                                        value={props.description}
                                        onChangeText={props.changeState("description")}
                                    />
                                </View>
                            </View>

                            <View style={styles.borderstyle11}>
                                <View style={styles.inputView}>

                                    <Text style={styles.labelStyle}>
                                        Status
                        </Text>
                                    <TextInput
                                        keyboardType="numeric"
                                        autoCorrect={false}
                                        value={props.status}
                                        onChangeText={props.changeState("status")}
                                        style={styles.inputStyle}
                                    />

                                </View>
                            </View>

                            <View style={styles.borderstyle11}>
                                <View style={styles.inputView}>

                                    <Text style={styles.labelStyle}>
                                        Priority
                        </Text>
                                    <TextInput
                                        keyboardType="numeric"
                                        autoCorrect={false}
                                        value={props.priority}
                                        onChangeText={props.changeState("priority")}
                                        style={styles.inputStyle}
                                    />

                                </View>
                            </View>
                        </View>


                        <View style={styles.borderstyle11}>
                            <TouchableOpacity style={styles.buttonContent} onPress={() => props.editButton()}  >
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}
export default EditPage;