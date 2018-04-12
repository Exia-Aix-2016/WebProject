export interface IIdea {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly posterUrl: string;
    readonly planned: boolean;
    readonly signaled: boolean;
}

export interface IActivity extends IIdea {
    readonly date: Date;
    readonly price: number;
    readonly occurrenceName: string;
    readonly participants: number;
}

// export interface IActivityExtended extends IActivity {
//     readonly participantIds: number[];
//     readonly pictures: IPicture[];
// }
