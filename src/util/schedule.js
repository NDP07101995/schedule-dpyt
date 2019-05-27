import {
    scheduleSearchVideoChannel,
    scheduleSearchVideoPlaylist
} from './jobs';

export const run = () => {
    scheduleSearchVideoPlaylist();
    scheduleSearchVideoChannel();
}