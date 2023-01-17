trigger AccountManager on Account (before insert, before update) {
    
    if(trigger.isUpdate && trigger.isBefore){ //dont update any account with pending cases
		for(Account acc : trigger.new){
        	list<case> caseList = [SELECT id, status FROM case WHERE AccountId = :Acc.id AND Status NOT IN ('Closed')];
        	if(caseList.size()>0){
            	acc.addError('Cant update an Account with Pending Cases');
        	}
		}   
    }
}