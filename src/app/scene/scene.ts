import { Novel } from '../novel/novel';
import { Image } from './image';
export class Scene {
        id: number;
        novel: Novel;
        image: Image;
        text: string;
        answer: string;
}
