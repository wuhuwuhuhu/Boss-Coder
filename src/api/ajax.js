/*
use ajax request function encapsulated by axios
retuan promise object
*/

import axios from 'axios'

export default function ajax(url = '', data = {}, type = 'GET') {
    if (type === 'GET') {
        // contact request parameters
        // exapmple:
        // data: {username: Tom, password: 123456}
        // dataStr: ?username=To&password=123456
        let dataStr = ''
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&'
        })
        if(dataStr !== '') {
            dataStr.substring(0, dataStr.length - 1)
        }
        
        return axios.get(url + '?' + dataStr)
    }
    else {
        return axios.post(url, data)
    }
}