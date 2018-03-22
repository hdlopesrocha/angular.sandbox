import {Component, Input, OnInit} from '@angular/core';
import {Api} from '../api/api';

@Component({
  selector: 'app-fullscreen-gallery',
  templateUrl: './fullscreen-gallery.component.html',
  styleUrls: ['./fullscreen-gallery.component.css']
})
export class FullscreenGalleryComponent implements OnInit {
  @Input()
  public images: string[] = [];
  constructor(private api: Api) { }

  ngOnInit() {
    console.log(this.images);
  }

}
