import axios from 'axios'
// let apiUrl = process.env.VUE_APP_API_URL || window.config.API_URL || window.config.API_URL || window.config.API_URL || window.config.API_URL;


class AuthService {
    constructor() {
        this.token = window.localStorage.getItem('token');
        let userData = window.localStorage.getItem('user');
        if (userData !== 'undefined') {
            this.user = userData ? JSON.parse(userData) : null;
            if (this.token !== null) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
                // console.log(this.token)
                axios.defaults.headers.common['api-token'] = this.token;
                
                // this.getUser();
            }
        }
        // if (this.token) {
        //     axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
        //     this.getUser();
        // }
    }

    getUser() {
        api.call('get', apiUrl + 'auth/get-user')
            .then(({ data }) => {
                this.user = data;
            });
    }

    doLogin(data) {
        // console.log(data);
        var url = apiUrl + 'auth/login';
        return api.call('post', url, data)
            .then((response) => {
                console.log(response.data);
                return response.data
            });

    }

    recordLogin(token, user) {
        // console.log(token);
        // console.log(user);
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('user', JSON.stringify(user));
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        this.token = token;
        this.user = user;
    }
    getRole() {
        return this.user.role;
    }
    getUserName(){
        return this.user.email;
    }

    getUserId(){
        return this.user.id;
    }
    logout() {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
        axios.defaults.headers.common['api-token'] = this.token;

        if (this.token) {
            api.call('post', apiUrl + 'auth/logout')
                .then(({ data }) => {
                    // EventBus.$emit('userLoggedOut');
                })
            // EventBus.$emit('userLoggedOut');
        };
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
        this.token = null;
        this.user = null;
    }

    check() {
        return !!this.token;
    }
}


// class AuthService {
//     constructor() {
//         this.token = window.localStorage.getItem('token');
//         let userData = window.localStorage.getItem('user');
//         if (userData !== 'undefined') {
//             this.user = userData ? JSON.parse(userData) : null;
//             if (this.token !== null) {
//                 axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
//                 axios.defaults.headers.common['api-token'] = this.token;
//             }
//         }
//     }

//     getUser() {
//         api.call('get', apiUrl + 'Account/get-user')
//             .then(({ data }) => {
//                 this.user = data;
//             });
//     }
//     getUserId() {
//         this.user.id;
//     }

//     doLogin(data) {
//         var url = apiUrl + 'Account/login';

//         return api.call('post', url, data)
//             .then((response) => {
//                 return response.data
//             });

//     }

//     register(data) {
//         var url = apiUrl + 'Account/Register';
//         return api.call('post', url, data)
//             .then((response) => {
//                 // console.log(response.data);
//                 return response.data
//             });

//     }

//     recordLogin(token, user) {
//         window.localStorage.setItem('token', token);
//         window.localStorage.setItem('user', JSON.stringify(user));

//         axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
//         this.token = token;
//         this.user = user;
//     }

//     isSuperAdmin() {
//         return this.user.isSuperAdmin;
//     }

  

//     logout() {
//         axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
//         if (this.token) {
//             api.call('post', apiUrl + 'Account/logout')
//                 .then(({ data }) => {
//                     // EventBus.$emit('userLoggedOut');
//                 })
//             // EventBus.$emit('userLoggedOut');
//         };
//         window.localStorage.removeItem('token');
//         window.localStorage.removeItem('user');
//         this.token = null;
//         this.user = null;

//     }

//     check() {
//         return !!this.token;
//     }


// }

export default AuthService;