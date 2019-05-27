import request from 'request';
import models from '../models/index';
import {GOOGLE_API_REFRESH_TOKEN} from '../util/constant';
import logger from '../util/logger';

/**
 * 
 * @param {object} token {"access_token", "refresh_token", "token_type", "expires_in", "iat", "id", "id_client", "client_secret"}
 */
export function getToken(token) {
    return new Promise((resolve, reject) => {
        const currentTime = new Date().getTime();
        const iatTime = token.iat.getTime();
        logger.debug('time current '+ currentTime);
        logger.debug('iatTime  '+ iatTime);
        if ((iatTime - 30) > currentTime) {
            return resolve(token.access_token);
        }
        request.post(GOOGLE_API_REFRESH_TOKEN, {
            form: {
                grant_type: 'refresh_token',
                client_id: token.id_client,
                client_secret: token.client_secret,
                refresh_token: token.refresh_token
            },
            json: true
        }, function (err, _, body) {
            if (err) {
                return reject(err);
            }
            models.Channel.update(
                {
                    access_token: body.access_token,
                    expires_in: body.expires_in,
                    token_type: body.token_type
                },
                {
                    where: {
                        id: token.id
                    }
                }
            )
                .then(function (rowsUpdated) {
                    logger.debug(`row update channel : ${rowsUpdated}`);
                    return resolve(body.access_token);
                })
                .catch(err => {
                    return reject(err);
                })
        })
    });
}