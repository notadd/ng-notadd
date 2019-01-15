import { NgModule } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ApolloModule, Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { NgForage } from 'ngforage';

import { environment } from '@env';

const uri = environment.apiUrl; // <-- add the URL of the GraphQL server here

export function createApollo(httpLink: HttpLink, ngForage: NgForage) {

    // Http link
    const http = httpLink.create({ uri });

    // Cached storage for the user token
    let token;

    const withToken = setContext(async () => {
        // if you have a cached value, return it immediately
        if (token) { return token; }

        token = await ngForage.getItem('TOKEN_DATA');
    });

    const resetToken = onError(({ networkError }) => {
        if (networkError && networkError['statusCode'] === 401) {
            // remove cached token on 401 from the server
            token = '';
        }
    });

    // Flow link
    const authFlowLink = withToken.concat(resetToken);

    // Middleware
    const authMiddleware = new ApolloLink((operation, forward) => {
        // add the authorization to the headers
        operation.setContext({
            headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
        });

        return forward(operation);
    });

    // Afterware
    const afterwareLink = new ApolloLink((operation, forward) => {
        return forward(operation).map(response => {
            const { response: { headers } } = operation.getContext();

            return response;
        });
    });

    // Error link
    const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
            graphQLErrors.map(({ message, locations, path }) =>
                console.log(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                )
            );
        }
        if (networkError) {
            console.log(`[Network error]:`, networkError);
        }
    });

    return {
        link: ApolloLink.from([authFlowLink, authMiddleware, afterwareLink, errorLink, http]),
        cache: new InMemoryCache(),
    };
}

@NgModule({
    exports: [
        ApolloModule,
        HttpLinkModule
    ],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
            deps: [ HttpLink, NgForage ],
        },
    ],
})
export class GraphQLModule {
    constructor(
        private apollo: Apollo,
        private httpLink: HttpLink
    ) {
        apollo.createNamed('upload', {
            cache: new InMemoryCache(),
            link: httpLink.create({
                uri: 'https://upyun.api.ibenchu.pw/graphql'
            })
        });
    }
}
