# react-events-hook

Simple Observer pattern for React.

[Live Demo](https://codesandbox.io/p/sandbox/w9wqwh)

[npm package](https://www.npmjs.com/package/@alcadur/react-events-hook)

## Installation
```
npm i @alcadur/react-events-hook
```

## What for?
Useful for communication between components in different parts of the view. 

Using standard React mechanisms, it's also possible to synchronize with external events.

Lets look at an example:

![image](https://i.postimg.cc/6QTvgnz9/chrome-XWt93Ap2ma.png)

If we want to change background colors for C1, C2 and C3 from C6 we have few options:
1. use context
2. use global state
3. props drilling

   [![chrome-ZO2l-FT6NWj.png](https://i.postimg.cc/tggMcSL6/chrome-ZO2l-FT6NWj.png)](https://postimg.cc/BjdpLgZZ)

With events, we can avoid unnecessary boilerplate.

[![chrome-69c-Hd-SCHv-C.png](https://i.postimg.cc/tg0sSw1D/chrome-69c-Hd-SCHv-C.png)](https://postimg.cc/ZWcY0fxy)
[![chrome-M22485Lpnz.gif](https://i.postimg.cc/502bnSmm/chrome-M22485Lpnz.gif)](https://postimg.cc/SX3BK83X)


## Docs

### onEvent
`onEvent` is a function that subscribes to event outsite of React context.

:warning: If you want to use `onEvent` in react component without `useEvents` hook, make sure to not add a new listiner on each render.

```ts
onEvent('eventName', (...args) => console.log('event fired with: ', args));
````

### useEvents
Use to subscribe to events in React components.
```tsx
    const { onEvent, emitEvent, removeEvent } = useEvents({ eventName: (...args) => console.log('event fired with: ', args) })
```

Event name can be: `string`, `number` or `symbol`
```ts
export const Events = {
  C4_TITLE_CHANGE: Symbol(),
  REMOVE_LEFT_CHILD: "remove-element",
  CHANGE_COLOR: 3
} as const;
```

You don't need to use `useEvents` hook to emit or remove events.

### emitEvent
`emitEvent` is a function that emits single event.

```ts
emitEvent('eventName', 'some data');
emitEvent('eventWithParams', 1, 2, 3);
```

There no difference between directly usage of `emitEvent` and `emitEvent` returned from `useEvents` hook.

### removeEvent
`removeEvent` is a function that removes event listener.

```ts
const eventHandler = () => console.log('event fired');
onEvent('eventName', eventHandler);
removeEvent('eventName', eventHandler);
```

There no difference between directly usage of `removeEvent` and `removeEvent` returned from `useEvents` hook.
