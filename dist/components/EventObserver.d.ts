export declare class EventObserver {
    static New(tag: string, f: (props: any) => void): EventObserver;
    static New(tag: string[], f: (props: any) => void): EventObserver[];
    Update: (props?: any) => void;
    private _Tag;
    private constructor();
    Destroy: () => void;
}
