# some imp findings
- this.template.addEventListener() - To add an event listener to an element within the shadow boundary, use template.
- this.addEventListener() - To add an event listener to an element that a template doesn’t own, call addEventListener directly.
- If a listener is added to the same element repeatedly, the browser ignores the duplicates.
- 