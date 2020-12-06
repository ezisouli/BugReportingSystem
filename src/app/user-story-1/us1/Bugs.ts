import {​​ Comments }​​ from './Comments';

export interface Bugs{​​​​
    id: string;
    title: string;
    description: string;
    priority: number;
    reporter: string;
    status: string;
    updatedAt: Date;
    createdAt: Date;
    comments: Comments[];
}​​​​