
const clientId = 'YOUR_CLIENT_ID';
const redirectUri = 'YOUR_REDIRECT_URI';

function PKCE(length){
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~._-';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function getBase64_SHA(text){
    const encode = new TextEncoder().encode(text);
    let sha = await window.crypto.subtle.digest("SHA-256", encode);
    let base64 = btoa(String.fromCharCode.apply(null, [...new Uint8Array(sha)]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
    return base64
}

async function getAuthToken(){

    let codeVerifier = PKCE(128);

    getBase64_SHA(codeVerifier).then(codeChallenge => {
        let state = PKCE(16);
        let scope = 'user-read-private user-read-email';

        localStorage.setItem('code_verifier', codeVerifier);
        
        let args = new URLSearchParams({
            response_type: 'code',
            client_id: clientId,
            scope: scope,
            redirect_uri: redirectUri,
            state: state,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge
    });

    window.location = 'https://accounts.spotify.com/authorize?' + args;
    });
    
}

function getAuth(code) {
    let codeVerifier = localStorage.getItem('code_verifier');

    let body = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        client_id: clientId,
        code_verifier: codeVerifier
    })
    return body;
}

function access(){
    const code = document.getElementById('token').innerText;
    let body = getAuth(code);
    const response = fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    })
    .then(response => {
        if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        localStorage.setItem('access_token', data.access_token);
        window.location = "http://127.0.0.1:8888/profile";
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

async function manager(){
    localStorage.clear();
    getAuthToken();
}
