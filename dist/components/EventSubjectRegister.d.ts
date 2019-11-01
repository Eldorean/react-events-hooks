import { EventSubject } from './EventSubject';
export declare class SubjectRegistry {
    static readonly Instance: SubjectRegistry;
    private static _Instance;
    private _Registry;
    Exists: (tag: string) => boolean;
    Add: (tag: string, subject: EventSubject) => EventSubject;
    Find: (tag: string) => EventSubject;
    FindOrCreate: (tag: string) => EventSubject;
    Destroy: (tag: string) => void;
}
