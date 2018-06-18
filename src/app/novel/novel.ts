import { Image } from '../scene/image';
import { User } from '../user/user';
export class Novel {
        id: number;
        user: User;
        name: string;
        description: string;
        scenes: any[];
        image: Image;
        createDateTime: Date;
        updateDateTime: Date;
    }
