/* tslint:disable */

/** the schema allows the following query: */
export interface Query {
  widgets?: (Widget | null)[] | null;
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
