let APIURL = '';

switch (window.location.hostname){
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:5001';
        break;
    case 'teachersaidclient.herokuapp.com':
        APIURL = 'https://ck-teachers-aid-server.herokuapp.com'
}

export default APIURL;