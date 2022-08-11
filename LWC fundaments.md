# some imp findings
- this.template.addEventListener() - To add an event listener to an element within the shadow boundary, use template.
- this.addEventListener() - To add an event listener to an element that a template doesn’t own, call addEventListener directly.
- If a listener is added to the same element repeatedly, the browser ignores the duplicates.
- on rerendered, the LWC engine attempts to reuse the existing elements. but it use diffing algorithm to decide whether to discard an element.
- Don’t update a public property or field in renderedCallback(). // cause infinite loop
- Don’t update a wire adapter configuration object property in renderedCallback()  // cause infinite loop
- @api property of child if set by parent by object/Array then for chile the @api property became read-only
- lwc data from is from parent to child
- use relationship fields to traverse to parent objects and fields. You can specify up to three relationship fields, which results in four objects and the field being referenced:
  - Example: import ACCOUNT_OWNER_NAME_FIELD from '@salesforce/schema/Account.Owner.Name';
- Javascript API is lightning/uiRecordApi
- on’t use 
    ```
    addEventListener(eventName, this.handleNotification.bind(this)). 
    It’s an anti-pattern because bind() returns a new function and thus the component can’t call removeEventListener() with the same function instance. Because the component can’t use the same function instance, the listener creates a memory leak.
    ```
 -
