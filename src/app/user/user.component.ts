import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {User} from './user';
import {UserService} from './user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  displayedColumns = ['id', 'username'];
  dataSource = new MatTableDataSource<User>();
  constructor(private router: Router, private userService: UserService) {
  }
  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      data => {
        this.dataSource.data = data;
      }
    );
  }
}