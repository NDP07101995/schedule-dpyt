import { getToken } from './youtubeService';
import request from 'request';
import {
    PLAYLIST_YOUTUBE_API_URL,
    PLAYLIST_ITEMS_YOUTUBE_API_URL
} from '../util/constant';

/**
 * 
 * @param {object} token 
 * @param {string} title 
 * @param {string} hl 
 * @param {string} description 
 * @param {string[]} tags 
 */
export const insertPlaylist = (token, title, hl, description, tags) => {
    return new Promise( async(resolve, reject) => {
        try {
            const accessToken = await getToken(token);
            let data = {};
            let snippet = {};
            snippet.title = title;
            snippet.defaultLanguage = hl;
            if(description){
                snippet.description = description;
            }
            if(tags){
                snippet.tags = tags;
            }
            data.snippet = snippet;
            data.status = 'public';
            request({
                uri: PLAYLIST_YOUTUBE_API_URL,
                method: 'POST',
                qs: {
                    part: 'snippet,status'
                },
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${token.token_type} ${accessToken}`
                },
                body: data,
                json: true
            }, function (err, _, body) {
                if(err){
                    reject(err);
                }
                resolve(body);
            });
        } catch (err) {
            reject(err);
        }

    });
}

/**
 * 
 * @param {object} token 
 * @param {string} playlistId 
 * @param {string} videoId 
 * @param {number} position 
 * @param {string} title 
 * @param {string} description 
 */
export const insertPlaylistItem = (token, playlistId, videoId, position, title, description) => {
    return new Promise(async (resolve, reject) => {
        try {
            const accessToken = await getToken(token);
            let data = {};
            let snippet = {};
            let resourceId = {};
            resourceId.videoId = videoId;
            resourceId.kind = 'youtube#video';

            snippet.playlistId = playlistId;
            snippet.resourceId = resourceId;
            snippet.position= position;
            if(title){
                snippet.title = title;
            }
            if(description){
                snippet.description = description;
            }
            data.snippet = snippet;
            request({
                uri: PLAYLIST_ITEMS_YOUTUBE_API_URL,
                method: 'POST',
                qs: {
                    part: 'snippet'
                },
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `${token.token_type} ${accessToken}`
                },
                body: data,
                json: true
            }, function (err, _, body) {
                if(err){
                    reject(err);
                }
                resolve(body);
            });
        } catch (err) {
            reject(err);
        }
    });
}

