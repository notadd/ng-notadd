import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable()
export class RoleService implements Resolve<Observable<any>> {

    onRoleChanged: BehaviorSubject<any>;
    routeParams: any;

    constructor() {
        this.onRoleChanged = new BehaviorSubject<any>({});
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        this.routeParams = route.paramMap;
        return of({});
    }
}
