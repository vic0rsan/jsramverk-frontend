let apiUrl;

if (process.env.NODE_ENV === 'local') {
    apiUrl = "http://localhost:1337";
} else {
    apiUrl = "http://localhost:1337";
}

export {apiUrl};