
export class LoginPage{
  
   constructor(page){
    this.page=page;
    this.usename_text_box= page.getByLabel('Username');
    this.password_text_box= page.getByLabel('Password');
    this.login_button= page.getByRole("button",{name:"login"})
   }
   enterName(){

   }
   enterPassword(){

   }
clickLogin(){

}
async login(username,password){
   await  this.usename_text_box.fill(username);
   await this.password_text_box.fill(password);
   await this.login_button.click();
}



}
