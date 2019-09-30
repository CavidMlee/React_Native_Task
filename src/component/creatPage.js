import React from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native';
import styles from './creatStyle.js'


const CreatPage = (props) => {
    return (
        <View >
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
                            <TouchableOpacity style={styles.buttonContent} onPress={() => props.creatButton()}  >
                                <Text style={styles.buttonText}>Creat</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}
export default CreatPage;