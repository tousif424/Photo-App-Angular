import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInVisible = true; 
  email:string;
  password:string;
  name: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  signInFromVisible(){
    this.signInVisible = true;
  }

  signUpFromVisible(){
    this.signInVisible = false;
  }

  login(){

    console.log("user tried to login");
    this.userService.login(this.email,this.password);
    this.email="";
    this.password="";

  }

  signup(){
    console.log("user tried to signup");
    this.userService.signup(this.email,this.password, this.name);
    this.email="";
    this.password="";
  }

}
