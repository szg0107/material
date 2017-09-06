<%@page import="com.yulongtao.db.*"%>
<%@page import="com.yulongtao.db.FieldEx"%>
<%@page import="com.yulongtao.sys.Dic"%>
<%@page language="java" import="java.util.*,java.io.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>JSP Page</title>
	</head>
	<body>
		<div>
			<%
				String zhi=request.getParameter("request");
				if(zhi.equals("true")){/**先确认是不是登录**/
							String apiiz =	request.getParameter("user");/**获取用户名并存进session**/
							session.setAttribute("user",  apiiz);
							String role =	request.getParameter("jueseA");/**获取角色并存进session**/
							session.setAttribute("jueseA",  role);
							String equipment =	request.getParameter("equipment");/**获取登录客户端是手机还是pc**/
							session.setAttribute("equipment",  equipment);

							String nickName =	request.getParameter("nickName");/**获取登陆用户昵称**/
							session.setAttribute("nickName",  nickName);
							session.setMaxInactiveInterval(604800);/**session为7天**/

							if(role.equals("sc")){/**手机用户**/
									String circleId =	request.getParameter("circleId");/**获取管理的第一个圈子ID并存进session**/
									session.setAttribute("circleId",  circleId);
								if(equipment.equals("phone")){/**手机端用户**/

									Date createDate = new Date(session.getCreationTime());
									out.println("Session创建的时间为 :" + createDate);


									Date accessedDate = new Date(session.getLastAccessedTime());
									out.println("Session最近访问的时间为 :" + accessedDate);
									out.println("Hello World！");
								/**	response.sendRedirect("http://123.56.187.157/hlts/phonehomePage.view");	**/
								}
							}
				}
     %>
	</div>
</body>
</html>



