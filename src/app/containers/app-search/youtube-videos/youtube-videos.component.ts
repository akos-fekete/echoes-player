import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EchoesState } from '@core/store';


// actions
import * as fromPlayerSearch from '@core/store/player-search';
import { AppPlayerApi } from '@core/api/app-player.api';

// selectors
import * as NowPlaylist from '@core/store/now-playlist';
import { AppApi } from '../../../core/api/app.api';
import { NowPlaylistService } from '../../../core/services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'youtube-videos',
  styleUrls: ['./youtube-videos.scss'],
  template: `
    <loader [message]="'Loading Awesome Media Results'" [loading]="loading$ | async"></loader>
    <youtube-list
      [list]="videos$ | async"
      [queued]="playlistIds$ | async"
      (play)="playSelectedVideo($event)"
      (queue)="queueSelectedVideo($event)"
      (queueTop)="queueSelectedVideoTop($event)"
      (unqueue)="removeVideoFromPlaylist($event)"
      (add)="addMediaToPlaylist($event)"
    ></youtube-list>
    <button class="btn btn-primary load-more-btn" (click)="searchMore()">Load more results...</button>
    <button class="btn btn-primary load-more-btn" (click)="intoQue()">Load into queue...</button>
    <input type="number" id="maxApiResults" [(ngModel)]="maxApiResults">
    <button class="btn btn-primary load-more-btn" (click)="setMaxApiResults()">Confirm max api results</button>
  `
})
export class YoutubeVideosComponent implements OnInit {
  videos$ = this.store.select(fromPlayerSearch.getPlayerSearchResults);
  playlistIds$ = this.store.select(NowPlaylist.getPlaylistMediaIds);
  loading$ = this.store.select(fromPlayerSearch.getIsSearching);
  maxApiResults: number;

  constructor(
    private nowPlaylistService: NowPlaylistService,
    private store: Store<EchoesState>,
    private appPlayerApi: AppPlayerApi,
    private appApi: AppApi,
  ) { }

  ngOnInit() {
    this.store.dispatch(
      new fromPlayerSearch.UpdateSearchType(fromPlayerSearch.CSearchTypes.VIDEO)
    );
    this.store.dispatch(new fromPlayerSearch.SearchCurrentQuery());
  }

  playSelectedVideo(media: GoogleApiYouTubeVideoResource) {
    this.appPlayerApi.playVideo(media);
  }

  queueSelectedVideo(media: GoogleApiYouTubeVideoResource) {
    this.appPlayerApi.queueVideo(media);
  }
  queueSelectedVideoTop(media: GoogleApiYouTubeVideoResource) {
    this.appPlayerApi.queueVideoTop(media);
  }

  removeVideoFromPlaylist(media: GoogleApiYouTubeVideoResource) {
    this.appPlayerApi.removeVideoFromPlaylist(media);
  }

  addMediaToPlaylist(media: GoogleApiYouTubeVideoResource) {
    this.appApi.toggleModal(true, media);
  }

  searchMore() {
    this.appApi.searchMore();
  }

  intoQue() {
    let playlist: GoogleApiYouTubeVideoResource[];
    this.videos$.pipe(first()).subscribe(next => {
      this.nowPlaylistService.queueVideos(next)
    }
    )

  }

  setMaxApiResults() {
    this.appApi.setApiSearchMax(Number(this.maxApiResults));

  }

}
