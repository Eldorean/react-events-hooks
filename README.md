# react-event-hooks
An event system to be used with react hooks

### Install
```js
$ npm install react-events-hooks
```

### Live Examples
Comming soon!!!

### Usage
```js
// ES6 Imports
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

// Now you can create the following in a render

      <FancyButton value={1} link="link1" />
      <FancyButton value={2} link="link1" />
      <FancyLabel link="link1" />
      <hr />
      <FancyButton value={1} link="link2" />
      <FancyButton value={2} link="link2" />
      <FancyButton value={3} link="link1" />
      <FancyLabel link="link2" />

```

### Emitter class
Don't use the `new Emitter()`, instead use the `Emitter.New()`. <br />
This is done so that the emitter is automaticly registered to the internal event system.

**properties**
| ------------- | ----------------- | -------------
| authors?      | IAuthorValue[]    | See the type specifications in the next table.
| dates?        | IDateValue[]      | See the type specifications in the table below.


```js
<Link activeClass="active"
      to="target"
      spy={true}
      smooth={true}
      hashSpy={true}
      offset={50}
      duration={500}
      delay={1000}
      isDynamic={true}
      onSetActive={this.handleSetActive}
      onSetInactive={this.handleSetInactive}
      ignoreCancelEvents={false}
>
  Your name
</Link>
```

### Scroll Methods

> Scroll To Top

```js

var Scroll = require('react-scroll');
var scroll = Scroll.animateScroll;

scroll.scrollToTop(options);

```

> Scroll To Bottom

```js

var Scroll = require('react-scroll');
var scroll = Scroll.animateScroll;

scroll.scrollToBottom(options);

```

> Scroll To (position)

```js

var Scroll = require('react-scroll');
var scroll = Scroll.animateScroll;

scroll.scrollTo(100, options);

```

> Scroll To (Element)

animateScroll.scrollTo(positionInPixels, props = {});

```js

var Scroll = require('react-scroll');
var Element = Scroll.Element;
var scroller = Scroll.scroller;

<Element name="myScrollToElement"></Element>

// Somewhere else, even another file
scroller.scrollTo('myScrollToElement', {
  duration: 1500,
  delay: 100,
  smooth: true,
  containerId: 'ContainerElementID',
  offset: 50, // Scrolls to element + 50 pixels down the page
  ...
})

```

> Scroll More (px)

```js

var Scroll = require('react-scroll');
var scroll = Scroll.animateScroll;

scroll.scrollMore(10, options);

```

### Scroll events

> begin - start of the scrolling

```js

var Scroll = require('react-scroll');
var Events = Scroll.Events;

Events.scrollEvent.register('begin', function(to, element) {
  console.log("begin", to, element);
});

```

> end - end of the scrolling/animation

```js

Events.scrollEvent.register('end', function(to, element) {
  console.log("end", to, element);
});

```


> Remove events

```js

Events.scrollEvent.remove('begin');
Events.scrollEvent.remove('end');

```


#### Create your own Link/Element
> Simply just pass your component to one of the high order components (Element/Scroll)

```js
var React   = require('react');
var Scroll  = require('react-scroll');
var ScrollLink = Scroll.ScrollLink;
var ScrollElement = Scroll.ScrollElement;

var Element = React.createClass({
  render: function () {
    return (
      <div {...this.props}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = ScrollElement(Element);

var Link = React.createClass({
  render: function () {
    return (
      <a {...this.props}>
        {this.props.children}
      </a>
    );
  }
});

module.exports = ScrollLink(Link);

```

### Scroll Animations
> Add a custom easing animation to the smooth option. This prop will accept a Boolean if you want the default, or any of the animations listed below

```js

scroller.scrollTo('myScrollToElement', {
  duration: 1500,
  delay: 100,
  smooth: "easeInOutQuint",
  containerId: 'ContainerElementID',
  ...
})

```

> List of currently available animations:

```
linear
	- no easing, no acceleration.
easeInQuad
	- accelerating from zero velocity.
easeOutQuad
	- decelerating to zero velocity.
easeInOutQuad
	- acceleration until halfway, then deceleration.
easeInCubic
	- accelerating from zero velocity.
easeOutCubic
	- decelerating to zero velocity.
easeInOutCubic
	- acceleration until halfway, then deceleration.
easeInQuart
	- accelerating from zero velocity.
easeOutQuart
	- decelerating to zero velocity.
easeInOutQuart
	-  acceleration until halfway, then deceleration.
easeInQuint
	- accelerating from zero velocity.
easeOutQuint
	- decelerating to zero velocity.
easeInOutQuint
	- acceleration until halfway, then deceleration.
```

A good visual reference can be found at [easings.net](http://easings.net/)

#### Changelog
- [See the CHANGELOG](./CHANGELOG.md)