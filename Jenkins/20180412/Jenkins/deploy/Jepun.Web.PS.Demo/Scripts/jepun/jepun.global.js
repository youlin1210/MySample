/*! jepun 2018-03-29 */
function GlbChkAreaExpanded(a){return bs_layout_navbar_collapse_2.collapse("hide"),GlbFfunName.text(a),a}function GlbAppendSubFunName(a){var b=GlbFfunName.text().split("-")[0]+"-"+a;return GlbFfunName.text(b),b}function glbRunTime(){GlbsystemTime+=1e3,glbShowTime(GlbsystemTime)}function glbShowTime(){var a=new Date(GlbsystemTime),b="0"+a.getFullYear(),c="0"+(a.getMonth()+1),d="0"+a.getDate(),e="0"+a.getHours(),f="0"+a.getMinutes(),g="0"+a.getSeconds();e=e.substring(e.length-2,e.length+1),f=f.substring(f.length-2,f.length+1),g=g.substring(g.length-2,g.length+1),b=b.substring(1,b.length+1),c=c.substring(c.length-2,c.length+1),d=d.substring(d.length-2,d.length+1),a=b+"/"+c+"/"+d+" "+e+":"+f+":"+g,$("[name=GlbServerTime]").html(a),setTimeout("glbRunTime()",1e3)}function glbChkFundRisk(a,b){jCom.ajax("Common/glbChkFundRisk",{__RequestVerificationToken:GlbEnv.token(),fundData:a},function(a){console.log(b),a.length>0&&GlbAppModal.openModal(a,"AccRisk",{FormName:b})})}var GlbAlertModal=$("#GlbAlertModal"),GlbAppModal=$("#GlbAppModal"),GlbAppModalSub=$("#GlbAppModalSub"),GlbLoadingModal=$("#GlbLoadingModal"),GlbUserTimeoutModal=$("#GlbUserTimeoutModal"),GlbPermissionModal=$("#GlbPermissionModal"),GlbFfunName=$("#GlbFfunName"),bs_layout_navbar_collapse_2=$("#bs-layout-navbar-collapse-2"),GlbHomeMain=$("#GlbHomeMain"),GlbFormLayout=$("#FormLayout"),GlbsystemTime=parseInt($("#TotalMillissceconds").val()),GlbEnv=new jCom.Env({isLogin:!0,formId:"FormLayout"});Object.freeze(GlbEnv),glbShowTime();var GlbDragDrop=function(){function a(a){a=jCore.eventUtil.getEvent(a);var f=jCore.eventUtil.getTarget(a);switch(a.type){case"mousedown":if(!f.className)return;if(f.className.baseVal)return;f.className.indexOf("draggable")>-1&&(c=f,d=a.clientX-f.offsetLeft,e=a.clientY-f.offsetTop,b.fire({type:"dragstart",target:c,x:a.clientX,y:a.clientY}));break;case"mousemove":null!==c&&(c.style.left=a.clientX-d+"px",c.style.top=a.clientY-e+"px",b.fire({type:"drag",target:c,x:a.clientX,y:a.clientY}));break;case"mouseup":if(!f.className)return;if(f.className.baseVal)return;f.className.indexOf("draggable")>-1&&(b.fire({type:"dragend",target:c,x:a.clientX,y:a.clientY}),c=null)}}var b=new jCore.EventTarget,c=null,d=0,e=0;return b.enable=function(){jCore.eventUtil.addHandler(document,"mousedown",a),jCore.eventUtil.addHandler(document,"mousemove",a),jCore.eventUtil.addHandler(document,"mouseup",a)},b.disable=function(){jCore.eventUtil.removeHandler(document,"mousedown",a),jCore.eventUtil.removeHandler(document,"mousemove",a),jCore.eventUtil.removeHandler(document,"mouseup",a)},b}(),GlbSecurity=function(){function a(a){a=jCore.eventUtil.getEvent(a);var d=jCore.eventUtil.getTarget(a),e=jCore.eventUtil.getCharCode(a);switch(console.log(a.type),a.type){case"load":window.clipboardData&&b(c),jCore.eventUtil.preventDefault(a),jCore.eventUtil.setClipboardText(a,"No copy permissions!!");break;case"copy":jCore.eventUtil.preventDefault(a),jCore.eventUtil.setClipboardText(a,"No copy permissions!!");break;case"keyup":44===e&&l.modal("show");break;case"click":case"focus":p=n;break;case"blur":window.clipboardData?p=o:jCom.Alert("info","No PrtScr permissions!!");break;case"visibilitychange":m=!!document.hidden;break;case"dragstart":if(!d.className)return;if(d.className.baseVal)return;if(d.className.indexOf("draggable")>-1)return;jCom.Alert("warning","No "+a.type+" permissions!!"),jCore.eventUtil.preventDefault(a);break;case"selectstart":case"contextmenu":case"beforeprint":jCom.Alert("warning","No "+a.type+" permissions!!"),jCore.eventUtil.preventDefault(a)}}function b(a,b){try{window.clipboardData.setData("text","Jepun know your needs!!")}catch(c){console.error(c.message)}setTimeout(function(){a.call(b),setTimeout(arguments.callee,p)},p)}function c(){try{if(m)return;null===window.clipboardData.getData("text")&&(window.clipboardData.clearData("text"),window.clipboardData.setData("text","Jepun know your needs!!"),l.modal("show"))}catch(a){console.error(a.message)}}var d={},e=!1,f=!0,g=!1,h=!1,i=!0,j=!1,k=!1,l=GlbPermissionModal,m=!1,n=1200,o=10,p=o,q="";return d.enable=function(b){b&&(e=b.CanCopy||!1,f=b.CanPrtScr||!1,g=b.CanPrint||!1,h=b.CanRightClick||!1,i=b.CanSelect||!0,j=b.CanDrag||!1,k=b.CanSpecialPerson||!1),q="",q+="<li><a href='#' >canSelect:"+i+"</a></li>",i||jCore.eventUtil.addHandler(document,"selectstart",a),q+="<li><a href='#' >canDrag:"+j+"</a></li>",j||jCore.eventUtil.addHandler(document,"dragstart",a),q+="<li><a href='#' >canRightClick:"+h+"</a></li>",h||jCore.eventUtil.addHandler(document,"contextmenu",a),q+="<li><a href='#' >canPrint:"+g+"</a></li>",g?$("head").append("<style type='text/css'>@media print{.jepun-noprint { display: none; }}</style>"):($("head").append("<style type='text/css'>@media print{body {display:none;}}</style>"),jCore.eventUtil.addHandler(document,"beforeprint",a)),q+="<li><a href='#' >canCopy:"+e+"</a></li>",e||jCore.eventUtil.addHandler(document,"copy",a),q+="<li><a href='#' >canPrtScr:"+f+"</a></li>",f||(jCore.eventUtil.addHandler(document,"click",a),jCore.eventUtil.addHandler(document,"visibilitychange",a),jCore.eventUtil.addHandler(document,"keyup",a),jCore.eventUtil.addHandler(window,"focus",a),jCore.eventUtil.addHandler(window,"blur",a),jCore.eventUtil.addHandler(window,"load",a)),q+="<li role='separator' class='divider'></li>",q+="<li><a href='#' >限閱戶:"+k+"</a></li>",$(".jepun-security-icon").show().find(".dropdown-menu").empty().html(q)},d.disable=function(){jCore.eventUtil.removeHandler(document,"selectstart",a),jCore.eventUtil.removeHandler(document,"dragstart",a),jCore.eventUtil.removeHandler(document,"contextmenu",a),jCore.eventUtil.removeHandler(document,"beforeprint",a),jCore.eventUtil.removeHandler(document,"copy",a),jCore.eventUtil.removeHandler(document,"click",a),jCore.eventUtil.removeHandler(document,"visibilitychange",a),jCore.eventUtil.removeHandler(document,"keyup",a),jCore.eventUtil.removeHandler(window,"focus",a),jCore.eventUtil.removeHandler(window,"blur",a),jCore.eventUtil.removeHandler(window,"load",a)},d.debug=function(){$(".jepun-security-icon").find(".btn-info").show().on("click",function(){var a=$(".jepun-security-icon").find(".glyphicon");a.hasClass("glyphicon-eye-open")?(a.removeClass("glyphicon-eye-open").addClass("glyphicon-eye-close"),d.disable(),$(".jepun-security-icon").hide(),jCom.Alert("info","Security disable!!")):(a.removeClass("glyphicon-eye-close").addClass("glyphicon-eye-open"),d.enable(GlbUserRight),jCom.Alert("info","Security enable!!"))})},d}(),glbDownloadReport=function(a){var b=$("#DefTargetForm");b.attr("action",jCom.urlPath("Common","DownloadReport")),0===b.find("input[name='__RequestVerificationToken']").length&&b.append($("<input type='hidden' name='__RequestVerificationToken' />").val(GlbEnv.token())),b.getCtrl("RptName").val(a),b.submit()},glbPrintReport=function(a){var b=$("#DefTargetForm");b.attr("action",jCom.urlPath("Common","Print")),0===b.find("input[name='__RequestVerificationToken']").length&&b.append($("<input type='hidden' name='__RequestVerificationToken' />").val(GlbEnv.token())),b.getCtrl("DataString").val(a),b.submit()},glbUserTimeout=function(){var a=GlbUserTimeoutModal;a.find(".modal-body").css("line-height","38px").css("display","inline-block").addClass("text-error").html(GlbLabelTxt.UserTimeout),a.find(".modal-body > span").css("width","60px").css("display","inline-block").css("text-align","center").countDown({startNumber:30,callBack:function(){$("#GlbLogout").click()}}),a.find(".modal-footer > button").on("click",function(){jCom.dataBus("Home/Continue"),a.find(".modal-body").empty()}),a.modal("show")},glbLoading=function(){var a=function(a){var b=GlbUserTimeoutModal;b.modal("hide"),b.find(".modal-body").empty(),GlbLoadingModal.attr("class",a),jCore.throttle(glbUserTimeout,null,GlbSetting.Timeout-6e4)};return a("hide"),a}(),glbGetServerTime=function(){new Date($("[name=GlbServerTime]").html());jCore.throttle(glbGetServerTime,null,1e3)};$(document).ajaxStart(function(){jCore.throttle(glbLoading,null,800,"Jepun-loading")}).ajaxStop(function(){clearTimeout(glbLoading.tId),glbLoading("")}),GlbSetting.Watermark&&($("body").watermark(),GlbAlertModal.watermark(),GlbAppModal.watermark(),GlbAppModalSub.watermark(),GlbUserTimeoutModal.watermark(),GlbPermissionModal.watermark()),$("body").goTop({bottom:55,right:10}),GlbAppModal.goTop({bottom:55,right:25}),GlbAppModalSub.goTop({bottom:55,right:25}),$(window).on("resize",function(){jCore.throttle(function(){$(".fixedHeader").fixedHeader()})}),GlbAppModal.scroll(function(){$(".ui-autocomplete").css("display","none")}),window.onbeforeunload=function(){return"交易尚未完成，是否確認關閉頁面?"},window.onunload=function(){};