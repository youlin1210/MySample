/*! jepun 2018-03-29 */
$(document).ready(function(){function a(a,c,d,f,g){var h={};h.url=jCom.urlPath("BackFundPerformanceOut/GetFundPerformanceOutAllT0"),h.reload=!0,h.QryStartDate=a,h.QryEndDate=c,h.QryType=d,h.QryStatus=f,h.FundPerformanceOutNo=g,$.when(e.addSelect("FundPerformanceOutNo",h)).then(function(){""!==GlbEnv.args.upcoming&&(e.getCtrl("FundPerformanceOutNo").filterSelect("-1",!0),$("#"+GlbEnv.args.upcoming+"Count").html(e.getCtrl("FundPerformanceOutNo").find("option").length)),0===g?e.getCtrl("FundPerformanceOutNo")[0].selectedIndex=0:e.getCtrl("FundPerformanceOutNo").val(g),b(e.getCtrl("FundPerformanceOutNo").val())})}function b(a){e.getCtrl("BtnIns2,BtnUpd2,BtnDel2,BtnUpd,BtnDel,NextFlow,BtnFlow").addClass("hidden"),null!==a&&void 0!==a&&(e.callDataBus("BackFundPerformanceOut/GetFundPerformanceOutT1",{FundPerformanceOutNo:a}),c(a,0))}function c(a,b){var c={};c.url=jCom.urlPath("BackFundPerformanceOut/GetFundPerformanceOutFundAllT3"),c.FundPerformanceOutNo=a,c.Num=b,c.reload=!0,$.when(e.addSelect("FundPerformanceOutFund",c)).then(function(){0===b?e.getCtrl("FundPerformanceOutFund")[0].selectedIndex=0:e.getCtrl("FundPerformanceOutFund").val(b),d(e.getCtrl("FundPerformanceOutNo").val(),e.getCtrl("FundPerformanceOutFund").val())})}function d(a,b){null!==a&&void 0!==a&&null!==b&&void 0!==b&&e.callDataBus("BackFundPerformanceOut/GetFundPerformanceOutFundT4",{FundPerformanceOutNo:a,Num:b})}var e=$("#FormBackFundPerformanceOut").comm();e.addHandler("Ini",function(b){jFun.client.isMobile?e.getCtrl("StartDate,EndDate,QryStartDate,QryEndDate,DT").prop("type","date"):(e.getCtrl("StartDate,EndDate,QryStartDate,QryEndDate,DT").prop("type","text").addClass("dpDate"),e.getCtrl("StartDate,EndDate,QryStartDate,QryEndDate,DT").datepicker({dateFormat:"yy/mm/dd",firstDay:0,changeYear:!0,changeMonth:!0,yearRange:"1900:2030"})),$.when(e.addSelect("QryStatus",jFun.getOptionsUrl("Status",1,"",!1)),e.addSelect("QryType",jFun.getOptionsUrl("Type",1,"",!1)),e.addSelect("AID",jFun.getProductOutSideOptionsT3())).then(function(){e.getCtrl("QryStatus")[0].selectedIndex=1,""!==GlbEnv.args.upcoming?(e.find(".jepun-upcoming").hide(),"Manager"===b.role?a(null,null,null,"1",0):a(null,null,null,"2",0)):a(null,null,null,"99",0)})}),e.addHandler("BtnIns",function(b){a(null,null,null,null,b.FundPerformanceOutNo)}),e.addHandler("BtnUpd",function(b){a(null,null,null,null,e.getCtrl("FundPerformanceOutNo").val())}),e.addHandler("BtnDel",function(b){a(null,null,null,null,0)}),e.addHandler("BtnInsFund",function(a){c(e.getCtrl("FundPerformanceOutNo").val(),a.Num)}),e.addHandler("BtnUpdFund",function(a){c(e.getCtrl("FundPerformanceOutNo").val(),a.Num)}),e.addHandler("BtnDelFund",function(a){c(e.getCtrl("FundPerformanceOutNo").val(),0)}),e.addHandler("GetFundPerformanceOutT1",function(a){initButton(e,a.obj,"FundPerformanceOutNo")}),e.addHandler("GetFundPerformanceOutFundT4",function(a){var b=$.parseJSON(a.obj);b.length>0&&$.when(e.addSelect("Fund",jFun.getProductOutSideOptionsT4(b[0].AID))).then(function(){e.formInject(b[0])})}),e.addHandler("NextFlow",function(b){""!==GlbEnv.args.upcoming?(e.find(".jepun-upcoming").hide(),"Manager"===b.role?a(null,null,null,"1",0):a(null,null,null,"2",0)):a(null,null,null,"99",0)}),e.getCtrl("AID").on("change",function(){var a=$(this),b=jFun.getProductOutSideOptionsT4(a.val());b.reload=!0,e.addSelect("Fund",b)}),e.getCtrl("FundPerformanceOutNo").on("click",function(a){a.preventDefault();var c=$(this);b(c.val()),e.getCtrl("Fund").val("-1"),e.getCtrl("M3,M6,M12,M24,M36,M60,TY,CR").val("0")}),e.getCtrl("QryFlow").on("click",function(a){a.preventDefault(),GlbAppModal.openModal("歷史流程","BackFlowDetail",{Type:22,Rno:e.getCtrl("FundPerformanceOutNo").val()})}),e.getCtrl("FundPerformanceOutFund").on("click",function(a){a.preventDefault();var b=$(this),c=e.getCtrl("FundPerformanceOutNo").val();d(c,b.val())}),e.getCtrl("BtnIns").on("click",function(a){a.preventDefault(),e.valid()&&e.callDataBus("BackFundPerformanceOut/Ins",e.formToJSON())}),e.getCtrl("BtnUpd").on("click",function(a){a.preventDefault();var b=e.formBeforeJSON();e.callDataBus("BackFundPerformanceOut/Upd",{model:e.formToJSON(b,!1),Oldmodel:e.formBeforeJSON()})}),e.getCtrl("BtnDel").on("click",function(a){a.preventDefault(),e.callDataBus("BackFundPerformanceOut/Del",{FundPerformanceOutNo:e.getCtrl("FundPerformanceOutNo").val(),NextType:"0",NextStatus:"7",Note:"",LogSN:e.getCtrl("LogSN").val()})}),e.getCtrl("BtnQry").on("click",function(b){b.preventDefault();var c=e.getCtrl("QryStartDate").val(),d=e.getCtrl("QryEndDate").val(),f=e.getCtrl("QryType").val(),g=e.getCtrl("QryStatus").val();a(c,d,f,g,0),e.getCtrl("FundPerformanceOutFund").html("")}),e.getCtrl("BtnIns2").on("click",function(a){a.preventDefault();var b=e.getCtrl("FundPerformanceOutNo").val();if(null===b||void 0===b)return void jCom.Alert("提醒","請選一個基金!!");if(null===e.getCtrl("M3,M6,M12,M24,M36,M60,TY,CR").val()||void 0===e.getCtrl("M3,M6,M12,M24,M36,M60,TY,CR").val()||"-1"===e.getCtrl("Fund").val())return void jCom.Alert("提醒","請輸入有效的值");var c=e.getCtrl("Fund").val(),d=c.split("@@")[1],f=c.split("@@")[2];e.getCtrl("CID").val(d),e.getCtrl("FID").val(f),e.callDataBus("BackFundPerformanceOut/InsFund",e.formToJSON())}),e.getCtrl("BtnUpd2").on("click",function(a){a.preventDefault();var b=e.getCtrl("FundPerformanceOutFund").val();if(null===b||void 0===b)return void jCom.Alert("提醒","請選一個據點!!");var c=e.getCtrl("Fund").val(),d=c.split("@@")[1],f=c.split("@@")[2];e.getCtrl("CID").val(d),e.getCtrl("FID").val(f),e.callDataBus("BackFundPerformanceOut/UpdFund",e.formToJSON())}),e.getCtrl("BtnDel2").on("click",function(a){a.preventDefault();var b=e.getCtrl("FundPerformanceOutNo").val(),c=e.getCtrl("FundPerformanceOutFund").val();return null===b||void 0===b||null===c||void 0===c?void jCom.Alert("提醒","請選一個公司名稱!!"):void e.callDataBus("BackFundPerformanceOut/DelFund",{FundPerformanceOutNo:b,Num:c,LogSN:e.getCtrl("LogSN").val()})}),e.getCtrl("BtnFlow").on("click",function(a){$(this);a.preventDefault();var b=e.getCtrl("FundPerformanceOutFund").val();if(null===b||void 0===b)return void jCom.Alert("提醒","請輸入一筆公司!!");var c=e.getCtrl("NextFlow").val().split("@@"),d={};return d.FundPerformanceOutNo=e.getCtrl("FundPerformanceOutNo").val(),d.NextType=c[0],d.NextStatus=c[1],d.Note="",d.EndDate=e.getCtrl("EndDate").val(),d.LogSN=e.getCtrl("LogSN").val(),"1"===c[0]&&""===e.getCtrl("EndDate").val()?void jCom.Alert("提醒","下架日必須填"):void e.callDataBus("BackFundPerformanceOut/NextFlow",d)})});