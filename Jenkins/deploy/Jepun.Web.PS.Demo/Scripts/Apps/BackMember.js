/*! jepun 2018-03-29 */
$(document).ready(function(){var a=$("#FormBackMember").comm();a.addHandler("Ini",function(a){}),a.addHandler("GetMemberDetail",function(b){var c=$.parseJSON(b.obj);c.length>0&&a.formInject(c[0])}),a.getCtrl("IBackMember").on("click",function(a){a.preventDefault(),GlbAppModal.openModal($(this).text(),$(this).attr("data-jepun-view"),GlbEnv.args.toJSON())}),a.getCtrl("BtnQry").on("click",function(b){a.find("span").empty(),b.preventDefault();var c=a.getCtrl("Acc").val();a.callDataBus("BackMember/GetMemberDetail",{CNO:c})})});