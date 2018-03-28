import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-fullscreen-gallery',
  templateUrl: './fullscreen-gallery.component.html',
  styleUrls: ['./fullscreen-gallery.component.css']
})
export class FullscreenGalleryComponent implements OnInit {
  @Input()
  public images: string[] = [];
  constructor(private api: ApiService) { }

  ngOnInit() {
    console.log(this.images);
  }

}
