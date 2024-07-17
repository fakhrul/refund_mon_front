// let apiUrl = process.env.VUE_APP_API_URL || window.config.API_URL;


class ProfileApi {

    getList() {
        var url = apiUrl + 'auth/';
        return api.call('get', url)
            .then(({ data }) => {
                return data
            });
    }

    get(id) {
        var url = apiUrl + 'auth/';
        return api.call('get', url + id)
            .then(({ data }) => {
                return data
            });
    }
    getCurrent(currentUserId) {
        var url = apiUrl + 'auth/me/';
        return api.call('get', url + currentUserId)
            .then(({ data }) => {
                return data
            });
    }
    create(data) {
        var url = apiUrl + 'auth/register';
        return api.call('post', url, data)
            .then(({ data }) => {
                return data
            });

    }
    update(data) {
        var url = apiUrl + 'auth/';
        return api.call('put', url + data.id, data)
            .then(({ data }) => {
                return data
            });
    }
    delete(id) {
        var url = apiUrl + 'auth/';
        return api.call('delete', url + id)
            .then(({ data }) => {
                return data
            });
    }

    // getProfile(id) {
    //     var url = apiUrl + 'profiles/';
    //     return api.call('get', url + id)
    //         .then(({ data }) => {
    //             return data
    //         });
    // }
 
    // createProfile(data) {
    //     var url = apiUrl + 'profiles';
    //     return api.call('post', url, data)
    //         .then(({ data }) => {
    //             return data
    //         });

    // }


    updateProfile(data) {
        var url =  apiUrl + 'auth/update_me';
        console.log(url);
        console.log(data);

        return api.call('put', url, data)
            .then(({ data }) => {
                return data
            });
    }

    // updateProfile(data) {
    //     var url = apiUrl + 'auth/update_me';
    //     console.log(url);
    //     return api.call('post', url , data)
    //         .then(({ data }) => {
    //             return data
    //         });
    // }


    // deleteProfile(id) {
    //     var url = apiUrl + 'profiles/';
    //     return api.call('delete', url + id)
    //         .then(({ data }) => {
    //             return data
    //         });
    // }

}

export default ProfileApi;