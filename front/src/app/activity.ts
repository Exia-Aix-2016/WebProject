export interface Activity {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly posterUrl: string;
    readonly planned: boolean;
    readonly signaled: boolean;
    readonly date?: Date;
    readonly price?: number;
    readonly occurrenceName?: string;
    readonly participants?: number;
    readonly participating?: boolean;
}
