/* tslint:disable */
export type Maybe<T> = T | null;

export enum CacheControlScope {
    Public = "PUBLIC",
    Private = "PRIVATE"
}

/** The `Upload` scalar type represents a file upload promise that resolves an object containing `stream`, `filename`, `mimetype` and `encoding`. */
export type Upload = any;

// ====================================================
// Documents
// ====================================================

export namespace BaseIcon {
    export type Variables = {};

    export type Query = {
        __typename?: "Query";

        baseIcon: Maybe<BaseIcon>;
    };

    export type BaseIcon = {
        __typename?: "BaseIcon";

        categories: Maybe<(Maybe<Categories>)[]>;
    };

    export type Categories = {
        __typename?: "Category";

        icons: Maybe<(Maybe<Icons>)[]>;

        name: Maybe<string>;
    };

    export type Icons = {
        __typename?: "Icon";

        id: Maybe<string>;
    };
}

export namespace Login {
    export type Variables = {
        userName: string;
        password: string;
        email: string;
        token: string;
    };

    export type Query = {
        __typename?: "Query";

        login: Maybe<Login>;
    };

    export type Login = {
        __typename?: "Login";

        validatedUser: Maybe<boolean>;

        errorCodes: Maybe<(Maybe<string>)[]>;
    };
}

export namespace MdiIcons {
    export type Variables = {};

    export type Query = {
        __typename?: "Query";

        mdiIcons: Maybe<(Maybe<MdiIcons>)[]>;
    };

    export type MdiIcons = {
        __typename?: "MDIIcon";

        name: Maybe<string>;
    };
}

export namespace Widgets {
    export type Variables = {};

    export type Query = {
        __typename?: "Query";

        widgets: Maybe<(Maybe<Widgets>)[]>;
    };

    export type Widgets = {
        __typename?: "Widget";

        type: Maybe<string>;

        chartData: Maybe<ChartData>;

        increase: Maybe<number>;

        currentAmount: Maybe<number>;
    };

    export type ChartData = {
        __typename?: "ChartData";

        date: Maybe<(Maybe<string>)[]>;

        amount: Maybe<(Maybe<number>)[]>;
    };
}

// ====================================================
// START: Apollo Angular template
// ====================================================

import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular";

import gql from "graphql-tag";

// ====================================================
// Apollo Services
// ====================================================

@Injectable({
    providedIn: "root"
})
export class BaseIconGQL extends Apollo.Query<
    BaseIcon.Query,
    BaseIcon.Variables
> {
    document: any = gql`
        query baseIcon {
            baseIcon {
                categories {
                    icons {
                        id
                    }
                    name
                }
            }
        }
    `;
}
@Injectable({
    providedIn: "root"
})
export class LoginGQL extends Apollo.Query<Login.Query, Login.Variables> {
    document: any = gql`
        query login(
            $userName: String!
            $password: String!
            $email: String!
            $token: String!
        ) {
            login(
                userName: $userName
                password: $password
                email: $email
                token: $token
            ) {
                validatedUser
                errorCodes
            }
        }
    `;
}
@Injectable({
    providedIn: "root"
})
export class MdiIconsGQL extends Apollo.Query<
    MdiIcons.Query,
    MdiIcons.Variables
> {
    document: any = gql`
        query mdiIcons {
            mdiIcons {
                name
            }
        }
    `;
}
@Injectable({
    providedIn: "root"
})
export class WidgetsGQL extends Apollo.Query<Widgets.Query, Widgets.Variables> {
    document: any = gql`
        query widgets {
            widgets {
                type
                chartData {
                    date
                    amount
                }
                increase
                currentAmount
            }
        }
    `;
}

// ====================================================
// END: Apollo Angular template
// ====================================================
