@isTest
public class OppTriggerTest {
	@testSetup
    public static void generateTestData(){
    	list<opportunity> opplist = new list<opportunity>();
		for(integer i = 0; i<5; i++){
    		opportunity opp = new opportunity();
    		opp.name = 'Some Opportunity '+i;
    		opp.CloseDate = date.today().addMonths(1);
			opp.stagename = 'closed lost';
    		system.debug('Opp '+ opp);
    		opplist.add(opp);
		}
	insert opplist;
    }
    
    @isTest
    public static void executeTest(){
        Test.startTest();
        OppTriggerTest.generateTestData();
        Test.stopTest();
        //system.assert();
    }
}