import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NotaddBreadcrumb } from '@notadd/types';

@Component({
    selector: 'notadd-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss']
})
export class NotaddBreadcrumbComponent implements OnInit {

    breadcrumbs: Array<NotaddBreadcrumb>;
    breadcrumbData: string;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.breadcrumbs = [];
    }

    ngOnInit() {
        this.breadcrumbs = this.getBreadcrumbs(this.activatedRoute.root);

        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd)
            ).subscribe(event => {
                this.breadcrumbs = this.getBreadcrumbs(this.activatedRoute.root);
            });
    }

    private getBreadcrumbs(route: ActivatedRoute, url= '', breadcrumbs: Array<NotaddBreadcrumb>= []): Array<NotaddBreadcrumb> {
        const routeDataBreadcrumbs = 'title';
        // get the child routes
        const children: Array<ActivatedRoute> = route.children;

        // return if there are no more children
        if (children.length === 0) {
            return breadcrumbs;
        }

        // iterate over each children
        for (const child of children) {

            // verify primary route
            if (child.outlet !== PRIMARY_OUTLET) {
                continue;
            }

            // verify the custom data property "breadcrumb" is specified on the route
            // or route url not ""
            if (!child.snapshot.url.length || !child.snapshot.data.hasOwnProperty(routeDataBreadcrumbs)) {
                return this.getBreadcrumbs(child, url, breadcrumbs);
            }

            // get the route's URL segment
            const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

            // append route URL to URL
            url += `/${routeURL}`;

            // add breadcrumb
            const breadcrumb: NotaddBreadcrumb = {
                label: child.snapshot.data[routeDataBreadcrumbs] || this.breadcrumbData,
                params: child.snapshot.params,
                url
            };
            breadcrumbs.push(breadcrumb);

            // recursive
            return this.getBreadcrumbs(child, url, breadcrumbs);
        }
    }
}
