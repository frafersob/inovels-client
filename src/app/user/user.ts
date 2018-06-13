import { Novel } from '../novel/novel';
import { Progress } from './progress';
export class User {
        id: number;
        username: string;
        email: string;
        birthdate: Date;
        avatar: string | any;
        novels: Novel[];
        progress: Progress[];
        createDateTime: Date;
}
