<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="lib.Setup, java.util.ArrayList, lib.JArray, lib.MyCon" %>
<%
	Setup conf = new Setup();
	if(conf.getConfig("password") != null){
		response.sendRedirect("../index.jsp");
	}
	int step = 1;
	if (request.getParameter("step") != null) {
		step = Integer.parseInt(request.getParameter("step"));
	}

	String path_to_pdf2swf		= "";
	String path_to_pdf2json		= "";
	String path_to_pdftk        = "";
	String pdf2swf_exec			= "pdf2swf";
	String pdf2json_exec		= "pdf2json";
	String pdftk_exec           = "pdftk";

	if(	conf.isWin() ){
		path_to_pdf2swf 	= "C:\\Program Files\\SWFTools\\";
		path_to_pdf2json 	= "C:\\Program Files\\PDF2JSON\\";
		path_to_pdftk		= "C:\\Program Files\\PDF Labs\\PDFtk Server\\bin\\";
		pdf2swf_exec 		= "pdf2swf.exe";
		pdf2json_exec 		= "pdf2json.exe";
	}

	int fatals = 0;

	/* PDF2SWF PATH */
	/* -------------------------------------------- */
	if(request.getParameter("PDF2SWF_PATH") != null){
		path_to_pdf2swf = request.getParameter("PDF2SWF_PATH");
	}else if(session.getAttribute("PDF2SWF_PATH") != null){
		path_to_pdf2swf = (String) session.getAttribute("PDF2SWF_PATH");
	} else if(conf.isWin() && !conf.pdf2swfEnabled(path_to_pdf2swf + pdf2swf_exec)){
		path_to_pdf2swf = "C:\\Program Files (x86)\\SWFTools\\";
	}

	session.setAttribute("PDF2SWF_PATH", path_to_pdf2swf);
	/* -------------------------------------------- */

	/* PDF2JSON PATH */
	/* -------------------------------------------- */
	if(request.getParameter("PDF2JSON_PATH") != null){
		path_to_pdf2json = request.getParameter("PDF2JSON_PATH");
	}else if(session.getAttribute("PDF2JSON_PATH") != null){
		path_to_pdf2json = (String) session.getAttribute("PDF2JSON_PATH");
	} else {
		if(conf.isWin() && !conf.pdf2jsonEnabled(path_to_pdf2json + pdf2json_exec)){
			path_to_pdf2json 	= "C:\\Program Files (x86)\\PDF2JSON\\";
		}
	}

	/* PDFTK PATH */
	/* -------------------------------------------- */
	if(request.getParameter("PDFTK_PATH") != null){
		path_to_pdftk = request.getParameter("PDFTK_PATH");
	}else if(session.getAttribute("PDFTK_PATH") != null){
		path_to_pdftk = (String) session.getAttribute("PDFTK_PATH");
	} else {
		if(conf.isWin() && !conf.pdftkEnabled(path_to_pdftk + pdftk_exec)){
			path_to_pdftk 	= "C:\\Program Files (x86)\\PDF Labs\\PDFtk Server\\bin\\";
		}
	}


	session.setAttribute("PDF2JSON_PATH", path_to_pdf2json);
	String path_pdf							= request.getParameter("PDF_DIR");
	String path_pdf_workingdir				= request.getParameter("PUBLISHED_PDF_DIR");
	if(path_pdf == null)
		path_pdf = conf.getConfig("path.pdf","C:\\flexpaper\\pdf");
	if(path_pdf_workingdir == null)
		path_pdf_workingdir = conf.getConfig("path.swf","C:\\flexpaper\\docs");
	/* -------------------------------------------- */
	if(step == 3){
		JArray ht = conf.getConfigs();
		if(ht == null)
			ht = new JArray();
		ht.set("username", request.getParameter("ADMIN_USERNAME"));
		ht.set("password", request.getParameter("ADMIN_PASSWORD"));
		ht.set("path.pdf", path_pdf);
		ht.set("path.swf", path_pdf_workingdir);
		ht.set("pdf2swf", String.valueOf(conf.pdf2swfEnabled(path_to_pdf2swf + pdf2swf_exec)));
		ht.set("licensekey", request.getParameter("LICENSEKEY"));
		ht.set("renderingorder.primary", request.getParameter("RenderingOrder_PRIM"));
		ht.set("renderingorder.secondary", request.getParameter("RenderingOrder_SEC"));
		ht.set("splitmode", request.getParameter("SPLITMODE"));
		ht.set("allowcache", "true");

		if(conf.isWin()){
			String temp = conf.getConfig("cmd.conversion.singledoc", "pdf2swf.exe {path.pdf}{pdffile} -o {path.swf}{pdffile}.swf -f -T 9 -t -s storeallcharacters -s linknameurl");
			ht.set("cmd.conversion.singledoc", temp.replace("pdf2swf.exe", path_to_pdf2swf + "pdf2swf.exe"));
			temp = conf.getConfig("cmd.conversion.splitpages", "pdf2swf.exe {path.pdf}{pdffile} -o {path.swf}{pdffile}_%.swf -f -T 9 -t -s storeallcharacters -s linknameurl");
			ht.set("cmd.conversion.splitpages", temp.replace("pdf2swf.exe",  path_to_pdf2swf + "pdf2swf.exe"));
			temp = conf.getConfig("cmd.conversion.renderpage", "swfrender.exe {path.swf}{swffile} -p {page} -o {path.swf}{pdffile}_{page}.png -X 1024 -s keepaspectratio");
			ht.set("cmd.conversion.renderpage", temp.replace("swfrender.exe",  path_to_pdf2swf + "swfrender.exe"));
			temp = conf.getConfig("cmd.conversion.rendersplitpage", "swfrender.exe {path.swf}{swffile} -o {path.swf}{pdffile}_{page}.png -X 1024 -s keepaspectratio");
			ht.set("cmd.conversion.rendersplitpage", temp.replace("swfrender.exe", path_to_pdf2swf + "swfrender.exe"));
			temp = conf.getConfig("cmd.conversion.jsonfile", "pdf2json.exe {path.pdf}{pdffile} -enc UTF-8 -compress {path.swf}{pdffile}.js");	
			ht.set("cmd.conversion.jsonfile", temp.replace("pdf2json.exe", path_to_pdf2json + "pdf2json.exe"));
			temp = conf.getConfig("cmd.conversion.extracttext", "swfstrings.exe {swffile}");
			ht.set("cmd.searching.extracttext", temp.replace("swfstrings.exe", path_to_pdf2swf + "swfstrings.exe"));
			temp = conf.getConfig("cmd.conversion.splitjsonfile", "pdf2json.exe {path.pdf}{pdffile} -enc UTF-8 -compress -split 10 {path.swf}{pdffile}_%.js");
			ht.set("cmd.conversion.splitjsonfile", temp.replace("pdf2json.exe", path_to_pdf2json + "pdf2json.exe"));
            temp = conf.getConfig("cmd.conversion.splitpdffile", "pdftk.exe {path.pdf}{pdffile} burst output {path.swf}{pdffile}_%1d.pdf compress");
			ht.set("cmd.conversion.splitpdffile", temp.replace("pdftk.exe", path_to_pdftk + "pdftk.exe"));

			ht.set("cmd.query.swfwidth","swfdump.exe {swffile} -X");
			ht.set("cmd.query.swfheight","swfdump.exe {swffile} -Y");
		}else{
			String temp = conf.getConfig("cmd.conversion.singledoc", "pdf2swf {path.pdf}{pdffile} -o {path.swf}{pdffile}.swf -f -T 9 -t -s storeallcharacters -s linknameurl");
			ht.set("cmd.conversion.singledoc", temp.replace("pdf2swf", path_to_pdf2swf + "pdf2swf"));
			temp = conf.getConfig("cmd.conversion.splitpages", "pdf2swf {path.pdf}{pdffile} -o {path.swf}{pdffile}_%.swf -f -T 9 -t -s storeallcharacters -s linknameurl");
			ht.set("cmd.conversion.splitpages", temp.replace("pdf2swf",  path_to_pdf2swf + "pdf2swf"));
			temp = conf.getConfig("cmd.conversion.renderpage", "swfrender {path.swf}{swffile} -p {page} -o {path.swf}{pdffile}_{page}.png -X 1024 -s keepaspectratio");
			ht.set("cmd.conversion.renderpage", temp.replace("swfrender",  path_to_pdf2swf + "swfrender"));
			temp = conf.getConfig("cmd.conversion.rendersplitpage", "swfrender {path.swf}{swffile} -o {path.swf}{pdffile}_{page}.png -X 1024 -s keepaspectratio");
			ht.set("cmd.conversion.rendersplitpage", temp.replace("swfrender", path_to_pdf2swf + "swfrender"));
			temp = conf.getConfig("cmd.conversion.jsonfile", "pdf2json {path.pdf}{pdffile} -enc UTF-8 -compress {path.swf}{pdffile}.js");	
			ht.set("cmd.conversion.jsonfile", temp.replace("pdf2json", path_to_pdf2json + "pdf2json"));
			temp = conf.getConfig("cmd.conversion.extracttext", "swfstrings {swffile}");
			ht.set("cmd.searching.extracttext", temp.replace("swfstrings", path_to_pdf2swf + "swfstrings"));
			temp = conf.getConfig("cmd.conversion.splitjsonfile", "pdf2json {path.pdf}{pdffile} -enc UTF-8 -compress -split 10 {path.swf}{pdffile}_%.js");
			ht.set("cmd.conversion.splitjsonfile", temp.replace("pdf2json", path_to_pdf2json + "pdf2json"));
			temp = conf.getConfig("cmd.conversion.splitpdffile", "pdftk {path.pdf}{pdffile} burst output {path.swf}{pdffile}_%1d.pdf compress");
			ht.set("cmd.conversion.splitpdffile", temp.replace("pdftk", path_to_pdftk + "pdftk"));
			ht.set("cmd.query.swfwidth","swfdump {swffile} -X");
			ht.set("cmd.query.swfheight","swfdump {swffile} -Y");
		}

		String verify = request.getParameter("SQL_DATABASE_VERIFIED");
		if(verify != null && "true".equals(verify)){
			String sqpass = request.getParameter("SQL_PASSWORD");
			String squser = request.getParameter("SQL_USERNAME");
			String sqhost = request.getParameter("SQL_HOST");
			String sqdb = request.getParameter("SQL_DATABASE");
			if(	sqpass != null &&
				squser != null &&
				sqhost != null &&
				sqdb != null){

				ht.set("sql.host", sqhost);
				ht.set("sql.username", squser);
				ht.set("sql.password", sqpass);
				ht.set("sql.database", sqdb);
				MyCon mycon = new MyCon();
				if(mycon.getConnection(sqhost,squser,sqpass,sqdb) != null){
					ht.set("sql.verified","true");
					String sql = "CREATE TABLE IF NOT EXISTS mark ( " +
						"`id` varchar(255) NOT NULL," +
						"`document_filename` varchar(255)," +
						"`document_relative_path` varchar(255)," +
						"`selection_text` text," +
						"`has_selection` int(11)," +
						"`color` varchar(7)," +
						"`selection_info` varchar(30)," +
						"`readonly` tinyint(1)," +
						"`type` varchar(30)," +
						"`displayFormat` varchar(30)," +
						"`note` text," +
						"`pageIndex` int(11)," +
						"`positionX` FLOAT," +
						"`positionY` FLOAT," +
						"`width` int(11)," +
						"`height` int(11)," +
						"`collapsed` tinyint(1)," +
						"`points` text," +
						"`datecreated` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP," +
						"`datechanged` datetime," +
						"PRIMARY KEY (`id`)" +
						")";
					mycon.executes(sql);
				}
				mycon.close();
			}
		}
		String msg = "";
		conf.mkdir(ht.get("path.pdf"));
		conf.mkdir(ht.get("path.swf"));
		if(!conf.saveConfig(ht)){
			msg = "?msg=Setup failed : Please check server connection and try setup.";
		}
		response.sendRedirect("../index.jsp"+msg);
	}
