trigger OppTrigger on Opportunity (before insert,after insert,after update) {

    if(trigger.isAfter){
        if(trigger.isInsert){
            set<id> oppId = new set<id>();
            map<id,Opportunity> oppMap = new map<id,Opportunity>();
            list<opportunity> opplist = new list<opportunity>();
            for(opportunity opp : trigger.new){
                if(opp.stagename == 'closed lost' ){
                   oppId.add(opp.id);
                   oppMap.put(opp.id, opp); 
                    opplist.add(opp);
                }
            }
           // list<id> oppidlst = new list<id>(oppId); // converting set to list
           // delete opplist;  Delete is not possible at trigger.new
           
            if(OppId.size()>0){
           //BatchOppHelper deleteJob = new BatchOppHelper();
           //deleteJob.setId(oppId);
           BatchOppHelper deleteJob = new BatchOppHelper(oppId);			//when set was input parameter
          
          // BatchOppHelper deleteJob = new BatchOppHelper(oppMap);			//when map was input parameter
                
           Id jobId = Database.executeBatch(deleteJob); //Method does not exist or incorrect signature: void executeBatch(BatchOppHelper) from the type System
           //System.executeBatch(deleteJob);
           }
        }
        
        /////////////////////////////////////////////////////////////////////////////////////
        
    }    
        
       // if(trigger.isUpdate){
           
       // }
    
}