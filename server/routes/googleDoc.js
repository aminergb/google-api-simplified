import { google } from 'googleapis';
import { ENV_VARS } from '../config/importVariables.js';

const formatDoc = (content) => {
    // EXEMPLE de comment on reformate la data pour correspondre aux attendus du front
    const formatedDoc = content.map(
        (element) => {

            return {
                element: element.paragraph?.elements
            }
        }
    )

    return formatedDoc;
}
const isNotEmpty = (element) => {

    if (element.length <= 0 || element === null || element === undefined)
        return false
    return true

}
const docFile = async (req, res) => {
    try {
        const docs = google.docs({ version: 'v1', auth });
        // NB : auth est defini en global plus haut. TODO : ajouter une vérification de l'existance de la variable.
        const files = await docs.documents.get({
            documentId: req.params.id
        });
        const formattedDoc = formatDoc(files.data.body.content)
        const paragraphData = formattedDoc.filter(element => isNotEmpty(element))
        res.json(paragraphData);
    }
    catch (e) {
        res.send(e.message);
    }
}

export { docFile };
