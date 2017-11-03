Current.HSE_IncidentTrackingData1.txtNameOfContact16appointee = Mstm.SelectSql(new Metastorm.Runtime.Models.WISPALibrary.WISPADB(), "select [16.2 contractor name] from ViewPackage where Wobj_Name like '%"+ Current.HSE_IncidentTrackingData1.txtPackage + "'", null).Text;
string sqlCmd = string.Empty;

if(!Current.HSE_IncidentTrackingData1.txtMetPrincipleContractor.ToString().Contains("Medupi"))
{
  sqlCmd = "select (CASE WHEN '" + HSE_IncidentTrackingData1.txtFlashReportType +"' = 'Environmental' THEN [team medupi environmental representative name] ELSE [Team medupi safety representative name] END) from ViewPackage where Wobj_Name like '%" + HSE_IncidentTrackingData1.txtPackage +"'";
 Current.HSE_IncidentTrackingData1.txtPracticioner = Mstm.SelectSql(new Metastorm.Runtime.Models.WISPALibrary.WISPADB(), sqlCmd, null).Text;
 sqlCmd = "select (CASE WHEN '" + HSE_IncidentTrackingData1.txtFlashReportType +"' = 'Environmental' THEN [Team Medupi environmental representative Username] ELSE [Team Medupi safety representative UserName] END) from ViewPackage where Wobj_Name like '%" + HSE_IncidentTrackingData1.txtPackage +"'"; 
 Current.HSE_IncidentTrackingData1.memHSEPractitioner = Mstm.SelectSql(new Metastorm.Runtime.Models.WISPALibrary.WISPADB(), sqlCmd, null).Text;
 if(Current.HSE_IncidentTrackingData1.txtPracticioner == "")
 {
  //this is incase the practitioner isn't filled out, it goes to the Env/H&S Manager
  if(Current.HSE_IncidentTrackingData1.txtFlashReportType == "Environmental")
  {
   sqlCmd = "select [person name] from vw_HSE_StaticRoles where Rolename = 'Environmental Manager'";
   Current.HSE_IncidentTrackingData1.txtPracticioner = Mstm.SelectSql(new MetastormDefault(), sqlCmd, null).Text;
   sqlCmd = "select Username from vw_HSE_StaticRoles where Rolename = 'Environmental Manager'";
   Current.HSE_IncidentTrackingData1.memHSEPractitioner = Mstm.SelectSql(new MetastormDefault(), sqlCmd, null).Text;
  }
  else
  {
   sqlCmd = "select [person name] from vw_HSE_StaticRoles where Rolename = 'H&S Manager'";
   Current.HSE_IncidentTrackingData1.txtPracticioner = Mstm.SelectSql(new MetastormDefault(), sqlCmd, null).Text;
   sqlCmd = "select Username from vw_HSE_StaticRoles where Rolename = 'H&S Manager'";
   Current.HSE_IncidentTrackingData1.memHSEPractitioner = Mstm.SelectSql(new MetastormDefault(), sqlCmd, null).Text;
  }  
 }
}
else
{
 if(Current.HSE_IncidentTrackingData1.txtFlashReportType == "Environmental")
 {
  sqlCmd = "select [person name] from vw_HSE_StaticRoles where Rolename = 'Environmental Manager'";
  Current.HSE_IncidentTrackingData1.txtPracticioner = Mstm.SelectSql(new MetastormDefault(), sqlCmd, null).Text;
  sqlCmd = "select Username from vw_HSE_StaticRoles where Rolename = 'Environmental Manager'";
  Current.HSE_IncidentTrackingData1.memHSEPractitioner = Mstm.SelectSql(new MetastormDefault(), sqlCmd, null).Text;
 }
 else
 {
  sqlCmd = "select [person name] from vw_HSE_StaticRoles where Rolename = 'H&S Manager'";
  Current.HSE_IncidentTrackingData1.txtPracticioner = Mstm.SelectSql(new MetastormDefault(), sqlCmd, null).Text;
  sqlCmd = "select Username from vw_HSE_StaticRoles where Rolename = 'H&S Manager'";
  Current.HSE_IncidentTrackingData1.memHSEPractitioner = Mstm.SelectSql(new MetastormDefault(), sqlCmd, null).Text;
 }
}