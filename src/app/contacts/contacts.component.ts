import { Component, OnInit } from '@angular/core';
import {Contact} from './contact';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})


export class ContactsComponent  {

  contacts: Array<Contact>;
  constructor(){
      this.contacts = [];
  }

  addContact(name,phone){
      let contact = new Contact(name,phone);
      this.contacts.push(contact);
  }

  removeContact(contact){
      let index = this.contacts.indexOf(contact);
      this.contacts.splice(index,1);
  }

}
