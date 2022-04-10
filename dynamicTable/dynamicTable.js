import { LightningElement, track } from 'lwc';

export default class WeekendPracticeContainer extends LightningElement {
    
    indexNo = 1;

    @track inputList = [{
        sNo:1,
        conName:'',
        conEmail:'',
        conCountry:'',
        render:0
    }];

    // handle add new row 
    handleAdd(event){
        console.log('@@@@## add new row');
        this.indexNo=this.inputList.length+1;
        let newObjRecd = [{sNo:this.indexNo,conName:'',conEmail:'',conCountry:'',render:1}];
        this.inputList = this.inputList.concat(newObjRecd);
    }

    // handle remove row 
    handleRemove(event){
        if(this.inputList.length>1){
            console.log('REMOVE ROW NO: ');
            console.log(event.target.accessKey);
            let removingRow =event.target.accessKey;
            // filter out 
            this.inputList = this.inputList.filter(item=>{
                return item.sNo!=event.target.accessKey;
            });

            // correct serial No.
            let newInputList =  this.inputList.map((item)=>{
                let newSr = item.sNo>removingRow?item.sNo-1:item.sNo;
                return {...item,sNo:newSr};
            });

            console.log('@@@ NEW ARRAY ');
            console.log(newInputList);
            this.inputList = newInputList;

        }
        else
            console.log('NO ROW TO REMOVE');
    }

    // get headder
    get headder(){
        return 'Default Header';
    }

    
}
