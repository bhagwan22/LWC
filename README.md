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
 - connectedCallback() on parent
    - this hook can fire more than one time. 
      -	For example, if you remove an element and then insert it into another position, such as when you reorder a list, the hook fires several times. 
    - Basicly used for
      - establish communication
      - initialization tasks(fetch data, set up caches, or listen for events)
      - Subscribe or Unsubscribe to messaging channel
 	 	
      ```
        connectedCallback() {
                 super();
                   this.classList.add('new-class');
              }
      ```
      **Note** : we can not access child component from parent connectedcallback(since not exist yet), Access host element by this, Access elements in the component template use this.template
      
 - Parent rendered
 - constructor call in CHild
 - public property updated
 - Child Inserted into DOM
 - connected Callback on child
 - child rendered
 - RenderedCallback on child // run if change in component property(fields)
   - call after component finish rendering phase
   - here all expressions used in the template are reevaluated 	
     - Note: render callback call everytime a property value changes
 - RenderedCallback on parent


# LWC when component in removed
 - parent removed from DOM
 - disconnectedCallback on parent
   - used for purging/removing cache, removing event listner 	
 - child Removed form Dom
 - disconnectedCallback on child
