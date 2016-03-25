<%@page import="lib.*" %>
<%
String doc = request.getParameter("doc") + ".pdf";
String pages = request.getParameter("page");
String searchterm = request.getParameter("searchterm");
swfextract se = new swfextract();
%>
<%=se.findText(doc, Integer.parseInt(pages), searchterm, -1) %>