import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { UserService } from '../../services/user.service';
import { MatTableModule } from '@angular/material/table';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { deleteUser, loadUser } from '../../Store/User.Action';
import { getUserList } from '../../Store/User.Selector';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatDialogModule, MatTableModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  readonly matDialog = inject(MatDialog);
  userService = inject(UserService);
  userList = signal<User[]>([]);
  displayedColumns: string[] = ['name', 'dob', 'email', 'phone', 'role', 'salary', 'action'];
  dataSource = this.userList();
  $userList = new Subscription();
  toaster = inject(ToastrService);
  store = inject(Store);
  
  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    // this.$userList.add(this.userService.getUsers().subscribe((users: User[]) => {
    //   this.userList.set(users);
    // }))
    this.store.dispatch(loadUser());
    this.store.select(getUserList).subscribe((user)=>{
      this.userList.set(user);
    })
  }

  addUser() {
    this.openUserPopup();
  }

  onEditUser(userId:number){
    this.openUserPopup(userId);
  }

  onDeleteUser(userId:number){
    // this.userService.Delete(userId).subscribe((response)=>{
    //   this.toaster.success("User Deleted Successfully","Delete").onHidden.subscribe(()=>{
    //     this.getAllUser();
    //   });
    // });
    this.store.dispatch(deleteUser({userId: userId}));
  }

  openUserPopup(userId?:number) {
    console.log(userId);
    
    this.matDialog.open(AddUserComponent, {
      height: '94vh',
      width: '50vw',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        'userId': userId
      }
    }).afterClosed().subscribe(()=>{
      this.getAllUser();
    });
  }

  ngOnDestroy() {
    this.$userList.unsubscribe();
  }
}
