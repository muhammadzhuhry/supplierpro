import axios from 'axios';
import appconfig from '../config/app.config.json';

const User_Api = {
    login : async(username, password) => {
        let option = {
            url: appconfig.base_url + appconfig.endpoints.login,
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            // data ini bagian yang harus sama dengan backend
            data: {
                UserName: username,
                Password: password
            }
        }

        console.log('Login : Axios User');
        console.log('Username : ' + username + ', Password : ' + password);
    
        try {
            let result = await axios(option);
            console.log(result);
            return result.data;
        } catch(error) {
            return error.response.data;
        }
    }
};

export default User_Api;