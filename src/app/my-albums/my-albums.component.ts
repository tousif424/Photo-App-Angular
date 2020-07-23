import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';
import { Album } from '../Album';

@Component({
  selector: 'app-my-albums',
  templateUrl: './my-albums.component.html',
  styleUrls: ['./my-albums.component.css']
})
export class MyAlbumsComponent implements OnInit {

  constructor(private albumService: AlbumService) { }

  albums: Album[]; 

  ngOnInit(): void {
    console.log("Calling albumService from component");
    this.albumService.getMyAlbums().subscribe(
      response=> {
        this.albums = <Album[]>response; 
        console.log("Got My Album response", this.albums);
      }
    )
  }

}