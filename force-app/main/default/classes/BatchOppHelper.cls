global class BatchOppHelper implements Database.Batchable<sObject>, Database.Stateful{
    set<id> idSet = new set<id>();
     //map<id,Opportunity> OppMap = new map<id,Opportunity>();
   
    public BatchOppHelper(set<id> OppId){
        idSet = OppId;
    }
    /*
    public BatchOppHelper(map<id,Opportunity> inputMap){
        this.OppMap = inputMap;
    }*/
    /*global void setId(set<id> OppId){
        this.idSet = OppId;					//overloaded the class constructor instead
    }*/
    
    global Database.QueryLocator start(Database.BatchableContext bc) {
        // collect the batches of records or objects to be passed to execute
        string QueryString = 'SELECT Id FROM Opportunity WHERE Id IN :idSet';
        return database.getQueryLocator(QueryString);
    }
    global void execute(Database.BatchableContext bc, List<Opportunity> opplist){
        // process each batch of records
        // delete opplist;  
        database.delete(opplist, true);
    }
    global void finish(Database.BatchableContext bc){
        // execute any post-processing operations
        system.debug('deleted');
    }
}