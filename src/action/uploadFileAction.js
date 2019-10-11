export const uploadFile = 'uploadFile';
import API from '../../config';
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob'



export const uploadFileAction = (respons) => async dispatch => {

    let tokens = await AsyncStorage.getItem('userData')
    let parsed = JSON.parse(tokens);
    //console.log('path ',path)
    return RNFetchBlob.fetch('POST', 'https://devcore.prospectsmb.com/v1/attachments', {
        'X-AUTH-PROTOKEN': parsed.accessToken,
        'X-TENANT-ID': parsed.tenants === undefined ? JSON.stringify(parsed.tenant.id) : JSON.stringify(parsed.tenants[0].id)

    }, 
    [
        // element with property `filename` will be transformed into `file` in form data
        { name : 'file', filename : 'avatar.png', data: RNFetchBlob.wrap(respons.path)},]
    ).then((resp) => {
            console.log(resp)
            return dispatch({
                type: uploadFile,
                payload: resp
            })
        }).catch((err) => {
            console.log(err)
        })
}






// return API.then(api => api.post(`/attachments`,
//         JSON.stringify({
//             file:RNFetchBlob.wrap(respons)
//         })


//     )).then(resp => {
//         console.log(resp)
//         return dispatch({
//             type: uploadFile,
//             payload: resp
//         })
//     }
//     ).catch(e => { console.log('error oldu ',e) })
