import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient) { }

  makeAlbumCoverPhoto(photoUrl: string, albumId: string){
    var headers= this.getHeaders();
    var params = new HttpParams().set("photoUrl", photoUrl).set("id",albumId);
    return this.http.put(environment.API_BASE_URL+"albums/coverPhoto", params, {headers});
  }

  getMyAlbums(){
    var headers= this.getHeaders();
    console.log("Calling getMyAlbums method with header", headers);
    return this.http.get(environment.API_BASE_URL+"albums", {headers});
  }

  getAllAlbums(){
    var headers= this.getHeaders();
    console.log("Calling getAlbums method with header", headers);
    return this.http.get(environment.API_BASE_URL+"albums/all", {headers});
  }

  getPhotos(albumId: string){
    var headers= this.getHeaders();
    return this.http.get(environment.API_BASE_URL+"albums/"+ albumId +"/photos", {headers});
  }

  getHeaders(){
    var headers = {
      "idToken": localStorage.getItem("userIdToken")
    };
    return headers;
  }

}
