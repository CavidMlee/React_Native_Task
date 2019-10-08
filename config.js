//export const API = "https://devcore.prospectsmb.com/v1";

import axios from 'axios';
//import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default instance = new Promise(async (resolve, reject) => {

    let tokens = await AsyncStorage.getItem('userData')
    let parsed = JSON.parse(tokens);

    if (parsed != null) {
        resolve(
            axios.create({
                baseURL: "https://devcore.prospectsmb.com/v1",
                headers: {
                    'Content-Type': 'application/json',
                    'X-AUTH-PROTOKEN': parsed.accessToken,
                    'X-TENANT-ID': parsed.tenants === undefined ? JSON.stringify(parsed.tenant.id) : JSON.stringify(parsed.tenants[0].id)

                }
            })
        )
    }
    else {
        resolve(
            axios.create({
                baseURL: "https://devcore.prospectsmb.com/v1",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        )
    }
})

