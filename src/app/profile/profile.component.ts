import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  title = "Profile Page Title"; 

  imageURL = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSNnXQRA1v4fRDDiE9qTJZFPOXw0UJFCKM_LA&usqp=CAU"; 

  viewCount= 0;

  name="Tousif";

  list = ["item 1", "item 2", "item 3"]; 

  user: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentUserProfile().subscribe(
      userProfile=>{
        this.user = <User>userProfile;
        console.log("Got user Profile", this.user);
      }
    )
  }

  increamentCount(){
    this.viewCount++;
  }

}
