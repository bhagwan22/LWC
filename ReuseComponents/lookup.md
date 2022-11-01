```
<template>
    <div class="slds-form-element">
        <!--<label class="slds-form-element__label" for="combobox-id-2">{lookupLabel}</label>  -->
        <div class="slds-form-element__control">
          <div class="slds-combobox_container">
            <div class="slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open" aria-expanded="true" aria-haspopup="listbox" role="combobox">
              <template if:true={selectedValue}>
              <div data-key="pilldiv" class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_left-right" role="none">
                <span class="slds-icon_container slds-icon-standard-account slds-combobox__input-entity-icon" title="object">
                 <div class="slds-icon slds-icon_small" aria-hidden="true">
                  <lightning-icon icon-name={iconName} size="small"></lightning-icon>
                 </div>
                 <span class="slds-assistive-text">Record</span>
                </span>
                <input type="text" class="slds-input slds-combobox__input slds-combobox__input-value" id="combobox-id-5" aria-controls="listbox-id-5" role="textbox" placeholder="Select an Option" readonly value={selectedValue} />
                <button class="slds-button slds-button_icon slds-input__icon slds-input__icon_right" onclick={removeRecordOnLookup}
                title="Remove selected option">
                 <span class="slds-button__icon" aria-hidden="true" >
                  <lightning-icon icon-name="utility:close"
                   size="xx-Small" class="slds-icon slds-icon slds-icon_x-small slds-icon-text-default" aria-hidden="true"></lightning-icon>
                 </span>
                 <span class="slds-assistive-text">Remove selected record</span>
                </button>
               </div>
              </template>
              <template if:false={selectedValue}>
              <div if:true = {isRequired} data-key="searchdiv" class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right" role="none">
                <input type="text" onfocusout={onLeave} value={searchKey} onkeyup={handleKeyChange} onchange={handleKeyChange} class="slds-input slds-combobox__input " id="combobox-id-2" aria-autocomplete="list" aria-controls="listbox-id-2" role="textbox" placeholder={placeHolderName} required= ""/>
                <span class="slds-icon_container slds-icon-utility-search slds-input__icon slds-input__icon_right">
                  <lightning-icon icon-name="utility:search" size="xx-Small" class="slds-icon slds-icon slds-icon_x-small slds-icon-text-default" aria-hidden="true"></lightning-icon>
                </span>
              </div>
              <div if:false = {isRequired} data-key="searchdiv" class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right" role="none">
                <input type="text" onfocusout={onLeave} value={searchKey} onkeyup={handleKeyChange} onchange={handleKeyChange} class="slds-input slds-combobox__input slds-has-focus" id="combobox-id-3" aria-autocomplete="list" aria-controls="listbox-id-2" role="textbox" placeholder={placeHolderName}/>
                <span class="slds-icon_container slds-icon-utility-search slds-input__icon slds-input__icon_right">
                  <lightning-icon icon-name="utility:search" size="xx-Small" class="slds-icon slds-icon slds-icon_x-small slds-icon-text-default" aria-hidden="true"></lightning-icon>
                </span>
              </div>
              <template if:true={recordsList}>
              <div id="listbox-id-2-venu" data-key="dropdownresult" class="slds-show slds-dropdown slds-dropdown_length-with-icon-7 slds-dropdown_fluid" role="listbox">
                <ul class="slds-listbox slds-listbox_vertical" role="presentation" >
                  <template if:true={message}>
                  <center> {message}</center>
                  </template>
                  <template for:each={recordsList} for:item="record">
                    <li id={record.Id} key={record.Id} onclick={onRecordSelection} role="presentation" class="slds-listbox__item">
                    <div data-key={record.Id} data-name={record.Name} class="slds-media slds-listbox__option slds-listbox__option_entity slds-listbox__option_has-meta" role="option">
                      <span class="slds-media__figure slds-listbox__option-icon">
                        <span class="slds-icon_container">
                          <lightning-icon icon-name={iconName} size="small"></lightning-icon>
                        </span>
                      </span>
                      <span class="slds-media__body">
                        <span data-key={record.Id} data-name={record.Name} class="slds-listbox__option-text slds-listbox__option-text_entity">{record.Name} </span>
                      </span>
                    </div>
                  </li>
                  </template>
                </ul>
              </div>
              </template>
              </template>
            </div>
          </div>
        </div>
      </div>
</template>
```
# js 
```
import { LightningElement, track, wire, api } from "lwc";
  import findRecords from "@salesforce/apex/LwcLookupController.findRecords";
  export default class LwcLookup extends LightningElement {
  @track recordsList;
  @track searchKey = "";
  @api selectedValue;
  @api selectedRecordId;
  @api objectApiName;
  @api iconName;
  @api lookupLabel;
  @api placeHolderName;
  @api isRequired = false;
  @api userRoleWise = false;
  @track message;
  onLeave(event) {
    setTimeout(() => {
      this.searchKey = "";
      this.recordsList = null;
    }, 300);
  }
  onRecordSelection(event) {
    console.log('hello')
    this.selectedRecordId = event.target.dataset.key;
    this.selectedValue = event.target.dataset.name;
    this.searchKey = "";
    this.onSeletedRecordUpdate();
  }
  handleKeyChange(event) {
    const searchKey = event.target.value;
    this.searchKey = searchKey;
    this.getLookupResult();
  }
  @api removeRecordOnLookup(event) {
    this.searchKey = "";
    this.selectedValue = null;
    this.selectedRecordId = null;
    this.recordsList = null;
    this.onSeletedRecordUpdate();
 }
  getLookupResult() {
    findRecords({ searchKey: this.searchKey, objectName : this.objectApiName, userRoleWise : this.userRoleWise })
      .then((result) => {
        if (result.length===0) {
          this.recordsList = [];
          this.message = "No Records Found";
          } else {
          this.recordsList = result;
          this.message = "";
          }
          this.error = undefined;
      })
      .catch((error) => {
      this.error = error;
      this.recordsList = undefined;
      });
  }
  onSeletedRecordUpdate(){
    const passEventr = new CustomEvent('recordselection', {
      detail: { selectedRecordId: this.selectedRecordId, selectedValue: this.selectedValue, object: this.objectApiName }
      });
      this.dispatchEvent(passEventr);
  }
}
```

