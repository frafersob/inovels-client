import { Image } from '../scene/image';
import { User } from '../user/user';
export class Novel {
        id: number;
        user: User;
        name: string;
        description: string;
        language: string;
        agerange: string;
        scenes: any[];
        image: Image;
        createDateTime: Date;
        updateDateTime: Date;
    }
