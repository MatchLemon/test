<%@page import="lib.uploadify" %>
<%
if(session.getAttribute("FLEXPAPER_AUTH") != null) {
    uploadify u = new uploadify();
    u.upload(request);
}
%>