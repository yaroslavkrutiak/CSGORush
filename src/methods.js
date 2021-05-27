import Block from './classes.js'

export async function getResponse(api_url) {   // { getData: fn, response: promise }
    try {

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
        headers.append('Access-Control-Allow-Credentials', 'true');

        const response = await fetch(api_url,{headers:headers});
        if (response.status >= 200 && response.status <= 299) {
            if (response.status !== 204)
                return async function getData() {   // {     }
                    return await response.json();
                };
            throw new Error('204 No Content');
        }
    } catch (error) {
        console.error(error);
        executeError(error);
    }
    throw new Error('Such things happen. Contact admin :)');
}

export default function setContent(url){
    getResponse(url)
        .then(json => {
            json().then(content => {
                const block = new Block(content);
                return block.postContent();
            }).catch(e =>{ throw new Error(e) });
        })
        .catch(e => executeError(e));
}

export function executeError(msg) {
    const body = document.getElementsByTagName('body')[0];
    body.innerHTML = null;
    body.innerHTML += `<li style="font-weight: 300;top: 50px">${msg}</li>`;
    console.error(msg);
}