# Apex
```
public with sharing class LwcLookupController {
    @AuraEnabled(cacheable=true)
    public static List<sobject> findRecords(String searchKey, String objectName, boolean userRoleWise) {
      string searchText = '\'' + String.escapeSingleQuotes(searchKey) + '%\'';
      string query = 'SELECT Id, Name FROM ' +objectName+ ' WHERE Name LIKE '+searchText+' LIMIT 6';
      if(userRoleWise){
        Id currentUserRoleId = UserInfo.getUserRoleId();
        Set<Id> allUsers = getRoleSubordinateUsers(currentUserRoleId);
        return Database.query('SELECT Id, Name FROM ' +objectName+ ' WHERE Name LIKE '+searchText+'and Id IN :allUsers LIMIT 6');
      }
      return Database.query('SELECT Id, Name FROM ' +objectName+ ' WHERE Name LIKE '+searchText+' LIMIT 6');
    }
    public static Set<ID> getRoleSubordinateUsers(Id roleId) {
      // To get all sub roles.
      Set<Id> allSubRoleIds = getAllSubRoleIds(new Set<ID>{roleId});
      Map<Id,User> users = new Map<Id, User>([Select Id, Name From User where IsActive = True AND UserRoleId IN :allSubRoleIds]);
      return users.keySet();
    }
    public static Set<ID> getAllSubRoleIds(Set<ID> roleIds) {
        Set<ID> currentRoleIds = new Set<ID>();
        // Get all the roles underneath the passed roles.
        for(UserRole userRole :[select Id from UserRole where ParentRoleId IN :roleIds AND ParentRoleID != null])
            currentRoleIds.add(userRole.Id);
        if(currentRoleIds.size() > 0){
            currentRoleIds.addAll(getAllSubRoleIds(currentRoleIds));
        }
        return currentRoleIds;
    }
}
```
