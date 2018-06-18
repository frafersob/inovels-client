import { User } from '../user/user';
export class Image {
        id: number;
        user: User;
        name: string;
        src: string;
        extension: string;
        sizeX: number;
        sizeY: number;
        offsetX: number;
        offsetY: number;
}
