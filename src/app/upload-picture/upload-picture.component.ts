import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.css']
})
export class UploadPictureComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  albumId : string; 

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params=>{
        this.albumId = params.get("albumId");
        console.log("Got Album Id in Upload picture component: ", params); 
      }
    )
  }

}
