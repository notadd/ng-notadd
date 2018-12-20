/* tslint:disable */

/** The `Upload` scalar type represents a file upload promise that resolves an object containing `stream`, `filename`, `mimetype` and `encoding`. */
export type Upload = any;

export interface Query {
  widgets?: (Widget | null)[] | null;
  baseIcon?: BaseIcon | null;
  mdiIcons?: (MdiIcon | null)[] | null;
  login?: Login | null;
}

export interface Widget {
  type?: string | null;
  chartData?: ChartData | null;
  increase?: number | null /** 正数为增长，负数为下降 */;
  currentAmount?: number | null;
}

export interface ChartData {
  date?: (string | null)[] | null;
  amount?: (number | null)[] | null;
}

export interface BaseIcon {
  categories?: (Category | null)[] | null;
}

export interface Category {
  icons?: (Icon | null)[] | null;
  name?: string | null;
}

export interface Icon {
  id?: string | null;
}

export interface MdiIcon {
  name?: string | null;
}

export interface Login {
  validatedUser?: boolean | null;
  errorCodes?: (string | null)[] | null;
}
export interface LoginQueryArgs {
  userName: string;
  password: string;
  email: string;
  token: string;
}

export enum CacheControlScope {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE"
}

export namespace BaseIcon {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";
    baseIcon?: BaseIcon | null;
  };

  export type BaseIcon = {
    __typename?: "BaseIcon";
    categories?: (Categories | null)[] | null;
  };

  export type Categories = {
    __typename?: "Category";
    icons?: (Icons | null)[] | null;
    name?: string | null;
  };

  export type Icons = {
    __typename?: "Icon";
    id?: string | null;
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
    login?: Login | null;
  };

  export type Login = {
    __typename?: "Login";
    validatedUser?: boolean | null;
    errorCodes?: (string | null)[] | null;
  };
}

export namespace MdiIcons {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";
    mdiIcons?: (MdiIcons | null)[] | null;
  };

  export type MdiIcons = {
    __typename?: "MDIIcon";
    name?: string | null;
  };
}

export namespace Widgets {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";
    widgets?: (Widgets | null)[] | null;
  };

  export type Widgets = {
    __typename?: "Widget";
    type?: string | null;
    chartData?: ChartData | null;
    increase?: number | null;
    currentAmount?: number | null;
  };

  export type ChartData = {
    __typename?: "ChartData";
    date?: (string | null)[] | null;
    amount?: (number | null)[] | null;
  };
}

import { Injectable } from "@angular/core";

import * as Apollo from "apollo-angular";

import gql from "graphql-tag";

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
