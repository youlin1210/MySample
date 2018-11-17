/*! jepun 2018-03-29 */
$(document).ready(function(){var a=$("#FormBackFlowDetail").comm();a.addHandler("Ini",function(b){a.getCtrl("flowDetail").html(""),a.setHtml("flowDetail",b.flow)})});