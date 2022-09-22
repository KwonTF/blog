import { useMutation, UseMutationOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
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

export type PostArticleMutationVariables = Exact<{
  input?: InputMaybe<ArticleInput>;
}>;


export type PostArticleMutation = { __typename?: 'Mutation', postArticle?: { __typename?: 'Article', id: string, author: string, title: string, body: string, group?: string | null, tags?: Array<string> | null, viewCount: number } | null };


export const PostArticleDocument = `
    mutation postArticle($input: ArticleInput) {
  postArticle(input: $input) {
    id
    author
    title
    body
    group
    tags
    viewCount
  }
}
    `;
export const usePostArticleMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<PostArticleMutation, TError, PostArticleMutationVariables, TContext>
    ) =>
    useMutation<PostArticleMutation, TError, PostArticleMutationVariables, TContext>(
      ['postArticle'],
      (variables?: PostArticleMutationVariables) => fetcher<PostArticleMutation, PostArticleMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, PostArticleDocument, variables)(),
      options
    );