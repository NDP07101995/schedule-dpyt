const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/';
export const GOOGLE_API_REFRESH_TOKEN = 'https://www.googleapis.com/oauth2/v4/token';
export const SEARCH_YOUTUBE_API_URL = YOUTUBE_API_URL + 'search';
export const PLAYLIST_YOUTUBE_API_URL = YOUTUBE_API_URL + 'playlists';
export const PLAYLIST_ITEMS_YOUTUBE_API_URL = YOUTUBE_API_URL + 'playlistItems';
export const VIDEO_YOUTUBE_API_URL = YOUTUBE_API_URL + 'videos';

export const CRON_SCHEDULE_SEARCH_VIDEO_PLAYLIST = '*/30 * * * *';
export const CRON_SCHEDULE_SEARCH_VIDEO_CHANNEL = '*/1 * * * *';