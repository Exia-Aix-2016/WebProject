export interface Comment {
    readonly id: number;
    readonly content: string;
    readonly signaled?: boolean;
    readonly pictureId: number;
    readonly userId: number;
}