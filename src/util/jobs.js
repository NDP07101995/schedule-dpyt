import schedule from 'node-schedule';
import logger from './logger';
import models from '../models/index';
import {
    Op
} from 'sequelize';
import {
    CRON_SCHEDULE_SEARCH_VIDEO_CHANNEL,
    CRON_SCHEDULE_SEARCH_VIDEO_PLAYLIST
} from './constant';

import {
    searchKeyWord,
    searchVideoById
} from '../services/youtubeSearchService';

import {
    insertPlaylistItem
} from '../services/youtubePlaylistService';

/**
 * 
 * @param {string} duration
 * @description get second from duration
 */
const getTime = (duration) => {
    const str = duration.match(/\d+/g, "")+'';
    if(str.indexOf(',') > -1){
        const arr = str.split(',');
        if(arr.length == 3){
            let time = parseInt(arr[0]) * 60 * 60;
            time = time + parseInt(arr[1]) * 60;
            return time + parseInt(arr[2]);
        }else if(arr.length == 2){
            let time = parseInt(arr[0]) * 60;
            return time + parseInt(arr[1]);
        }
    }
    return parseInt(str);
}

const sleep = (min, max) => {
    const ms = Math.floor(Math.random() * (max - min)) + min;
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

/**
 * @description search video from keywors add to playlist
 */
export const scheduleSearchVideoPlaylist = () => {
    schedule.scheduleJob(CRON_SCHEDULE_SEARCH_VIDEO_PLAYLIST, async () => {
        try {
           // Get all playlist channel subscribe is null
            let playlists = await models.Playlist.findAll({
                where: {
                    channel_subscribe: {
                        [Op.is]: null
                    }
                }
            });
            logger.debug(playlists);
            for (let i = 0, len = playlists.length; i < len; i++) {
                const userId = playlists[i].user_id;
                let videoCount = playlists[i].video_count;

               // Get all playlist item of playlist
                const playlistItems = await models.PlaylistItem.findAll({
                    where: {
                        user_id: userId,
                        playlist_id: playlists[i].id
                    }
                });
                logger.debug(playlistItems);

                logger.debug('line 02' + playlistItems.length);
                //max size playlist 25
                if (playlistItems.length < 25) {
                    logger.debug('line 1');
                    const dataKey = await models.DataKey.findOne({
                        where: {
                            user_id: userId,
                            primary: true
                        }
                    });
                    const channel = await models.Channel.findOne({
                        where: {
                            user_id: userId,
                            id: playlists[i].channel_id
                        }
                    });
                    const token = {
                        id: channel.id,
                        access_token: channel.access_token,
                        refresh_token: channel.refresh_token,
                        token_type: channel.token_type,
                        expires_in: channel.expires_in,
                        iat: channel.iat,
                        id_client: dataKey.id_client,
                        client_secret: dataKey.client_secret
                    }
                    logger.debug(token);

                    //search video from keywords playlist
                    const searchKeywords = await searchKeyWord(
                        dataKey.api_key,
                        playlists[i].keywords,
                        20,
                        playlists[i].gl,
                        playlists[i].hl
                    );
                    logger.debug(searchKeywords);
                    await models.Playlist.update({
                        search_video_count: searchKeywords.pageInfo.totalResults
                    },
                    {
                        where: {
                            id: playlists[i].id
                        }
                    });

                    let arrVideoId = [];
                    for(let j = 0, lenJ = searchKeywords.items.length; j < lenJ; j++){
                        arrVideoId.push(searchKeywords.items[j].id.videoId);
                    }
                    if(arrVideoId.length > 1){
                        logger.debug('line 2');
                        //list video from id -> list search keywords
                        const listVideos = await searchVideoById(dataKey.api_key, arrVideoId.join());
                
                        for(let k = 0, lenK = listVideos.items.length; k < lenK; k++){
                            logger.debug('line 3');
                            const arrFilter = playlistItems.findIndex(item => {
                                if(item.video_uid ==  listVideos.items[k].id){
                                    return true;
                                }
                                return false;
                            });
                           
                            if(arrFilter === -1){
                                

                                //Filter video
                                if(playlists[i].status_filter){
                                    logger.debug('line 4');
                                    if(playlists[i].filter_by_date){
                                        const dateRes = new Date(listVideos.items[k].snippet.publishedAt);
                                        const timeRes = dateRes.getTime();
                                        if(playlists[i].filter_by_date_status){
                                            if(playlists[i].filter_by_date.getTime() < timeRes){
                                                continue;
                                            }
                                        }else{
                                            if(playlists[i].filter_by_date.getTime() > timeRes){
                                                continue;
                                            }
                                        }
                                    }
                                    if(playlists[i].filter_by_duration){
                                        if(getTime(listVideos.items[k].contentDetails.duration) < playlists[i].filter_by_duration){
                                            continue;
                                        }
                                    }
                                    if(playlists[i].filter_by_view){
                                        if(parseInt(listVideos.items[k].statistics.viewCount) < playlists[i].filter_by_view){
                                            continue;
                                        }
                                    }
                                    if(playlists[i].filter_by_like){
                                        if(parseInt(listVideos.items[k].statistics.likeCount) < playlists[i].filter_by_like){
                                            continue;
                                        }
                                    }
                                    if(playlists[i].filter_by_dislike){
                                        if(parseInt(listVideos.items[k].statistics.dislikeCount) < playlists[i].filter_by_dislike){
                                            continue;
                                        }
                                    }

                                }
                                logger.debug('line 5');
                                await sleep(30000, 60000);
                                logger.debug('line 6');
                                const playlistItemRes = await insertPlaylistItem(
                                    token,
                                    playlists[i].uid,
                                    listVideos.items[k].id,
                                    videoCount,
                                    listVideos.items[k].snippet.title,
                                    listVideos.items[k].snippet.description
                                );
                                logger.debug(playlistItemRes);
                                const playlistItem = await models.PlaylistItem.create({
                                    uid: playlistItemRes.id,
                                    video_uid: listVideos.items[k].id,
                                    position: videoCount,
                                    title: listVideos.items[k].snippet.title,
                                    description: listVideos.items[k].snippet.description,
                                    view_count: parseInt(listVideos.items[k].statistics.viewCount),
                                    like_count: parseInt(listVideos.items[k].statistics.likeCount),
                                    dislike_count: parseInt(listVideos.items[k].statistics.dislikeCount),
                                    favorite_count: parseInt(listVideos.items[k].statistics.favoriteCount),
                                    comment_count: parseInt(listVideos.items[k].statistics.commentCount),
                                    status: 'public',
                                    user_id: userId,
                                    playlist_id: playlists[i].id,
                                    channel_id: channel.id
                                });
                                
                                logger.debug('line 6');
                                if(playlistItem.id > 0){
                                    logger.debug('line 7');
                                    videoCount++;
                                    await models.Playlist.update({
                                        video_count: videoCount
                                    },
                                    {
                                        where: {
                                            id: playlists[i].id
                                        }
                                    })
                                }

                            }

                        }

                    }
                }
            }
        } catch (error) {
            logger.debug(error);
        }
    });
}
/**
 * @description search video from channel subscribe create playlist, add video to playlist
 */
export const scheduleSearchVideoChannel = () => {
    // schedule.scheduleJob(CRON_SCHEDULE_SEARCH_VIDEO_CHANNEL, function () {
    //     const currentDate = new Date();
    //     const iatDate = new Date('2019-05-23 19:04:51');
    //     logger.debug('Channel currentDate: ' + currentDate.getTime() + ' iatDate: ' + iatDate.getTime());
    // });
}