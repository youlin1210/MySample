/*! jepun 2018-03-29 */
$(document).ready(function(){function a(a,d,e,f,g){var h={};h.url=jCom.urlPath("BackFeeRate/GetFeeRateAllT0"),h.reload=!0,h.QryStartDate=a,h.QryEndDate=d,h.QryType=e,h.QryStatus=f,h.FeeRateNo=g,$.when(c.addSelect("FeeRateNo",h)).then(function(){""!==GlbEnv.args.upcoming&&(c.getCtrl("FeeRateNo").filterSelect("-1",!0),$("#"+GlbEnv.args.upcoming+"Count").html(c.getCtrl("FeeRateNo").find("option").length)),0===g?c.getCtrl("FeeRateNo")[0].selectedIndex=0:c.getCtrl("FeeRateNo")[0].selectedIndex=1,b(c.getCtrl("FeeRateNo").val())})}function b(a){c.getCtrl("BtnUpd,BtnDel,NextFlow,BtnFlow").addClass("hidden"),null!==a&&void 0!==a&&c.callDataBus("BackFeeRate/GetFeeRateT1",{FeeRateNo:a})}var c=$("#FormBackFeeRate").comm();c.addHandler("Ini",function(b){jFun.client.isMobile?c.getCtrl("StartDate,EndDate,QryStartDate,QryEndDate").prop("type","date"):(c.getCtrl("StartDate,EndDate,QryStartDate,QryEndDate").prop("type","text").addClass("dpDate"),c.getCtrl("StartDate,EndDate,QryStartDate,QryEndDate").datepicker({dateFormat:"yy/mm/dd",firstDay:0,changeYear:!0,changeMonth:!0,yearRange:"1900:2030"})),$.when(c.addSelect("QryStatus",jFun.getOptionsUrl("Status",1,"",!1)),c.addSelect("QryType",jFun.getOptionsUrl("Type",1,"",!1)),c.addSelect("TradeType",jFun.getOptionsUrl("TradeType",1)),c.addSelect("CNO",jFun.getOptionsUrl("CNO",1))).then(function(){c.getCtrl("QryStatus")[0].selectedIndex=1,""!==GlbEnv.args.upcoming?(c.find(".jepun-upcoming").hide(),"Manager"===b.role?a(null,null,null,"1",0):a(null,null,null,"2",0)):a(null,null,null,"99",0)})}),c.addHandler("BtnIns",function(b){a(null,null,null,null,b.FeeRateNo)}),c.addHandler("BtnUpd",function(b){a(null,null,null,null,c.getCtrl("FeeRateNo").val())}),c.addHandler("BtnDel",function(b){a(null,null,null,null,0)}),c.addHandler("GetFeeRateT1",function(a){initButton(c,a.obj,"FeeRateNo")}),c.addHandler("NextFlow",function(b){""!==GlbEnv.args.upcoming?(c.find(".jepun-upcoming").hide(),"Manager"===b.role?a(null,null,null,"1",0):a(null,null,null,"2",0)):a(null,null,null,"99",0)}),c.getCtrl("FeeRateNo").on("click",function(a){a.preventDefault();var c=$(this);b(c.val())}),c.getCtrl("QryFlow").on("click",function(a){a.preventDefault(),GlbAppModal.openModal("歷史流程","BackFlowDetail",{Type:16,Rno:c.getCtrl("FeeRateNo").val()})}),c.getCtrl("BtnIns").on("click",function(a){a.preventDefault(),c.valid()&&c.formXhrDataBus("BackFeeRate/Ins")}),c.getCtrl("BtnUpd").on("click",function(a){a.preventDefault();var b=c.formBeforeJSON();c.callDataBus("BackFeeRate/Upd",{model:c.formToJSON(b,!1),Oldmodel:c.formBeforeJSON()})}),c.getCtrl("BtnDel").on("click",function(a){a.preventDefault(),c.callDataBus("BackFeeRate/Del",{FeeRateNo:c.getCtrl("FeeRateNo").val(),NextType:"0",NextStatus:"7",Note:"",LogSN:c.getCtrl("LogSN").val()})}),c.getCtrl("BtnQry").on("click",function(b){b.preventDefault();var d=c.getCtrl("QryStartDate").val(),e=c.getCtrl("QryEndDate").val(),f=c.getCtrl("QryType").val(),g=c.getCtrl("QryStatus").val();a(d,e,f,g,0)}),c.getCtrl("BtnFlow").on("click",function(a){$(this);a.preventDefault();var b=c.getCtrl("NextFlow").val().split("@@"),d={};return d.FeeRateNo=c.getCtrl("FeeRateNo").val(),d.NextType=b[0],d.NextStatus=b[1],d.Note="",d.EndDate=c.getCtrl("EndDate").val(),d.LogSN=c.getCtrl("LogSN").val(),"1"===b[0]&&""===c.getCtrl("EndDate").val()?void jCom.Alert("提醒","下架日必須填"):void c.callDataBus("BackFeeRate/NextFlow",d)})});