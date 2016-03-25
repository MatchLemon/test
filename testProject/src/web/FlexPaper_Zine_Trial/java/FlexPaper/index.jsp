<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="lib.Config"%>
<%
	Config con = new Config();
	String msg = request.getParameter("msg");
	String res = "admin/index.jsp";
	if(msg != null || con.getConfig("password") == null)
		res = "setup/index.jsp";
	response.sendRedirect(res);
%>