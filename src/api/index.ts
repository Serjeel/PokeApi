import axios from 'axios';
import Cookies from 'js-cookie';

type Methods = "head" | "options" | "put" | "post" | "patch" | "delete" | "get";

async function makeRequest(requestType: Methods, requestUrl: any, requestData?: any) {
    let data = {};
    if (requestData) {
        await axios[requestType](requestUrl, requestData, {
            headers: {
                Authorization: Cookies.get("token")
            }
        }).then((res: any) => { data = res.data }).catch((err: any) => { });
    } else {
        await axios[requestType](requestUrl, {
            headers: {
                Authorization: Cookies.get("token")
            }
        }).then((res: any) => { data = res.data }).catch((err: any) => { });
    }

    return data;
}

export async function getAuthentification(inputsContent: any) {
    return makeRequest('post', 'http://localhost:8000/user/login', {
        username: inputsContent.logUsername.toLowerCase(),
        password: inputsContent.logPassword
    })
}

export async function getRegistration(inputsContent: any) {
    return makeRequest('post', 'http://localhost:8000/user/register', {
        username: inputsContent.regUsername.toLowerCase(),
        password: inputsContent.regPassword
    })
}

export async function getAuthorization() {
    return makeRequest('get', 'http://localhost:8000/user/protect')
}

export async function getChangeFavorites(pokemon: any) {
    return makeRequest('post', 'http://localhost:8000/user/changeFavorites', {
        pokemon
    })
}

export async function getAllPoks() {
    return makeRequest('get', 'https://pokeapi.co/api/v2/pokemon?limit=100')
}