%>
<jsp:include page="../common/header.jsp"/>
	<div style="width:690px;clear:both;padding: 20px 10px 20px 10px;">
		<ul id="process" style="margin-bottom:10px;">
<%
switch (step){
	case 1:
%>
			<li class="first active"><span>Step 1: Recommended Components</span></li>
			<li class=""><span>Step 2: Configuration</span></li>
<%
		break;
	case 2:
	default:
%>
			<li class="first prevactive"><span>Step 1: Recommended Components</span></li>
			<li class="last active"><span>Step 2: Configuration</span></li>
<%
		break;
	}
%>
		</ul>
	</div>
	<div style="clear:both;background-color:#fff;padding: 20px 10px 20px 30px;border:0px;-webkit-box-shadow: rgba(0, 0, 0, 0.246094) 0px 4px 8px 0px;min-width:650px;float:left;width:650px;margin-left:10px;margin-bottom:50px;">
<%
switch (step) {
	case 1:
		boolean pdf2swf 	= conf.pdf2swfEnabled(path_to_pdf2swf + pdf2swf_exec);
		boolean pdf2json 	= conf.pdf2jsonEnabled(path_to_pdf2json + pdf2json_exec);
		boolean pdftk		= conf.pdftkEnabled(path_to_pdftk + pdftk_exec);
		String gdinfo 	= null;

		ArrayList<JArray> tests = new ArrayList<JArray>();
		JArray one = new JArray();
		one.add("desc", "SWFTools support");
	    one.add("test", String.valueOf(pdf2swf));
		one.add("failmsg",
				"Without SWFTools installed, documents will have to be published manually. Please see <a href='http://www.swftools.org'>swftools.org</a> on how to install SWFTools.<br/><br/>Have you installed SWFTools at a different location? Please enter the full path to your SWFTools installation below<br/><form class='devaldi'><div class='text' style='width:400px;float:left;'><input type='text' name='PDF2SWF_PATH' id='PDF2SWF_PATH' value='" +
				path_to_pdf2swf +
				"' onkeydown='updatepdf2swfpath()'/><div class='effects'></div><div class='loader'></div></div></form><br/>");
		JArray two = new JArray();
		two.add("desc", "PDF2JSON support");
		two.add("test", String.valueOf(pdf2json));
		two.add("failmsg",
				"Without PDF2JSON installed, FlexPaper won't be able to publish documents to HTML format. Please see its homepage on <a href='http://code.google.com/p/pdf2json/'>Google Code</a> on how to download and install PDF2JSON<br/><br/>Have you installed PDF2JSON at a different location? Please enter the full path to your PDF2JSON installation below<br/><form class='devaldi'><div class='text' style='width:400px;float:left;'><input type='text' name='PDF2JSON_PATH' id='PDF2JSON_PATH' value='" +
				path_to_pdf2json +
				"' onkeydown='updatepdf2jsonpath()'/><div class='effects'></div><div class='loader'></div></div></form><br/>");
		JArray three = new JArray();
		three.add("desc", "PDFTK support");
		three.add("test", String.valueOf(pdftk));
		three.add("failmsg",
				"The HTML5 mode cannot be used in split mode without PDFTK installed. <br/><br/>Have you installed PDFTK at a different location? Please enter the full path to your PDFTK installation below<br/><form class='devaldi'><div class='text' style='width:400px;float:left;'><input type='text' name='PDFTK_PATH' id='PDFTK_PATH' value='" +
				path_to_pdftk +
				"' onkeydown='updatepdftkpath()'/><div class='effects'></div><div class='loader'></div></div></form><br/>");		
		tests.add(one);
		tests.add(two);
		tests.add(three);
		conf.exec_tests(tests);
%>
		<script type="text/javascript">
			function updatepdf2jsonpath(){
				$('#bttn_final').hide();
				$('#bttn_updatepath_pdf2json').show();
			}
			function updatepdf2swfpath(){
				$('#bttn_final').hide();
				$('#bttn_updatepath_pdf2swf').show();				
			}
			function updatepdftkpath(){
				$('#bttn_final').hide();
				$('#bttn_updatepath_pdftk').show();
			}
		</script>
		<h3>FlexPaper Configuration: Recommended Components</h3>
		<table width="100%" cellspacing="0" cellpadding="0" class="sortable">
			<tr>
				<th class="title">Test</th>
				<th class="tr">Result</th>
			</tr>
			<%=conf.table_data%>
		</table>
<%
		if (conf.fatals > 0){
%>
		<h4 class="warn">FlexPaper will work on this server, but its features will be limited as described below.</h4>
		<ul class="list" style="margin-top:30px">
			<%=conf.fatal_msg%>
		</ul>			
<%
		}
%>
		<div style="margin-top:10px;float:right;display:block" id="bttn_final">
			<button class="tiny main n_button" type="submit" onclick="location.href='index.jsp?step=2'"><span></span><em style="min-width:150px">final step &rarr;</em></button>&nbsp;<br/>
		</div>
		<div style="margin-top:10px;float:right;display:none;" id="bttn_updatepath_pdf2json">
			<button class="tiny main n_button" type="submit" onclick="location.href='index.jsp?step=1&PDF2JSON_PATH='+$('#PDF2JSON_PATH').val()"><span></span><em style="min-width:150px">retry<img src="../common/images/reload.png" style="margin-top:3px"/></em></button>&nbsp;<br/>
		</div>
		<div style="margin-top:10px;float:right;display:none;" id="bttn_updatepath_pdf2swf">
			<button class="tiny main n_button" type="submit" onclick="location.href='index.jsp?step=1&PDF2SWF_PATH='+$('#PDF2SWF_PATH').val()"><span></span><em style="min-width:150px">retry<img src="../common/images/reload.png" style="margin-top:3px"/></em></button>&nbsp;<br/>
		</div>
		<div style="margin-top:10px;float:right;display:none;" id="bttn_updatepath_pdftk">
			<button class="tiny main n_button" type="submit" onclick="location.href='index.jsp?step=1&PDFTK_PATH='+$('#PDFTK_PATH').val()"><span></span><em style="min-width:150px">retry<img src="../common/images/reload.png" style="margin-top:3px"/></em></button>&nbsp;<br/>
		</div>
<%
		break;
	case 2:
	default:
%>
		<script type="text/javascript">
			function validateConfiguration(){
				if($('#ADMIN_USERNAME').val().length==0){
					$('#ADMIN_USERNAME_RESULT').html('Admin username needs to be set');
					$('#ADMIN_USERNAME').focus();
					return false;
				}
				if($('#ADMIN_PASSWORD').val().length==0){
					$('#ADMIN_PASSWORD_RESULT').html('Admin password needs to be set');
					$('#ADMIN_PASSWORD').focus();
					return false;
				}
				if($('#PDF_DIR').val().length==0 || $('#PDF_DIR_ERROR').html().length > 0){
					$('#PDF_DIR_ERROR').html('PDF storage directory needs to be valid path');
					$('#PDF_DIR').focus();
					return false;
				}
				if($('#PUBLISHED_PDF_DIR').val().length==0 || $('#PUBLISHED_PDF_DIR_ERROR').html().length > 0){
					$('#PUBLISHED_PDF_DIR_ERROR').html('Working directory needs to be valid path');
					$('#PUBLISHED_PDF_DIR').focus();
					return false;
				}
				if(	$("INPUT#SQL_PASSWORD, INPUT#SQL_USERNAME, INPUT#SQL_HOST, INPUT#SQL_DATABASE").val().length>0) {
					if($("#SQL_PASSWORD").val().length==0||$("#SQL_USERNAME").val().length==0||$("#SQL_HOST").val().length==0||$("#SQL_DATABASE").val().length==0){
						$('#SQL_CONNECT_RESULT').html('<font color="red">All fields need to be set to set up the sample database</font>');
						$('INPUT#SQL_HOST').focus();
						return false;
					}
					if($("#SQL_DATABASE_VERIFIED").val() != "true"){
						if($("#SQL_CONNECT_RESULT").html().length > 0){
							$('#SQL_CONNECT_RESULT').html('<font color="red">Invalid database.</font>');
							$('INPUT#SQL_HOST').focus();
						}else {
							$('#SQL_CONNECT_RESULT').html('<font color="red">Please wait a moment while checking database.</font>');
						}
						return false;
					}	
				}
			}
		</script>
		<h3>FlexPaper: Configuration</h3>
		<form class="devaldi" action="index.jsp" method="post" onsubmit="return validateConfiguration()">
			<input type="hidden" id="step" name="step" value="3" />
			<table width="100%" cellspacing="0" cellpadding="0" class="sortable">
				<tr>
					<td>Admin Username</td>
					<td>
						<div class="text" style="width:150px;float:left;">
							<input type="text" name="ADMIN_USERNAME" id="ADMIN_USERNAME" value="<%=conf.getConfig("username", "")%>"/>
							<div class="effects"></div><div class="loader"></div>
						</div>
						<div style="float:left;font-size:10px;padding-top:5px;">
							The admin username you want to use for the admin publishing interface.
						</div>
						<div id="ADMIN_USERNAME_RESULT" class="formError" style="float:right;"></div>
					</td>
				</tr>
				<tr>
					<td>Admin Password</td>
					<td>
						<div class="text" style="width:150px;float:left">
							<input type="text" name="ADMIN_PASSWORD" id="ADMIN_PASSWORD" value="<%=conf.getConfig("password", "")%>"/>
							<div class="effects"></div><div class="loader"></div>
						</div>
						<div style="float:left;font-size:10px;padding-top:5px;">
							The admin password you want to use for the admin publishing interface.
						</div>
						<div id="ADMIN_PASSWORD_RESULT" class="formError" style="float:right;"></div>
					</td>
				</tr>
				<tr>
					<td style="vertical-align:top;padding-top:12px;">PDF Storage Directory</td>
					<td style="vertical-align:top;">
						<div class="text">
							<input type="text" name="PDF_DIR" id="PDF_DIR" value="<%=path_pdf%>"/>
							<div class="effects"></div><div class="loader"></div>
						</div>
						<div style="float:left;font-size:10px;padding-top:5px;">
							This directory should reside outside of your web application root folder to protect your documents.
						</div>
						<div id="PDF_DIR_ERROR" class="formError" style="float:right;"></div>
					</td>
				</tr>
				<tr>
					<td>Working Directory</td>
					<td>
						<div class="text">
							<input type="text" name="PUBLISHED_PDF_DIR" id="PUBLISHED_PDF_DIR" value="<%=path_pdf_workingdir%>"/>
							<div class="effects"></div>
							<div class="loader"></div>
						</div>
						<div style="float:left;font-size:10px;padding-top:5px;">
							This directory should reside outside of your web application root folder to protect your documents.
						</div>
						<div id="PUBLISHED_PDF_DIR_ERROR" class="formError" style="float:right;"></div>
					</td>
				</tr>
				<tr>
					<td valign="top">
						Primary Format
					</td>
					<td>
						<div style="width:300px;float:left;">
							<select id="RenderingOrder_PRIM" name="RenderingOrder_PRIM" style="font-size:12pt;float:left;">
								<option value="flash" <% if("flash".equals(conf.getConfig("renderingorder.primary", ""))) { %>selected="selected"<% } %>>flash</option>
								<option value="html" <% if("html".equals(conf.getConfig("renderingorder.primary", ""))) { %>selected="selected"<% } %>>html</option>
								<option value="html5" <% if("html5".equals(conf.getConfig("renderingorder.primary", ""))) { %>selected="selected"<% } %>>html5</option>
							</select>
						</div>
						<div style="float:left;font-size:10px;padding-top:5px;">
							This decides what to use as primary media format to use for your visitors.
						</div>
					</td>
				</tr>
				<tr>
					<td valign="top">
						Secondary Format
					</td>
					<td>
						<div style="width:300px;float:left;">
							<select id="RenderingOrder_SEC" name="RenderingOrder_SEC" style="font-size:12pt;float:left;">
								<option value="flash" <% if("flash".equals(conf.getConfig("renderingorder.secondary", ""))) { %>selected="selected"<% } %>>flash</option>
								<option value="html" <% if("html".equals(conf.getConfig("renderingorder.secondary", ""))) { %>selected="selected"<% } %>>html</option>
								<option value="html5" <% if("html5".equals(conf.getConfig("renderingorder.secondary", ""))) { %>selected="selected"<% } %>>html5</option>
							</select>
						</div>	
						<div style="float:left;font-size:10px;padding-top:5px;">
							This decides what to use as secondary media format to use for your visitors.
						</div>
					</td>
				</tr>
				<tr>
					<td>Split mode publishing? </td>
					<td>
						<INPUT TYPE="radio" NAME="SPLITMODE" id="SPLITMODE1" VALUE="false" style="vertical-align: middle"> No
						<INPUT TYPE="radio" NAME="SPLITMODE" id="SPLITMODE2" VALUE="true" checked="checked" style="vertical-align: middle;margin-left:30px;"> Yes<BR>
						<div style="float:left;font-size:10px;padding-top:5px;">
							If you generally publish large PDF documents then running split mode is recommended.
						</div>
					</td>
				</tr>
				<tr>
					<td>License Key</td>
					<td>
						<div class="text" style="width:300px;float:left;">
							<input type="text" name="LICENSEKEY" id="LICENSEKEY" value=""/>
							<div class="effects"></div><div class="loader"></div>
						</div>
						<div style="float:left;font-size:10px;padding-top:5px;">
							If using the commercial version, this is the key you recieved from our commercial download area.
						</div>
						<div id="LICENSEKEY_ERROR" class="formError" style="float:right;"></div>
					</td>
				</tr>
			</table>
			<script type="text/javascript">
				$(document).ready(function(){
					$('#ADMIN_USERNAME').focus();
					$("input#PDF_DIR").keyup(initTimer);
					$("input#PDF_DIR").change(checkDirectoryChangePermissionsHandler);
					$("input#PUBLISHED_PDF_DIR").keyup(initTimer);
					$("input#PUBLISHED_PDF_DIR").change(checkDirectoryChangePermissionsHandler);
				});
				var currentTimeoutField;
				function initTimer(event) {
					currentTimeoutField = $(this);
				    if (window.globalTimeout) clearTimeout(window.globalTimeout);
				    window.globalTimeout = setTimeout(checkDirectoryPermissionsHandler, 1000);
				}
				function checkDirectoryPermissions(obj){
					var infield = obj;
					if(infield.val().length<3){return;}
					$.ajax({
						url: "../common/checkdirpermissions.jsp?dir="+infield.val(),
						context: document.body,
						success: function(data){
							if(data==0){
								$("#"+infield.attr("id")+"_ERROR").html("Cannot write to directory. Please verify path & permissions (needs to be writable).");
								return false;
							}else{
								$("#"+infield.attr("id")+"_ERROR").html("");
								return true;
							}
						}
					});
				}
				function checkDirectoryChangePermissionsHandler(event){
					var infield = $(this);
					checkDirectoryPermissions(infield);
				}
				function checkDirectoryPermissionsHandler(event){
					var infield = currentTimeoutField;
					checkDirectoryPermissions(infield);
				}
			</script>
			<div style="margin-top:10px;float:right;">
				<button class="tiny main n_button" type="submit"><span></span><em style="min-width:150px">Save &amp; Complete Setup</em></button>&nbsp;<br/>
			</div>
		</form>
<%
		break;
	}
%>
	</div>
<jsp:include page="../common/footer.jsp"/>