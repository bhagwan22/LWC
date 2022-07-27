```
  this.dispatchEvent(new CustomEvent('buttonclick',{detail:'test', bubbles:true, composed: true}));
```
> composed: allow to propogate up the DOM tree from parent to grandparent

> bubble: propogate up to the element’s ancestors inside the template only. When the event reaches the shadow boundary, it stops.

LWC dosn't support event capture: Lightning web components use only the bubbling phase. Dispatching events or adding listeners to the capture phase isn't supported.
i.e event path as start with your component and then moving to it's parent and grand parent.


Event targets don’t propagate beyond the shadow root of the component instance.

- event bubble up in DOM tree only
i.e if event bubbles:true
then each parent markup can have a handler
