# react-event-hooks
An event system to be used in combination with react hooks. Decouples your components and enhances there re-usability.

## Install
```js
$ npm install react-events-hooks
```

## Live Examples
Comming soon!!!

## Usage
```js
import React from 'react';
import { Emitter, Listener } from 'react-events-hooks';

const EVENT_NAME = 'event-fancybutton-click';

export class FancyButton extends React.Component<{ value: number, link: string }> {
  private _emitter = Emitter.New(`${EVENT_NAME}_${this.props.link}`);
  public render = () => (
    <button onClick={this.clickHandler} >{this.props.value}</button>
  )
  private clickHandler = () => this._emitter.Notify({ value: this.props.value });
}

export class FancyLabel extends React.Component<{ link: string }> {
  public state = { number: 0 };
  private _listener!: Listener;

  public componentDidMount = () => {
    this._listener = Listener.New(`${EVENT_NAME}_${this.props.link}`, ({ value }) => {
      this.setState({ number: this.state.number + value });
    });
  }

  public componentWillUnmount = () => {
    this._listener.Destroy();
  }

  public render = () => (
    <span >{this.state.number}</span>
  )
}
```

Now you can create the following in a render. I've registered the last FancyButton to the first FancyLabel to illustrate the decoupling of the components.

```html
<FancyButton value={1} link="link1" />
<FancyButton value={2} link="link1" />
<FancyLabel link="link1" />
<hr />
<FancyButton value={1} link="link2" />
<FancyButton value={2} link="link2" />
<FancyButton value={3} link="link1" />
<FancyLabel link="link2" />
```

## Emitter class
The Emitter class sends a signal to all listeners that are registert to it. 


> **Warning:**   
**Don't use the `new Emitter()`, instead use the `Emitter.New(tag: string)`. <br />**
**This is done so that the emitter is automaticly registered to the internal event system.**

**Static**
<table>
  <tr>
    <td width="150">New(tag: string)</td>
    <td>Creates a new or finds the current emitter in the internal event system registered to the tag .</td>
  </tr>
</table>

**Properties**
<table>
  <tr>
    <td width="150">Count: number</td>
    <td>Return the number of listeners currently attached this emitter.</td>
  </tr>
  <tr>
    <td>Tag: string</td>
    <td>Return the event tab name</td>
  </tr>
</table>

**Methods**
<table>
  <tr>
    <td width="150">Attach(Listener)</td>
    <td>Attaches the listener to the emitter.</td>
  </tr>
  <tr>
    <td>Detach(Listener)</td>
    <td>Detaches the listener from the emitter.</td>
  </tr>
  <tr>
    <td>Notify(props: any)</td>
    <td>Sends a signal to all listeners functions with the props</td>
  </tr>
</table>

## Listener class
The Listener class executes his registered function when the emitter sends a notification. 

> **Warning:**   
**Don't use `new Listener()`, instead use the `Listener.New(tag: string | string[], () => void)`. <br />**
**This is done so that the Listener is automaticly registered to the right emitter.**

**Static**
<table>
  <tr>
    <td width="150">New(tag: string | string[], () => {})</td>
    <td>Creates a new listener and registers to the emitter with the corresponding tag. Function is triggered when the emitter sends a notification.</td>
  </tr>
</table>

**Properties**
<table>
  <tr>
    <td width="150">Update: (props?: any) => void</td>
    <td>Hold the update function that is triggered when the emitter sends a notification</td>
  </tr>
</table>

**Methods**
<table>
  <tr>
    <td width="150">Destroy()</td>
    <td>Detaches the listener from the corresponding emitter.</td>
  </tr>
</table>

## Hooks
There are also two hooks: 
* useEmitter
* useListener

This example is the same as above only writen with hooks.
```js
import React, { useState } from 'react';
import { useEmitter, useListener } from 'react-events-hooks';

const EVENT_NAME = 'event-fancybutton-click';

export const FancyButton: React.FC<{ value: number, link: string }> = ({ value, link }) => {
  const notify = useEmitter(`${EVENT_NAME}_${link}`);
  const clickHandler = () => notify({ value });

  return <button onClick={clickHandler} >{value}</button>;
};

export const FancyLabel: React.FC<{ link: string }> = ({ link }) => {
  const [num, setNum] = useState(0);
  useListener(`${EVENT_NAME}_${link}`, ({ value }) => setNum((pref) => pref + value));

  return <span >{num}</span>;
};
```
As you can see, the listener now no longer needs to be destroyed. This is done automaticly when the component is unmounted



#### Changelog
- [See the CHANGELOG](./CHANGELOG.md)