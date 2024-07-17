import axios from 'axios'
class Api {
    constructor() { }
    call(requestType, url, data = null) {
        return new Promise((resolve, reject) => {
            axios[requestType](url, data)
                .then(response => {
                    resolve(response);
                })
                .catch(({ response }) => {
                    if (response == undefined) {
                        reject({
                            "data": {
                                "errorMsg": "No Network"
                            },
                        })
                    }
                    else if (response.status === 401) {
                        auth.logout();
                    }
                    else {
                        reject(response);

                    }

                });
        });
    }
}


// class Api {
//     // constructor() { }
//     constructor() {
//         this.token = window.localStorage.getItem('token');
//         let userData = window.localStorage.getItem('user');
//         if (userData !== 'undefined') {
//             this.user = userData ? JSON.parse(userData) : null;
//             if (this.token !== null) {
//                 axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
//                 //console.log('token')
//                 //console.log(this.token)
//                 axios.defaults.headers.common['api-token'] = this.token;
//             }
//         }
//         // if (this.token) {
//         //     axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
//         //     this.getUser();
//         // }
//     }

//     call(requestType, url, data = null) {
//         return new Promise((resolve, reject) => {
//             axios[requestType](url, data)
//                 .then(response => {
//                     resolve(response);

//                 })
//                 .catch((error) => {
//                     if (error.response) {
//                         error.response.data
//                          // The request was made and the server responded with a status code
//                         // that falls out of the range of 2xx
//                         console.log(error.response.data);
//                         console.log(error.response.status);
//                         console.log(error.response.headers);
//                         reject(error.response);
//                     } else if (error.request) {
//                         //alert('b');
//                         // The request was made but no response was received
//                         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//                         // http.ClientRequest in node.js
//                         console.log(error.request);
//                         reject(error.request);
//                     } else {
//                         //alert('c');
//                         // Something happened in setting up the request that triggered an Error
//                         console.log('Error', error.message);
//                         reject(error.message);
//                     }

//                     //response.data = response;
//                     //console.log(response)
//                     // console.log(response)
//                     // alert(response)
//                     // if (response.status === 401) {
//                     //     response.data = "Not Authorized";
//                     // }
//                     // else if (response.status === 404) {
//                     //     response.data = "Not Found";
//                     // }
//                     // else
//                     // {
//                     //     response.data = "Communication Error";
//                     // }
//                     //reject(error.response);
//                 });
//         });
//     }
// }

export default Api;