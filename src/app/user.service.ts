import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { promise } from 'protractor';
import { Router, CanActivate } from '@angular/router';
import { User } from './User';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate {

  user: Observable<firebase.User>;
  defaultProfilePhoto: string ="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSNnXQRA1v4fRDDiE9qTJZFPOXw0UJFCKM_LA&usqp=CAU"; 
  

  constructor(private firebaseAuth: AngularFireAuth, private router: Router, private http: HttpClient) {
    this.user = firebaseAuth.authState;

    
    console.log("User Id Token at the construction of the service.", localStorage.getItem("userIdToken"));


    this.user.subscribe(
      userInfo=> {
        console.log("User Info is available", userInfo);
        this.saveIdToken(userInfo);
    }
    );
  }

  canActivate(): boolean{
    if(this.firebaseAuth.auth.currentUser != null){
      return true;
    }
    this.router.navigate(["login"]);
    return false; 
  }
 

  saveIdToken(firebaseUser: firebase.User){
    firebaseUser.getIdToken().then(
      idTokenValue=> {
        localStorage.setItem("userIdToken", idTokenValue);
        console.log("Id Token value: ", localStorage.getItem("userIdToken"));
    });
  }

  

  signup(email: string, password: string, name: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success signup!', value);
        this.saveIdToken(value.user);
        this.registerUser(email,name); 
         
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });    
  }

  registerUser(email:string, name: string){
    var user: User ={
      emailAddress: email,
      id:"",
      name:name,
      profilePhotoUrl: this.defaultProfilePhoto, 
    }

    this.http.post(environment.API_BASE_URL+"users/register", user).subscribe(
      response=>{
        console.log('Success registration!');
        this.router.navigate(["albums/recent"]);
      }
    ); 
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
        this.saveIdToken(value.user);
        this.router.navigate(["albums/recent"]);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }

  logout() {
    this.firebaseAuth.auth.signOut();
    localStorage.clear();
    this.router.navigate(["login"]);
  }

  getCurrentUserProfile(){
    var headers= this.getHeaders();
    return this.http.get(environment.API_BASE_URL+"users/me", {headers});
  }

  getHeaders(){
    var headers = {
      "idToken": localStorage.getItem("userIdToken")
    };
    return headers;
  }
  

}
