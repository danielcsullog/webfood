import { Component, OnInit } from '@angular/core';
import { User } from '../core/user';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.scss']
})
export class ProfileEditorComponent implements OnInit {

  user?: User;

  constructor() { }

  ngOnInit(): void {
  }

}
