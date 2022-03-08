import { google } from 'googleapis';

const formatEvents = (events) => {
    // EXEMPLE de comment on reformate la data pour correspondre aux attendus du front
    const formatedEvents = events.map(
        (event) => {
            return {
                title: event.summary,
                date: event.start?.dateTime,
                description: event.description
            }
        }
    )
    return formatedEvents;
}
const listFiles = async (req, res) => {
    try {
        const drive= google.drive({ version: 'v3', auth });
        // NB : auth est defini en global plus haut. TODO : ajouter une vérification de l'existance de la variable.
        const files = await drive.files.list({
            pageSize:10,
            fields: 'nextPageToken, files(id, name)',
        });
        
        res.json(files);
    }
    catch (e) {
        res.send(e.message);
    }
}

export {listFiles};
