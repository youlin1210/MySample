import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'
import { OidcSecurityService } from '../auth/services/oidc.security.service';
import { UserManagementService } from '../user-management/UserManagementService';
import { User } from './models/User';

@Component({
    selector: 'app-user-management',
    templateUrl: 'user-management.component.html'
})

export class UserManagementComponent implements OnInit, OnDestroy {

    isAuthorizedSubscription: Subscription | undefined;
    isAuthorized = false;

    public message: string;
    public Users: User[] = [];

    constructor(
        private _userManagementService: UserManagementService,
        public oidcSecurityService: OidcSecurityService,
    ) {
        this.message = 'user-management';
    }

    ngOnInit() {
        this.isAuthorizedSubscription = this.oidcSecurityService.getIsAuthorized().subscribe(
            (isAuthorized: boolean) => {
                this.isAuthorized = isAuthorized;
                this.getData()
            });
    }

    ngOnDestroy(): void {
        if (this.isAuthorizedSubscription) {
            this.isAuthorizedSubscription.unsubscribe();
        }
    }


    private getData() {
        this._userManagementService
            .GetAll()
            .subscribe(data => this.Users = data,
            error => this.oidcSecurityService.handleError(error),
            () => console.log('User Management Get all completed'));
    }

    public Update(user: User) {
        this._userManagementService.Update(user.id, user)
            .subscribe((() => console.log('subscribed')),
            error => this.oidcSecurityService.handleError(error),
            () => console.log('update request sent!'));
    }

}
