import { ENV_VARS } from "../config/importVariables.js";

export const credentials = {
    "installed": {
        "client_id": ENV_VARS.client_id,
        "project_id": ENV_VARS.project_id, "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": ENV_VARS.token_uri, "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_secret": ENV_VARS.client_secret, "redirect_uris": ["urn:ietf:wg:oauth:2.0:oob", "http://localhost"]
    }
}
