// let apiUrl = process.env.VUE_APP_API_URL || window.config.API_URL;


class TransactionApi {

    getList() {
        var url = apiUrl + 'transactions/';
        return api.call('get', url)
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
        var url = apiUrl + 'transactions/update_response_code';
        return api.call('put', url,data)
            .then(({ data }) => {
                return data
            });

    }

}

export default TransactionApi;