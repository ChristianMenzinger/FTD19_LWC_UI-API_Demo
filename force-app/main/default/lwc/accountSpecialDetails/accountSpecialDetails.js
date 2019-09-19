import { LightningElement, track, wire } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { getListUi } from "lightning/uiListApi";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import ACCOUNT_NAME_FIELD from "@salesforce/schema/Account.Name";

export default class AccountSpecialDetails extends LightningElement {
  @track recordList = [];
  @track fieldList = [];

  @wire(getListUi, {
    objectApiName: ACCOUNT_OBJECT,
    listViewApiName: "Special_Details",
    pageSize: 50
  })
  wiredListView({ error, data }) {
    if (data) {
      let fieldList = [];
      let recordList = [];
      //get all field api names in the configured order
      data.info.displayColumns.forEach(element => {
        let field = element.fieldApiName;
        //ignore concatenated fields like Owner.id for now
        if (field.indexOf(".") === -1) {
          fieldList.push(field);
        }
      });
      //just in case we don't have any fields we always display the record name
      if (fieldList.length === 0) {
        fieldList = [ACCOUNT_NAME_FIELD];
      }
      //create data structure which can be easily used in template
      data.records.records.forEach((recordData, index) => {
        let fieldValues = [];
        fieldList.forEach(fieldName => {
          fieldValues.push({
            "fieldName": fieldName,
            "fieldValue": recordData.fields[fieldName].value,
            "uniqueKey": fieldName + index
          });
        });

        //create data structure for the visual container
        let record = {};
        record.id = recordData.id;
        record.name = recordData.fields.Name.value;
        record.relativeLink = "/" + recordData.id;
        record.fieldValues = fieldValues;
        recordList.push(record);
      });

      this.fieldList = fieldList;
      this.recordList = recordList;
    } else if (error) {
      const evt = new ShowToastEvent({
        title: "ERROR",
        message: "An error occured!",
        variant: "error"
      });
      this.dispatchEvent(evt);
    }
  }
}
