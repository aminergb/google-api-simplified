import { google } from 'googleapis';
import axios from 'axios';
import getAuth from './auth.js';

const example = async () => {

    // On commence par verifier l'autorisation
    const auth = await getAuth();
    
    // Si c'est pas bon, tant pis
    if (auth === null) {
        console.log("PAS D'AUTORISATION, SORRY");
        return;
    }

    // Pour agenda c'est facile : l'api est géré directement
    const calendar = google.calendar({ version: 'v3', auth });
    const events = await calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
    });
    // console.log(events.data);

    // Pour photo (non géré en natif), j'ai essayé avec un package npm mais ça ne marcahit pas bien
    // => On passe directement par axios
    const {token} = await auth.getAccessToken();
    const mediaList = await axios({
        url: 'https://photoslibrary.googleapis.com/v1/mediaItems',
        method: 'get',
        headers: { Authorization: `Bearer ${token}` }
    })
    console.log(mediaList.data)
}


example()