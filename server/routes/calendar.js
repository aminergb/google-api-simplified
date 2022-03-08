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
const listEvents = async (req, res) => {
    try {
        const calendar = google.calendar({ version: 'v3', auth });
        // NB : auth est defini en global plus haut. TODO : ajouter une vérification de l'existance de la variable.
        const events = await calendar.events.list({
            calendarId: 'primary',
            timeMin: (new Date()).toISOString(),
            singleEvents: true,
            orderBy: 'startTime',
        });
        const formatedEvents = formatEvents(events.data.items)
        const data = {data:formatedEvents}
        res.json(data);
    }
    catch (e) {
        res.send("error");
    }
}

export {listEvents};
