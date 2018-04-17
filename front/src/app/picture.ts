export interface Picture {
    readonly id: number;
    readonly url: string;
    readonly signaled?: boolean  ;
    readonly activityId: number;
}
