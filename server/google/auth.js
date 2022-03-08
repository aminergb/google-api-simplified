// @ts-nocheck
import { google } from 'googleapis';
import fs from 'fs/promises';
import readline from 'readline';
import { dirname } from 'path';         // Support de __dirname dans un module
import { fileURLToPath } from 'url';    // Support de __dirname dans un module
import { credentials } from './credentials.js';

const __dirname = dirname(fileURLToPath(import.meta.url)); // Support de __dirname dans un module

const TOKEN_PATH = `${__dirname}\\token.json`;

const SCOPES = [
    'https://www.googleapis.com/auth/calendar.readonly',
    'https://www.googleapis.com/auth/photoslibrary.readonly',
    'https://www.googleapis.com/auth/drive.metadata.readonly',
    'https://www.googleapis.com/auth/documents.readonly'
];

/**
 * 
 * @param {*} oAuth2Client 
 * @returns token ou null
 * 
 * getAccessToken lance un processus de validation de création de token auprès de google.
 * En cas de succès un token est revnoyé. Sinon une valeur nulle.
 */
const getAccessToken = async (oAuth2Client) => {
    const authUrl = await oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const code = await new Promise(resolve => { rl.question('Enter the code from that page here: ', resolve) });
    rl.close();
    try {
        const { tokens } = await oAuth2Client.getToken(code);
        return tokens;
    }
    catch {
        console.log("MAUVAIS CODE");
        return null;
    }
}

/**
 * 
 * @returns auth
 * 
 * getAuth renvoie une autorisation google, basé sur un token.
 * SI le token n'est pas mémorisé, on tente d'en créer un avec getAccessToken.
 * 
 * EN cas d'échec on revoie la valeur null.
 */
const getAuth = async () => {
    // 1) On récupére le credentials
    const { client_secret, client_id, redirect_uris } = credentials.installed;

    // 2) On crée une autorisation.
    const auth = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    // 3) On regarde si un token est mémorisé.
    let token = null;
    try {
        const blobToken = await fs.readFile(TOKEN_PATH);
        token = JSON.parse(blobToken);
    }
    catch (e) {
        // Pas de token : on va essayer d'en répérer un.
        token = await getAccessToken(auth);
        //  Si ça n'a pas marché on laisse tomber
        if (token === null) return null;
        // Sinon on le sauve
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) return console.error(err);
            console.log('Token stored to', TOKEN_PATH); // TODO : passer en try et await comme le reste du code
        });
    }
    // 4) Derniere verif au cas où....
    if (token === null) return null;

    // 5) Logiquement on a un token. On va l'utiliser
    await auth.setCredentials(token);
    // 6) Et on renvoie l'auth
    return auth;
}

export default getAuth;

/// DOC : https://github.com/googleapis/google-api-nodejs-client#oauth2-client