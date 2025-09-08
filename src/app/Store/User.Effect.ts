import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../services/user.service";
import { addUser, addUserSuccess, deleteUser, deleteUserSuccess, emptyAction, loadUser, loadUserFail, loadUserSuccess, updateUser, updateUserSuccess } from "./User.Action";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})

export class UserEffect {
    actions$ = inject(Actions);
    services = inject(UserService);
    toastr = inject(ToastrService);
    constructor() { }

    _loadUser = createEffect(() =>
        this.actions$.pipe(
            ofType(loadUser),
            exhaustMap((action) => {
                return this.services.getUsers().pipe(
                    map((data) => {
                        return loadUserSuccess({ list: data })
                    }),
                    catchError((err) => of(loadUserFail({ errorMsg: err.message }))),
                )
            })
        )
    );

    _deleteUser = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteUser),
            switchMap((action) => {
                return this.services.Delete(action.userId).pipe(
                    switchMap((data) => {
                        return of(deleteUserSuccess({ userId: action.userId }),
                            this.ShowToaster("User Deleted Successfully", "Delete", 'pass'))
                    }),
                    catchError((err) => of(this.ShowToaster(err.message, "Delete User", 'fail'))),
                )
            })
        )
    );

    _addUser = createEffect(() =>
        this.actions$.pipe(
            ofType(addUser),
            switchMap((action) => {
                return this.services.addUser(action.user).pipe(
                    switchMap((data) => {
                        return of(addUserSuccess({ user: action.user }),
                            this.ShowToaster("User Added Successfully", "Add User", 'pass')
                        )
                    }
                    ),
                    catchError((err) => of(this.ShowToaster(err.message, "Add User", 'fail')))
                )
            })
        )
    )

    _updateUser = createEffect(() =>
        this.actions$.pipe(
            ofType(updateUser),
            switchMap((action) => {
                return this.services.updateUser(action.user,action.user.id).pipe(
                    switchMap((data) => {
                        return of(updateUserSuccess({ user: action.user, userId: action.userId }),
                            this.ShowToaster("User Update Successfully", "Update User", 'pass')
                        )
                    }
                    ),
                    catchError((err) => of(this.ShowToaster(err.message, "Update User", 'fail')))
                )
            })
        )
    )

    ShowToaster(message: string, title: string, status: string) {
        if (status === 'pass') {
            this.toastr.success(message, title);
        } else {
            this.toastr.error(message, title);
        }

        return emptyAction();
    }
}

// https://www.youtube.com/watch?v=ItQYxGDacW4