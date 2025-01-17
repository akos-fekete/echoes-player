import { videoTypes } from './../store/player-search/player-search.interfaces';
import { Injectable } from '@angular/core';
import { YoutubeDataApi, DataApiProviders } from './youtube-data-api';
import { exhaustMap } from 'rxjs/operators';
import { IQueryParams } from '../store/player-search';
import { env } from 'process';
import { environment } from '@env/environment';

export const SearchTypes = {
  VIDEO: 'video',
  PLAYLIST: 'playlist',
  CHANNEL: 'channel'
};

export const SearchParams = {
  Types: {
    [SearchTypes.VIDEO]: 'video',
    [SearchTypes.PLAYLIST]: 'playlist',
    [SearchTypes.CHANNEL]: 'channel'
  }
};
const createApiOptions = () => ({
  part: 'snippet,id',
  q: '',
  type: 'video',
});
@Injectable()
export class YoutubeSearch {
  private _api = DataApiProviders.SEARCH;
  private _apiOptions: any = createApiOptions();

  constructor(private youtubeDataApi: YoutubeDataApi) { }

  /**
   * search for video
   * @param query {string}
   * @param params {key/value object}
   */
  search(query: string, { preset }: any | IQueryParams = {}) {
    if (query || '' === query) {
      //itt hívódik meg a list
      // TODO: assign defaults here as migration
      // REMOVE next version
      this._apiOptions.q = `${query} ${preset}`.trim();
    }
    return this.youtubeDataApi.list(this._api, this._apiOptions);
  }

  /**
   * resolves which type to search for
   * @param type any type of SearchTypes
   * @param query any string
   * @param params params of api
   */
  searchFor(type: string, query: string, params?: any | IQueryParams) {
    switch (type) {
      case SearchTypes.VIDEO: {
        // const {
        //   videoType = 'any',
        //   videoDuration = 'any',
        //   videoDefinition = 'any'
        // } = params;  --bizarr szintax

        const videoType = params.videoType ?? "any";
        const videoDuration = params.videoDuration ?? "any";
        const videoDefinition = params.videoDefinition ?? "any";
        const maxApiResult = params.maxApiResult ?? environment.youtube.TOTAL_API_RESULTS;


        this._apiOptions = {
          ...this._apiOptions,
          videoType,
          videoDuration,
          videoDefinition,
          maxResults: maxApiResult

          //ide kellhet bearakni a total api results maxot
        };
        return this.searchVideo(query, params);
      }

      case SearchTypes.PLAYLIST: {
        delete this._apiOptions.videoType;
        delete this._apiOptions.videoDuration;
        delete this._apiOptions.videoDefinition;
        return this.searchForPlaylist(query, params);
      }
    }
  }
  /**
   * search for video
   * @param query {string}
   * @param params {key/value object}
   */
  searchVideo(query: string, params?: any) {
    this._apiOptions.type = SearchParams.Types[SearchTypes.VIDEO];
    return this.search(query, params);
  }

  /**
   * search for playlist
   * @param query {string}
   * @param params {key/value object}
   */
  searchForPlaylist(query: string, { preset }) {
    this._apiOptions.type = SearchParams.Types[SearchTypes.PLAYLIST];
    return this.search(query, { preset }).pipe(
      exhaustMap(({ items }: { items: GoogleApiYouTubeSearchResource[] }) => {
        const options = {
          part: 'snippet,id,contentDetails',
          id: items.map(pl => pl.id.playlistId).join(',')
        };
        return this.youtubeDataApi.list(DataApiProviders.PLAYLISTS, options);
      })
    );
  }

  searchMore(nextPageToken: string) {
    this._apiOptions.pageToken = nextPageToken;
    return this;
  }

  resetPageToken() {
    delete this._apiOptions.pageToken;
    return this;
  }
}
