/* tslint:disable */

/** the schema allows the following query: */
export interface Query {
  posts?: (Post | null)[] | null;
  author?: Author | null;
  persons?: (Person | null)[] | null;
}

export interface Post {
  id: number;
  title?: string | null;
  author?: Author | null;
  votes?: number | null;
}

export interface Author {
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  posts?: (Post | null)[] | null;
}

export interface Person {
  name?: string | null;
  age?: number | null;
  friends?: (Person | null)[] | null;
}
/** this schema allows the following mutation: */
export interface Mutation {
  upvotePost?: Post | null;
}
export interface AuthorQueryArgs {
  id: number;
}
export interface UpvotePostMutationArgs {
  postId: number;
}

export namespace GetPersons {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";
    persons?: (Persons | null)[] | null;
  };

  export type Persons = {
    __typename?: "Person";
    age?: number | null;
    name?: string | null;
    friends?: (Friends | null)[] | null;
  };

  export type Friends = {
    __typename?: "Person";
    age?: number | null;
    name?: string | null;
  };
}

import { Injectable } from "@angular/core";

import * as Apollo from "apollo-angular";

import gql from "graphql-tag";

@Injectable({
  providedIn: "root"
})
export class GetPersonsGQL extends Apollo.Query<
  GetPersons.Query,
  GetPersons.Variables
> {
  document: any = gql`
    query getPersons {
      persons {
        age
        name
        friends {
          age
          name
        }
      }
    }
  `;
}
