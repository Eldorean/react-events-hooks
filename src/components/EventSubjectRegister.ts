import { EventSubject } from './EventSubject';

export class SubjectRegistry {
  static get Instance(): SubjectRegistry {
    return (
      this._Instance ?
        this._Instance :
        this._Instance = new SubjectRegistry()
    );
  }
  private static _Instance: SubjectRegistry;
  private _Registry: { [tag: string]: EventSubject } = {};
  Exists = (tag: string): boolean => !!this._Registry[tag];
  Add = (tag: string, subject: EventSubject): EventSubject => {
    if (this.Exists(tag)) { throw new Error(`tag ${tag} already exists`); }
    this._Registry[tag] = subject;
    return subject;
  }
  Find = (tag: string): EventSubject => {
    if (!this.Exists(tag)) { throw new Error(`tag ${tag} is unknown`); }
    return this._Registry[tag];
  }
  FindOrCreate = (tag: string): EventSubject => EventSubject.New(tag);
  Destroy = (tag: string): void => { delete this._Registry[tag]; };
}
