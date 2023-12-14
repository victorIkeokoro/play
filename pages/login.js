
export class LoginPage {

    constructor(page) {
        this.page = page;
        this.usename_text_box = page.locator('input[type="text"]');
        this.password_text_box = page.locator('input[type="password"]');
        this.login_button = page.getByRole("button", { name: "login" });
        this.login_link = page.getByRole('link', { name: 'Login' });
        this.register_link = page.getByRole('link', { name: 'Don\'t have an account?' });
    }
    async enterName(name) {
        await this.usename_text_box.fill(name)
    }
    async enterPassword(pwd) {
        await this.password_text_box.fill(pwd)
    }
    async clickLoginLink() {
        await this.login_link.click();
    }
    async clickRegisterLink() {
        await this.register_link.click();
    }
    async login(username, password) {
        await this.usename_text_box.type(username, { delay: 100 });
        await this.usename_text_box.clear();
        await this.usename_text_box.type(username, { delay: 100 });
        await this.password_text_box.clear();
        await this.password_text_box.type(password, { delay: 100 });
        await this.login_button.click();
    }



}
