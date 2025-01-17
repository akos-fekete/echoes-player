import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { fadeInAnimation } from '@animations/fade-in.animation';

function createIdMap(list: GoogleApiYouTubeVideoResource[]) {
  return list.reduce((acc, cur) => {
    acc[cur.id] = true;
    return acc;
  }, {});
}

@Component({
  selector: 'youtube-list',
  styleUrls: ['./youtube-list.scss'],
  animations: [fadeInAnimation],
  template: `
  <ul class="list-unstyled clearfix">
    <li class="youtube-list-item" [@fadeIn] *ngFor="let media of list">
      <youtube-media
        [media]="media"
        [queued]="media | isInQueue:queued"
        (play)="playSelectedVideo(media)"
        (queue)="queueSelectedVideo(media)"
        (queueTop)="queueSelectedVideoTop(media)"
        (unqueue)="unqueueSelectedVideo(media)"
        (add)="addVideo(media)">
      </youtube-media>
    </li>
  </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubeListComponent implements OnChanges {
  @Input() list: GoogleApiYouTubeVideoResource[] = [];
  @Input() queued: string[] = [];
  @Output() play = new EventEmitter();
  @Output() queue = new EventEmitter();
  @Output() queueTop = new EventEmitter();
  @Output() add = new EventEmitter();
  @Output() unqueue = new EventEmitter();

  queuedMediaIdMap = {};

  constructor() { }

  ngOnChanges({ queued }: SimpleChanges) {
    // if (queued && queued.currentValue) {
    //   console.log('YoutubeListComponent.createIdMap()');
    //   this.queuedMediaIdMap = createIdMap(queued.currentValue);
    // }
  }

  playSelectedVideo(media) {
    this.play.emit(media);
  }

  queueSelectedVideo(media) {
    this.queue.emit(media);
  }

  queueSelectedVideoTop(media) {
    this.queueTop.emit(media);
  }

  addVideo(media) {
    this.add.emit(media);
  }

  unqueueSelectedVideo(media) {
    this.unqueue.emit(media);
  }

  getMediaStatus(media: GoogleApiYouTubeVideoResource) {
    return {
      queued: this.queuedMediaIdMap[media.id]
    };
  }
}
