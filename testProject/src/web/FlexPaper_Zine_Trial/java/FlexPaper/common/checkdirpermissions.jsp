<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="lib.Config"%>
<%
	Config conf = new Config();
	String flexAuth = (String) session.getAttribute("FLEXPAPER_AUTH");
	if(conf.getConfig("password") != null && flexAuth == null){
		response.sendRedirect("../index.jsp");
	}
	String dir = request.getParameter("dir");
%>
<%=conf.is_writable(dir)%>