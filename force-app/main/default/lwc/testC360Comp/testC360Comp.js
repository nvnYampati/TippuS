import { LightningElement, api, wire, track } from 'lwc';

import fetchAccounts from '@salesforce/apex/testApexController.getAccounts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class TestC360Comp extends LightningElement {

    @wire(fetchAccounts) accountsList;


    @api recordId;
    @api enteredValue;
    @api accountsResponseList;
    @track actions = [ {
        'label': 'View Account',
        'name': 'view'
    } ,
    {
        'label': 'Edit Account',
        'name': 'edit'
    },
    {
        'label': 'Delete Account',
        'name': 'delete'
    }
];
    @api columns = [
                    { label: 'Account Name', fieldName: 'Name', type: 'text' },
                    { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'text' },
                    {type : 'action', typeAttributes : { rowActions : this.actions}} //Adding Action Column to the Table
                    ];

                    
                                 
                    
    connectedCallback(){ 
        // Logic on Load of the Component
        console.log('Connected Call Back is Loaded');
    }

    renderedCallback(){
        // Logic when something changes on the componet
        console.log('Rendered Call Back is Loaded');
    }

    searchEntered(event){
        console.log('Search Entered');
        console.log('Entered Value : '+this.enteredValue);
        this.enteredValue = event.target.value;
        console.log(event.target.value);
        console.log(event.target.label);
        console.log(event.target.type);
        setTimeout(() => {
            console.log('Started Searching');
            console.log('Current Table Information'+JSON.stringify(this.accountsResponseList));

            console.log('Filtering the data');
            let currentData = this.accountsResponseList;
            let modifiedData = [];
            for(var r = 0; r < currentData.length ; r++){
                if (currentData[r].Name.toLowerCase().includes(this.enteredValue.toLowerCase())) //Check if searh term matches the condition
                {
                    modifiedData.push(currentData[r]); // Push matching account into the JS Array
                }
            }

            console.log('Reset the Table data');
            this.accountsResponseList =  modifiedData;
            console.log('End Searching'+JSON.stringify(this.accountsResponseList));
        }, 3000);
    }

    handleRowAction( event ) {

        const actionName = event.detail.action.name;
        const row = event.detail.row;
        console.log('**action'+actionName);
        console.log('**row'+row.Id);
        if(actionName == 'edit'){
            this[NavigationMixin.GenerateUrl]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: row.Id,
                    actionName: 'edit',
                },
            }).then((url) => {
                this.recordPageUrl = url;
            });
        }
        if(actionName == 'view'){
           /* this[NavigationMixin.Navigate]({ // LWC Standard Navigation Functionality
                type: 'standard_recordPage',
                attributes : {
                    recordId : '015j000009OlR2AAK',
                    actionName : 'view'
                }
            });*/
            this[NavigationMixin.GenerateUrl]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: row.Id,
                    actionName: 'view',
                },
            }).then((url) => {
                this.recordPageUrl = url;
            });
        }
        if(actionName == 'delete'){
            
        }

    }


buttonClicked(){

   
        console.log('Button Clicked');
        console.log('Current Value : '+this.enteredValue);
        //console.log('Fecthed Accounts'+JSON.stringify(this.accountsList));
	// Imperatively
        fetchAccounts().
        then(
            result => {
                console.log(result);
                // Delcare an empty JS Array
                this.accountsResponseList = [];

                // Iterate over Result
                for(var r = 0; r < result.length ; r++){
                    console.log(JSON.stringify(result[r].Name+'--'+result[r].AnnualRevenue));
                    this.accountsResponseList.push(result[r]); // Push every account into the JS Array
                }


                if(result === null){
                    console.log('Exception occurred!!');
                }
            }
        ).catch(
            error => {
                console.log('Error is '+error);
                const evt = new ShowToastEvent({
                    title: 'Error Occuured!!',
                    message: error.body.message+'--'+error.body.stackTrace,
                    variant: 'error',
                });
                this.dispatchEvent(evt);
            }
        );
    }

    getSelectedRow(event){ // To Perform Mass Actions on Records
        const selectedRows = event.detail.selectedRows;
        console.log(JSON.stringify(selectedRows));
    }


}