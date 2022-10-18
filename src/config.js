let apiUrl;

if (process.env.NODE_ENV === 'local') {
    apiUrl = "https://jsramverk-editor-gusu20.azurewebsites.net/";
} else {
    apiUrl = "https://jsramverk-editor-gusu20.azurewebsites.net/";
}

export {apiUrl};