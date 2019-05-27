import request from 'request';

import {
    SEARCH_YOUTUBE_API_URL,
    VIDEO_YOUTUBE_API_URL
} from '../util/constant';

/**
 * 
 * @param {string} key 
 * @param {string} q 
 * @param {number} maxResult 
 * @param {string} regionCode 
 * @param {string} relevanceLanguage 
 * @param {string} orderBy 
 * @param {string} type 
 */
export const searchKeyWord = (key, q, maxResult = 20, regionCode = 'VN', relevanceLanguage = 'vi', orderBy = 'viewCount', type = 'video') => {
    return new Promise((resolve, reject) => {
        let query = {};
        query.part = 'snippet';
        query.q = q;
        query.maxResults = maxResult;
        query.regionCode = regionCode;
        query.relevanceLanguage = relevanceLanguage;
        query.order = orderBy;
        query.type = type;
        query.key = key;
        request({
            uri: SEARCH_YOUTUBE_API_URL,
            method: 'GET',
            qs: query,
            headers: {
                'Accept': 'application/json'
            },
            json: true
        }, function (err, _, body) {
            if (err) {
                reject(err);
            }
            resolve(body);
        });
    });
}
/**
 * 
 * @param {string} key 
 * @param {string} channelId 
 * @param {string} pageToken 
 * @param {number} maxResult 
 * @param {string} orderBy 
 * @param {string} type 
 */
export const searchByChannel = (key, channelId, pageToken = null, maxResult = 25, orderBy = 'date', type = 'video') => {
    return new Promise((resolve, reject) => {
        let query = {};
        query.part = 'snippet';
        query.channelId = channelId;
        query.maxResults = maxResult;
        query.order = orderBy;
        query.type = type;
        query.key = key;
        if (!(pageToken == null)) {
            query.pageToken = pageToken;
        }
        request({
            uri: SEARCH_YOUTUBE_API_URL,
            method: 'GET',
            qs: query,
            headers: {
                'Accept': 'application/json'
            },
            json: true
        }, function (err, _, body) {
            if (err) {
                reject(err);
            }
            resolve(body);
        });
    });
}
/**
 * 
 * @param {string} key 
 * @param {string} id 
 */
export const searchVideoById = (key, id) => {
    return new Promise((resolve, reject) => {
        let query = {};
        query.part = 'snippet,contentDetails,statistics';
        query.id = id;
        query.key = key;
        request({
            uri: VIDEO_YOUTUBE_API_URL,
            method: 'GET',
            qs: query,
            headers: {
                'Accept': 'application/json'
            },
            json: true
        }, function (err, _, body) {
            if (err) {
                reject(err);
            }
            resolve(body);
        });
    });
}