# LWC when component insert

- parent constructor
	 - Don’t use the document.write() or document.open() methods.
	 - Don’t inspect the element's attributes and children, because they don’t exist yet.
	 - Don’t inspect the element’s public properties, because they’re set after the component is created.
	 - Don’t Add Attributes to Host Element During Construction: becaue it dosn't exist
     ```
          constructor() {
                 super();
                   this.classList.add('new-class');
              }
            note: but leagel in other lifehooks
      ```
      
 - parent public property update(if needed)
 - parent insert into DOM
      connectedCallback() on parent
      ```
        connectedCallback() {
                 super();
                   this.classList.add('new-class');
              }
      ```
      
 - Parent rendered
 - constructor call in CHild
 - public property updated
 - Child Inserted into DOM
 - connected Callback on child
 - child rendered
 - RenderedCallback on child
 - RenderedCallback on parent


# LWC when component in removed
 - parent removed from DOM
 - disconnectedCallback on parent
 - child Removed form Dom
 - disconnectedCallback on child
