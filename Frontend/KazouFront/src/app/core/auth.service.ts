import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public gapiSetup: boolean = false;
  public authInstance: gapi.auth2.GoogleAuth;
  public error: string;
  public user: gapi.auth2.GoogleUser;
  public auth;
  profilepic: string;
  name: string;
  uid: string;
 
  constructor() { }
 
  async ngOnInit() {
    if (await this.checkIfUserAuthenticated()) {
      this.user = this.authInstance.currentUser.get();
    }
  }
 
  async initGoogleAuth(): Promise<void> {
    //  Create a new Promise where the resolve 
    // function is the callback passed to gapi.load
    const pload = new Promise((resolve) => {
      gapi.load('auth2', resolve);
    });
 
    return pload.then(async () => {
      await gapi.auth2
        .init({ client_id: '809844426896-bnr4kpesmqnvbepdtl26q7hdobvjofoc.apps.googleusercontent.com' })
        .then(auth => {
          this.gapiSetup = true;
          this.authInstance = auth;
        });
    });
  }


 
  async authenticate(): Promise<gapi.auth2.GoogleUser> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }
 
    // Resolve or reject signin Promise
    return new Promise(async () => {
      await this.authInstance.signIn().then(
        user => this.user = user,
        error => this.error = error);
        this.getProfileInformation();
    });
  }
 
  async checkIfUserAuthenticated(): Promise<boolean> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }
 
    return this.authInstance.isSignedIn.get();
  }
 
  async getAuthResponse() {
    this.auth = this.user.getAuthResponse();
    console.log(this.auth.id_token);
   }

   async signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    this.user = null;
    auth2.signOut().then(function () {
        auth2.disconnect();
    });

}

getProfileInformation(){
    var profile = this.user.getBasicProfile();
     this.user.getBasicProfile();
     this.profilepic = profile.getImageUrl();
     this.name = profile.getName();
     this.uid = profile.getId();
   }
  

}
