import axios from 'axios';
import appconfig from '../config/app.config.json';

const Supplier_Api = {
    getAll : async() => {
        let token = localStorage.getItem(appconfig.secure_key.token);
        let option = {
            url: appconfig.base_url + appconfig.endpoints.supplier,
            method: 'GET',
            headers: {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            }
        };

        console.log('Supplier : Axios User');

        try {
            let result = await axios(option);
            console.log(result);
            return result.data;
        } catch (error) {
            return error.response.data;
        }
    },

    insertNew : async(formdata) => {
        let token = localStorage.getItem(appconfig.secure_key.token);
        let option = {
            url: appconfig.base_url + appconfig.endpoints.supplier,
            method: 'POST',
            headers: {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            },
            data: {
                CompanyName    : formdata.CompanyName,
                ContactName    : formdata.ContactName,
                ContactEmail   : formdata.ContactEmail,
                ContactTitle   : formdata.ContactTitle,
                Address        : formdata.Address,
                City           : formdata.City,
                PostalCode     : formdata.PostalCode,
                Country        : formdata.Country,
                Phone          : formdata.Phone,
                Fax            : formdata.Fax
            }
        };

        try {
            let result = await axios(option);
            console.log(result);
            return result.data;
        } catch (error) {
            return error.response.data;
        }
    },

    UpdateData : async(formdata) => {
        let token = localStorage.getItem(appconfig.secure_key.token);
        let option = {
            url: appconfig.base_url + appconfig.endpoints.supplier + formdata._id,
            method: 'PUT',
            headers: {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            },
            data: {
                CompanyName    : formdata.CompanyName,
                ContactName    : formdata.ContactName,
                ContactEmail   : formdata.ContactEmail,
                ContactTitle   : formdata.ContactTitle,
                Address        : formdata.Address,
                City           : formdata.City,
                PostalCode     : formdata.PostalCode,
                Country        : formdata.Country,
                Phone          : formdata.Phone,
                Fax            : formdata.Fax
            }
        };

        try {
            let result = await axios(option);
            console.log(result);
            return result.data;
        } catch(error) {
            return error.response.data;
        }
    },

    deleteData : async(_id) => {
        let token = localStorage.getItem(appconfig.secure_key.token);
        let option = {
            url: appconfig.base_url + appconfig.endpoints.supplier + _id,
            method: 'DELETE',
            headers: {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            }
        };

        try {
            let result = await axios(option);
            console.log(result);
            return result.data;
        } catch(error) {
            return error.response.data;
        }
    }
};

export default Supplier_Api;