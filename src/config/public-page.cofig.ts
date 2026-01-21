class PublicPage {
  HOME = '/';
  TRENDING = '/trending';
  VIDEO_GAMES = '/video-games';
  SEARCH = '/search';
  MY_CHANNEL = '/my-channel';
  SUBSCRIPTIONS = '/subscriptions';
  HISTORY = '/history';
  LINKED_VIDEOS = '/linked-videos';
  SETTINGS = '/settings';
  FEEDBACK = '/feedback';
  VIDEO(path: string) {
    return `/v/${path}`;
  }
  CHANNEL(path: string) {
    return `/c/${path}`;
  }
}

export const PAGE = new PublicPage();
