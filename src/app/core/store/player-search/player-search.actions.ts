import { Injectable } from '@angular/core';
import { ActionCreatorFactory } from 'ngrx-action-creator-factory';
import { Action } from '@ngrx/store';
import { IQueryParams } from './player-search.interfaces';

export enum ActionTypes {
  ADD = '[Videos] ADD',
  SET_SELECTED_VIDEO = '[Videos] SET_SELECTED_VIDEO',
  UPDATE_FILTER = '[PlayerSearch] UPDATE_FILTER',
  UPDATE_QUERY_PARAM = '[PlayerSearch] UPDATE_QUERY_PARAM',
  UPDATE_QUERY = '[PlayerSearch] UPDATE_QUERY',
  SEARCH_NEW_QUERY = '[PlayerSearch] SEARCH_NEW_QUERY',
  SEARCH_MORE_FOR_QUERY = '[PlayerSearch] SEARCH_MORE_FOR_QUERY',
  GET_SUGGESTIONS = '[PlayerSearch] GET_SUGGESTIONS',
  RESET_PAGE_TOKEN = '[PlayerSearch] RESET_PAGE_TOKEN',
  SEARCH_RESULTS_RETURNED = '[PlayerSearch] SERACH_RESULTS_RETURNED',
  SEARCH_CURRENT_QUERY = '[PlayerSearch] SEARCH_CURRENT_QUERY',
  SEARCH_STARTED = '[PlayerSearch] SEARCH_STARTED',
  SEARCH_TYPE_UPDATE = '[PlayerSearch] SEARCH_TYPE_UPDATE',
  ADD_PLAYLISTS_TO_RESULTS = '[PlayerSearch] ADD_PLAYLISTS_TO_RESULTS',
  ADD_METADATA_TO_VIDEOS = '[PlayerSearch] ADD_METADATA_TO_VIDEOS',
  PLAYLISTS_SEARCH_START = '[PlayerSearch] PLAYLISTS_SEARCH_START',
  ADD_RESULTS = '[PlayerSearch] ADD_RESULTS',
  RESET_RESULTS = '[PlayerSearch] RESET_RESULTS',
  ERROR_RESULTS = '[PlayerSearch] ERROR_RESULTS',
  UPDATE_QUERY_FILTER = '[PlayerSearch] UPDATE_QUERY_FILTER',
  SET_MAX_API_RESULTS = '[PlayerSearch] SET_MAX_API_RESULTS',
}
@Injectable()
export class PlayerSearchActions {
  static UPDATE_QUERY_PARAM = '[PlayerSearch] UPDATE_QUERY_PARAM';
  static UPDATE_QUERY = '[PlayerSearch] UPDATE_QUERY';
  static SEARCH_NEW_QUERY = '[PlayerSearch] SEARCH_NEW_QUERY';
  static SEARCH_MORE_FOR_QUERY = '[PlayerSearch] SEARCH_MORE_FOR_QUERY';
  static GET_SUGGESTIONS = '[PlayerSearch] GET_SUGGESTIONS';
  static RESET_PAGE_TOKEN = '[PlayerSearch] RESET_PAGE_TOKEN';
  static SEARCH_RESULTS_RETURNED = '[PlayerSearch] SERACH_RESULTS_RETURNED';
  static SEARCH_CURRENT_QUERY = '[PlayerSearch] SEARCH_CURRENT_QUERY';
  static SEARCH_STARTED = '[PlayerSearch] SEARCH_STARTED';
  static SEARCH_TYPE_UPDATE = '[PlayerSearch] SEARCH_TYPE_UPDATE';
  static SET_MAX_API_RESULTS = '[PlayerSearch] SET_MAX_API_RESULTS';
  static ADD_PLAYLISTS_TO_RESULTS = {
    action: '[PlayerSearch] ADD_PLAYLISTS_TO_RESULTS',
    creator: payload => ({
      payload,
      type: PlayerSearchActions.ADD_PLAYLISTS_TO_RESULTS.action
    })
  };

  static ADD_METADATA_TO_VIDEOS = {
    action: '[PlayerSearch] ADD_METADATA_TO_VIDEOS',
    creator: payload => ({
      payload,
      type: PlayerSearchActions.ADD_METADATA_TO_VIDEOS.action
    })
  };

  static PLAYLISTS_SEARCH_START = {
    action: '[PlayerSearch] PLAYLISTS_SEARCH_START',
    creator: () => ({ type: PlayerSearchActions.PLAYLISTS_SEARCH_START.action })
  };

  // Results Actions
  static ADD_RESULTS = '[PlayerSearch] ADD_RESULTS';
  static RESET_RESULTS = '[PlayerSearch] RESET_RESULTS';
  static ERROR_RESULTS = '[PlayerSearch] ERROR_RESULTS';

  getSuggestions = ActionCreatorFactory.create<string>(
    PlayerSearchActions.GET_SUGGESTIONS
  );
  searchNewQuery = ActionCreatorFactory.create<string>(
    PlayerSearchActions.SEARCH_NEW_QUERY
  );
  searchMoreForQuery = ActionCreatorFactory.create(
    PlayerSearchActions.SEARCH_MORE_FOR_QUERY
  );
  updateFilter = ActionCreatorFactory.create(ActionTypes.UPDATE_FILTER);
  updateQueryParam = ActionCreatorFactory.create<any>(
    PlayerSearchActions.UPDATE_QUERY_PARAM
  );
  resetPageToken = ActionCreatorFactory.create<any>(
    PlayerSearchActions.RESET_PAGE_TOKEN
  );
  searchResultsReturned = ActionCreatorFactory.create<any>(
    PlayerSearchActions.SEARCH_RESULTS_RETURNED
  );
  searchStarted = ActionCreatorFactory.create(
    PlayerSearchActions.SEARCH_STARTED
  );
  // addResults = ActionCreatorFactory.create(PlayerSearchActions.ADD_RESULTS);
  resetResults = ActionCreatorFactory.create(PlayerSearchActions.RESET_RESULTS);
  errorInSearch = ActionCreatorFactory.create<any>(
    PlayerSearchActions.ERROR_RESULTS
  );
}

export class UpdateQueryAction {
  public type = PlayerSearchActions.UPDATE_QUERY;
  constructor(public payload: string) { }
}

export class UpdateSearchType {
  public type = PlayerSearchActions.SEARCH_TYPE_UPDATE;
  constructor(public payload: string) { }
}

export class SearchCurrentQuery {
  public type = PlayerSearchActions.SEARCH_CURRENT_QUERY;
  constructor() { }
}

export class UpdateQueryFilter {
  public type = ActionTypes.UPDATE_QUERY_FILTER;
  constructor(public payload: { [key: string]: any }) { }
}
// export class AddResults implements Action {
//   readonly type = PlayerSearchActions.ADD_RESULTS;
//   constructor(public payload: GoogleApiYouTubeVideoResource[]) { }
// }
export class SetMaxApiResults implements Action {
  public type = ActionTypes.SET_MAX_API_RESULTS;
  constructor(public payload: number) { }
}

export const AddResultsAction = {
  type: PlayerSearchActions.ADD_RESULTS,
  creator(payload: GoogleApiYouTubeVideoResource[]) {
    return { payload, type: this.type };
  },
  handler(state, payload: GoogleApiYouTubeVideoResource[]) {
    return {
      ...state,
      results: [...state.results, ...payload],
      isSearching: false
    };
  }
};
