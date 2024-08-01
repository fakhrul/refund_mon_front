// let apiUrl = process.env.VUE_APP_API_URL || window.config.API_URL;


class TransactionApi {

    getList() {
        var url = apiUrl + 'transactions/';
        return api.call('get', url)
            .then(({ data }) => {
                return data
            });
    }

    get(id) {
        var url = apiUrl + 'transactions/transaction/';
        return api.call('get', url + id)
            .then(({ data }) => {
                return data
            });
    }
 
    
    getByRefNoAndVehicleNo(data) {
        var url = apiUrl + 'transactions/search';

        const queryString = new URLSearchParams(data).toString();
        const fullUrl = `${url}?${queryString}`;

        return api.call('get',fullUrl)
            .then(({ data }) => {
                return data
            });
    }

    getRespondCodeList() {
        var url = apiUrl + 'transactions/response_codes';
        return api.call('get', url)
            .then(({ data }) => {
                return data
            });
    }
    updateResponseCode(data) {
        var url = apiUrl + 'transactions/add_detail';
        return api.call('post', url, data)
            .then(({ data }) => {
                return data
            });

    }

    sendEmail(email, data){
        var url = apiUrl + 'transactions/send_email/';
        return api.call('put', url + email, data)
            .then(({ data }) => {
                return data
            });
    }

}

export default TransactionApi;