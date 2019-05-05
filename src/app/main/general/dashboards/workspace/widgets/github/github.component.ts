import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';

@Component({
    selector: 'github-widget',
    templateUrl: './github.component.html',
    styleUrls: ['./github.component.scss']
})
export class GithubComponent implements OnInit {

    repoData: Observable<any>;

    constructor(
        private httpClient: HttpClient
    ) {
    }

    ngOnInit() {
        this.repoData = forkJoin(
            this.httpClient.get(`https://api.github.com/repos/notadd/ng-notadd`),
            this.httpClient.get(`https://api.github.com/repos/notadd/ng-notadd/contributors`)
        ).pipe(
            shareReplay(1),
            map(res => {
                return Object.assign({}, res[0], {
                    contributors: res[1]
                });
            })
        );
    }

}
