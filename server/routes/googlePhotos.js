import axios from 'axios';

const formaMedia = (medias) => {
    // EXEMPLE de comment on reformate la data pour correspondre aux attendus du front
    // TODO enlever les vidéos
    const formatedMedia = medias.map(
        (media) => {
            return {
                title: media.filename,
                media: media.baseUrl + "=w1920-h1080",
                // DOC : https://developers.google.com/photos/library/guides/access-media-items#base-urls
            }
        }
    )
    return formatedMedia;
}
const listGooglePhotos = async (req, res) => {
    try {
        const { token } = await auth.getAccessToken();
        const mediaList = await axios({
            url: 'https://photoslibrary.googleapis.com/v1/mediaItems',
            method: 'get',
            headers: { Authorization: `Bearer ${token}` }
        })
        const formatedMedia = formaMedia(mediaList.data.mediaItems)
        const data = {data:formatedMedia}
        res.json(data);
    }
    catch (e) {
        res.send("error");
    }
}

// TODO : même chose mais sur un alblum specifique. La route serait /albums/albumID
export { listGooglePhotos };
