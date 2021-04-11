let APIURL = '';

switch (window.location.hostname){
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:5001';
        break;
    case 'teachersaidclient.herokuapp.com':
        APIURL = 'https://teachersaidclient.herokuapp.com'
}

export default APIURL;