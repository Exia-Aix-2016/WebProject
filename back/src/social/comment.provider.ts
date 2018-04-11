import { Connection, Repository } from 'typeorm';
import { Comment } from './comment.entity';
import {DbConnectionToken, CommentRepositoryToken} from '../constants';


export const commentProviders = [
    {
        provide: CommentRepositoryToken,
        useFactory: (connection: Connection) => connection.getRepository(Comment),
        inject: [DbConnectionToken],
    },
];