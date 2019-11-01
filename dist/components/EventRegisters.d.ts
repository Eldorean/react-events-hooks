export declare class EventRegistry<T> {
    static readonly Instance: any;
    private static _Instance;
    private static _CreateInstance;
    private _Registry;
    Exists: (tag: string) => boolean;
    Add: (tag: string, subject: T) => void;
    Find: (tag: string) => T;
    Destroy: (tag: string) => void;
}
