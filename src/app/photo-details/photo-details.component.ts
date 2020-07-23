import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo.service';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../Photo';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {


  photoId: string; 
  photo: Photo;
  allComments: Comment[];
  albumId: string;


  
  constructor(private photoService: PhotoService, private route: ActivatedRoute, private albumService: AlbumService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params=>{
        this.photoId= params.get("photoId");
        console.log("Got photo Id: ", this.photoId); 
        this.loadPhoto(this.photoId);
        this.loadComments(this.photoId);
      }
    ) 
    
  }

  loadPhoto(photoId: string){
    this.photoService.getPhoto(photoId)
    .subscribe(
      photo=>{
        this.photo = <Photo>photo;
        console.log("Loaded Photo details: ", this.photo);
        this.albumId = this.photo.albumId;  
      }
    )
  }

  loadComments(photoId: string){
    this.photoService.getComments(photoId)
    .subscribe(
      comments=>{
        this.allComments = (<Comment[]>comments).reverse();
        console.log("Loaded Photo comments: ", this.allComments);
        
        
      }
    )
  }

  makeProfilePhoto(){
    this.photoService.makeProfilePhoto(this.photo.photoUrl)
      .subscribe(
        response=>{
          console.log("Profile photo updated", response);
        }
      )
  }

  makeAlbumCoverPhoto(){
    this.albumService.makeAlbumCoverPhoto(this.photo.photoUrl, this.photo.albumId)
      .subscribe(
        response=>{
          console.log("Album Cover photo updated", response);
        }
      )
  }

}
