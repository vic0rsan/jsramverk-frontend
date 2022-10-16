let apiUrl;

if (process.env.NODE_ENV === 'local') {
    apiUrl = "http://localhost:1337";
} else {
    apiUrl = "https://jsramverk-editor-gusu20.azurewebsites.net";
}

export {apiUrl};