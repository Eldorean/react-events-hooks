export class EventRegistry<T> {
  static get Instance() {
    return (
      EventRegistry._Instance ?
        EventRegistry._Instance :
        EventRegistry._Instance = this._CreateInstance()
    );
  }
  private static _Instance: any;
  private static _CreateInstance<T extends typeof EventRegistry>(this: T): InstanceType<T> {
    return new this() as InstanceType<T>;
  }
  private _Registry: { [tag: string]: T } = {};
  Exists = (tag: string): boolean => !!this._Registry[tag];
  Add = (tag: string, subject: T) => {
    if (this.Exists(tag)) { throw new Error(`tag ${tag} already exists`); }
    this._Registry[tag] = subject;
  }
  Find = (tag: string) => {
    if (!this.Exists(tag)) { throw new Error(`tag ${tag} is unknown`); }
    return this._Registry[tag];
  }
  Destroy = (tag: string) => { delete this._Registry[tag]; };
}
