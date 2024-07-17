
class Helper {
    constructor() {

    }

    getErrorMessage(data) {
        console.log("getErrorMessage",data)
        var errorMessage = "";
        if (data.responseException.exceptionMessage.title) {
            errorMessage = data.responseException.exceptionMessage.title;
            if (errorMessage == "One or more validation errors occurred.") {
                const myJSON = JSON.stringify(data.responseException.exceptionMessage.errors);
                errorMessage += "\n\n";
                errorMessage += myJSON;
            }
        } else {
            errorMessage = data.responseException.exceptionMessage;
        }
        return errorMessage;
    }

}

export default Helper;