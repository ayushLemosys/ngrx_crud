import { CommonModule } from '@angular/common';
import { Component, Inject, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { addUser, getUserDetail, updateUser } from '../../Store/User.Action';
import { getUser } from '../../Store/User.Selector';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatSelectModule, MatInputModule, ReactiveFormsModule, CommonModule, MatDatepickerModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  title = signal("Add User");
  // userService = inject(UserService);
  store = inject(Store);
  dialogRef = inject(MatDialogRef<AddUserComponent>);
  toaster = inject(ToastrService);
  dialogData: any;
  userForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    dob: new FormControl(new Date, Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    salary: new FormControl(0, Validators.required)
  })

  constructor(@Inject(MAT_DIALOG_DATA) data: User) {
    this.dialogData = data;
  }

  ngOnInit() {
    if (this.dialogData.userId) {
      this.title.set("Edit User");
      this.store.dispatch(getUserDetail({ userId: this.dialogData.userId }));
      this.store.select(getUser).subscribe((user) => {
        this.userForm.patchValue({
          id: user.id,
          name: user.name,
          dob: user.dob,
          email: user.email,
          phone: user.phone,
          role: user.role,
          salary: user.salary
        })
      })
    }
  }

  addUser() {
    console.log(this.userForm.value);
    if (this.userForm.invalid) {
      return;
    }
    const userFormat: User = {
      id: this.userForm.value.id as number,
      name: this.userForm.value.name as string,
      dob: new Date(this.userForm.value.dob as Date),
      email: this.userForm.value.email as string,
      phone: this.userForm.value.phone as string,
      role: this.userForm.value.role as string,
      salary: this.userForm.value.salary as number
    }
    // this.userService.addUser(userFormat).subscribe((response) => {
    //   console.log(response, "User Added Successfully");
    //   this.toaster.success("User Added Successfully","User Added").onShown.subscribe(() => {
    //     this.closePopup();
    //   });
    // })
    this.store.dispatch(addUser({ user: userFormat }));
    this.closePopup();
  }

  edituser() {
    if (this.userForm.invalid) {
      return;
    }
    const userFormat: User = {
      id: this.userForm.value.id as number,
      name: this.userForm.value.name as string,
      dob: new Date(this.userForm.value.dob as Date),
      email: this.userForm.value.email as string,
      phone: this.userForm.value.phone as string,
      role: this.userForm.value.role as string,
      salary: this.userForm.value.salary as number
    }
    // this.userService.updateUser(userFormat,this.dialogData.userId).subscribe((response) => {
    //   this.toaster.success("User Updated Successfully","Update User").onShown.subscribe(() => {
    //     this.closePopup();
    //   });
    // })
    this.store.dispatch(updateUser({ user: userFormat, userId: this.dialogData.userId }));
    this.closePopup();
  }

  closePopup() {
    this.dialogRef.close();
  }
}
