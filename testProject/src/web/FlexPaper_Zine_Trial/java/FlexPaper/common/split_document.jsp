<!doctype html>
<%@ page import = "lib.common" %>
<%
common conf = new common();
if(conf.getConfig("password")==null){
	response.sendRedirect("../index.jsp");
}
String doc = request.getParameter("doc");
String startdocument = doc;
if(doc != null)
	doc = (doc.lastIndexOf(".") < 0 ? doc : doc.substring(0, doc.lastIndexOf(".")));
else {
	doc = "Report";
	startdocument = "Paper.pdf";
}
String pdfFilePath = conf.separate(conf.getConfig("path.pdf", ""));
String ser = "../";
%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">	
<head>
	<title>FlexPaper AdaptiveUI JSP Example</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="initial-scale=1,user-scalable=no,maximum-scale=1,width=device-width" />
	<style type="text/css" media="screen">
		html, body	{ height:100%; }
		body { margin:0; padding:0; overflow:auto; }
		#flashContent { display:none; }
	</style>
	
	<link rel="stylesheet" type="text/css" href="<%=ser%>css/flexpaper.css" />
	<script type="text/javascript" src="<%=ser%>js/jquery.min.js"></script>
	<script type="text/javascript" src="<%=ser%>js/jquery.extensions.min.js"></script>
	<script type="text/javascript" src="<%=ser%>js/flexpaper.js"></script>
	<script type="text/javascript" src="<%=ser%>js/flexpaper_handlers.js"></script>
</head>
<body>
	<div id="documentViewer" class="flexpaper_viewer" style="position:absolute;left:10px;top:10px;width:770px;height:500px"></div>
	<script type="text/javascript">   
		function getDocumentUrl(document){
			var numPages = <%=conf.getTotalPages(pdfFilePath + doc + ".pdf") %>;
			var url = "{view.jsp?doc={doc}&format={format}&page=[*,0],{numPages}}";
			url = url.replace("{doc}",document);
			url = url.replace("{numPages}",numPages);
			return url;
		}

		var searchServiceUrl = escape("jsp/common/containstext.jsp?doc=<%=doc %>&page=[page]&searchterm=[searchterm]");
		var startDocument = "<%=startdocument%>";

		function append_log(msg){
			$('#txt_eventlog').val(msg+'\n'+$('#txt_eventlog').val());
		}

		String.format = function() {
			var s = arguments[0];
			for (var i = 0; i < arguments.length - 1; i++) {
				var reg = new RegExp("\\{" + i + "\\}", "gm");
				s = s.replace(reg, arguments[i + 1]);
			}
			return s;
		};

		$('#documentViewer').FlexPaperViewer( {
			config : {
				DOC : escape(getDocumentUrl(startDocument)),
				Scale : 0.6, 
				ZoomTransition : 'easeOut',
				ZoomTime : 0.5,
				ZoomInterval : 0.1,
				FitPageOnLoad : true,
				FitWidthOnLoad : false,
				FullScreenAsMaxWindow : false,
				ProgressiveLoading : false,
				MinZoomSize : 0.2,
				MaxZoomSize : 5,
				SearchMatchAll : false,
				SearchServiceUrl : searchServiceUrl,
				RenderingOrder : "<%=(conf.getConfig("renderingorder.primary", "") + "," + conf.getConfig("renderingorder.secondary", ""))%>",
				ViewModeToolsVisible : true,
				ZoomToolsVisible : true,
				NavToolsVisible : true,
				CursorToolsVisible : true,
				SearchToolsVisible : true,
				key : "<%=conf.getConfig("licensekey", "") %>",
				DocSizeQueryService : "swfsize.jsp?doc=<%=doc %>",
				jsDirectory : '<%=ser%>/js/',
				localeDirectory : '<%=ser%>/locale/',
				JSONDataType : 'jsonp',
				WMode : 'window',
				localeChain: 'en_US'
			}}
		);
	</script>
</body>
</html>