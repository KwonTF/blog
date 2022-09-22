export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the [RFC 3339](https://github.com/excitement-engineer/graphql-iso-date/blob/master/rfc3339.txt) profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
   *
   * This scalar is a description of an exact instant on the time-line such as the instant that a user account was created.
   *
   * This scalar ignores leap seconds (thereby assuming that a minute constitutes of 59 seconds). In this respect it diverges from the RFC 3339 profile.
   *
   * Where an RFC 3339 compliant date-time string has a time-zone other than UTC, it is shifted to UTC. For example, the date-time string "2016-01-01T14:10:20+01:00" is shifted to "2016-01-01T13:10:20Z".
   *
   * Ref: https://github.com/excitement-engineer/graphql-iso-date#datetime
   */
  DateTime: any;
};

export type Article = {
  __typename?: 'Article';
  author: Scalars['ID'];
  backArticle?: Maybe<Article>;
  body: Scalars['String'];
  cards?: Maybe<Array<Card>>;
  createdDate: Scalars['DateTime'];
  difficulty?: Maybe<Scalars['Int']>;
  editedDate?: Maybe<Scalars['DateTime']>;
  flickItems?: Maybe<Array<FlickItem>>;
  group?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  nextArticle?: Maybe<Article>;
  tags?: Maybe<Array<Scalars['String']>>;
  thumbnail?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  viewCount: Scalars['Int'];
};

export type ArticleInput = {
  author: Scalars['String'];
  backArticle?: InputMaybe<Scalars['ID']>;
  body: Scalars['String'];
  group?: InputMaybe<Scalars['String']>;
  nextArticle?: InputMaybe<Scalars['ID']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  thumbnail?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type Card = {
  __typename?: 'Card';
  color?: Maybe<Scalars['String']>;
  desc?: Maybe<Scalars['String']>;
  textColor?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type FlickItem = {
  __typename?: 'FlickItem';
  cards?: Maybe<Array<Card>>;
  desc?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  postArticle?: Maybe<Article>;
};


export type MutationPostArticleArgs = {
  input?: InputMaybe<ArticleInput>;
};

export type Query = {
  __typename?: 'Query';
  articles: Array<Article>;
};
