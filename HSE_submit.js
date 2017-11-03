 //add a check to make sure injured people are not added for a non-injury class
//Check if Flash Report isn't complete
var IsHistoric = GetField("chkIsHistoric", "");
if(IsHistoric=="false")
{
 var CurrentStatus = GetField("chkFlashReportComplete", "");
 var CurrentAction = GetField("ActionName", "");
 if((CurrentStatus == "false") && (CurrentAction == "SubmitFlashReport"))
 {
  myBooleanVariable = newConfirm('Confirm','You have not marked the Flash Report complete. Is the Flash Report complete and do you want to submit it to the relevant Team Medupi Practitioner?',2,0,0);
  //alert("retval is: " + retVal);

  //var Confirmed = confirm("You have not marked the Flash Report complete. Is the Flash Report complete and do you want to submit it to the relevant Team Medupi Practitioner? To save the Flash Report for updating later click Cancel");
  if(retVal == true)
  {
   SetField("chkFlashReportComplete", "", "True");
  }
  else
  {
   SetField("chkFlashReportComplete", "", "False");
  }
 }
}
else
{
 SetField("chkFlashReportComplete", "", "True");
}

//debugger;
var FID = GetField("FolderId","");
var RowCount = eworkGetRowCount("gridInvolvedPeople");
var RowID = parseFloat(GetField("intPersonRows",""));
var CurrentRow = 0;
var NoErrors = "True";

// counters to check roles
var countFirstAid = 0;
var countMedical = 0;
var countLTI = 0;
var countFatality = 0;
var countMultiple = 0;
var countOccDisease = 0;

if(RowCount==0)
{
 NoErrors= "False";
 alert("Please enter at least one Involved Person or Witness");
 SetField("chkFlashReportComplete", "", "False");
}
else
{
 while(CurrentRow < RowCount)
 {
  //eworkGetCell("[Grid Name]", [Column] , [Row]);
  //var TempValue = eworkGetCell("gridInvolvedPeople", 9, CurrentRow); - checked in Involved Persons admin form
  //var TempName =  eworkGetCell("gridInvolvedPeople", 0, CurrentRow); - checked in Involved Persons admin form
  var TempRole =  eworkGetCell("gridInvolvedPeople", 1, CurrentRow);
  //var TempContractor =  eworkGetCell("gridInvolvedPeople", 4, CurrentRow); - checked in Involved Persons admin form
 
  //increase count of First Aid, Medical, LTI or fatality
  if (TempRole == "First Aid")
   countFirstAid = countFirstAid + 1;
   else if (TempRole == "Medical (No lost time)")
    countMedical = countMedical + 1;
  else if (TempRole == "Lost Time Injury (LTI)")
     countLTI = countLTI + 1;
   else if (TempRole == "Fatality")
      countFatality = countFatality + 1;
   else if (TempRole == "Occupational Disease")
      countOccDisease = countOccDisease + 1;

  CurrentRow = CurrentRow + 1;
 }
}


//Checking the date/time variable
var selectedTime = GetField("dteIncidentDate", "");
//Check to see if the time contains 00:00:00 which is midnight, meaning the person did not select a time and accepted the default
if(selectedTime.indexOf("00:00:00") != -1)
{
 //alerting the user to select a valid time
 alert("Please select a valid time that the Incident occurred");
 //cancel submission of the form (this should be a handled exception)
 NoErrors= "False";
 SetField("chkFlashReportComplete", "", "False");
}

//need to see which category is selected 

if ((GetField("drpClassHS","") == "First Aid") && (countFirstAid == 0))
{
 alert("You have classified this as a First Aid incident - please select at least one person to have the role 'First Aid'");
 //cancel submission of the form (this should be a handled exception)
 NoErrors= "False";
 SetField("chkFlashReportComplete", "", "False");
}

if ((GetField("drpClassHS","") == "Medical (No lost time)") && (countMedical == 0))
{
 alert("You have classified this as a Medical incident - please select at least one person to have the role 'Medical'");
 //cancel submission of the form (this should be a handled exception)
 NoErrors= "False";
 SetField("chkFlashReportComplete", "", "False");
}

if ((GetField("drpClassHS","") == "Lost Time Injury (LTI)") && (countLTI == 0))
{
 alert("You have classified this as an LTI incident - please select at least one person to have the role 'LTI'");
 //cancel submission of the form (this should be a handled exception)
 NoErrors= "False";
 SetField("chkFlashReportComplete", "", "False");
}

if((GetField("drpClassHS","") == "Fatality") && (countFatality == 0))
{
 alert("You have classified this as a Fatality incident - please select at least one person to have the role 'Fatality'");
 //cancel submission of the form (this should be a handled exception)
 NoErrors= "False";
 SetField("chkFlashReportComplete", "", "False");
}

if((GetField("drpClassHS","") == "Occupational Disease") && (countOccDisease == 0))
{
 alert("You have classified this as an Occupational Disease - please select at least one person to have the role 'Occupational Disease'");
 //cancel submission of the form (this should be a handled exception)
 NoErrors= "False";
 SetField("chkFlashReportComplete", "", "False");
}

if(GetField("drpClassHS","") == "Multiple Cases") 
{
 countMultiple = countFirstAid + countMedical + countLTI + countFatality;
 if (countMultiple <=1)
  {
 alert("You have classified this as a Multiple Cases incident - please make sure you have more than 1 person with the roles 'First Aid', 'Medical (No lost time)', 'Lost Time Injury (LTI)' or 'Fatality'");
 //cancel submission of the form (this should be a handled exception)
 NoErrors= "False";
 SetField("chkFlashReportComplete", "", "False");
 }
}

 if(NoErrors=="True")
 {
  document.getElementById('cmdFinalSave').click(); 
 }
 
