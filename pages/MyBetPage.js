import { expect } from "@playwright/test";
import {getRandomNumber} from '../utils/testUtils';
export class MyBetPage{
    constructor(page,context){
     this.page=page;
     this.context = context;
     this.rebet= page.getByRole('button', { name: 'Rebet' })
     this.request_cashout= page.getByRole('button', { name: 'Request Cashout' })
     this.continue =  await page.getByText('Continue')
     this.cashout= page.getByText('Cashout', { exact: true })
     this.cancel= page.getByRole('button', { name: 'Cancel' })
    }
  
 async rebet(){
   await this.rebet.click();
  }
 }
