import type { ReactNode } from 'react';
import { NextPage } from 'next';
import type { ReactElement } from 'react';

type GetLayoutFunc = (page: ReactElement) => ReactElement;

export type Children = {
  children: ReactNode;
};

export type NextPageWithLayout = NextPage & {
  getLayout?: GetLayoutFunc;
  requireAuth?: boolean;
};

export interface ResponseData {
  status: number;
  message: string;
}

export interface Community {
   name: string,
    primaryCoverImage: string,
    secondaryCoverImage: string,
    description: string,
    moderators: string[],
    tags: string[],
    reportsCount: number,
    _id: string
}