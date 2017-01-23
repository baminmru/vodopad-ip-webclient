Imports System.Data
Imports Newtonsoft.Json
Imports System.Diagnostics
Imports System.Text
Imports System.Net
Imports System.IO
Imports System.ComponentModel
Imports System.Reflection

Partial Class a_monitor
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        If IsPostBack Then Exit Sub
        Dim jj As JOut
        Dim cm As CMConnector
        cm = New CMConnector()
        Dim dt As DataTable
        If Not cm.Init() Then
            Response.Clear()
            Response.Write("<div> Connect error </div>")
            Response.End()
            Exit Sub
        End If

        Dim id As String
		dim q as string 
		dim sout as string =""
		try
		 id = Request.Form("MID") & ""
	    catch
		 id="0"
		end try
		 
		 if id="" then ID="0"
		 
		Dim t As Integer
        Dim m As Boolean = False

		dim picTank as string
		dim txtTank as string
		dim picPower as string
		dim txtPower as string
		dim picPop as string
		dim txtPop as string
		dim picPump1 as string
		dim picPump2 as string
		dim picPump3 as string
		dim txtPump1 as string
		dim txtPump2 as string
		dim txtPump3 as string
		Dim i As Integer
		Dim j As Integer
		Dim k As Integer
		Dim l As Integer
		Dim s As String
		 
		Try
				Dim ip As String
				Dim bb As DataTable
				bb = CM.QuerySelect(" select id_class,npip FROM bdevices JOIN devices ON  bdevices.id_dev=devices.id_dev  where id_bd=" + ID)
				if bb.Rows.Count >0 then
					If bb.Rows(0)("id_class") = 3 Then
						ip = bb.Rows(0)("npip").ToString
						
						
						  ' Create a request for the URL. 
						Dim request As WebRequest
						Dim m_resp As WebResponse
						Dim dataStream As Stream
						Dim reader As StreamReader
						Dim m_respFromServer As String
					

						Try
							request = WebRequest.Create("http://" & IP & "/readx?ireg=0")
							' If required by the server, set the credentials.
							request.Credentials = CredentialCache.DefaultCredentials
							request.Timeout = 250
							request.Method = "GET"
							' Get the m_resp.
							m_resp = request.GetResponse()

							dataStream = m_resp.GetResponseStream()
							' Open the stream using a StreamReader for easy access.
							reader = New StreamReader(dataStream)
							' Read the content.
							m_respFromServer = reader.ReadToEnd()
							reader.Close()
							m_resp.Close()


							Try
								i = Integer.Parse(m_respFromServer)
							Catch ex As Exception
								i = 0
							End Try

						Catch ex As Exception

						End Try


						Try
							request = WebRequest.Create("http://" & IP & "/readx?ireg=1")
							' If required by the server, set the credentials.
							request.Credentials = CredentialCache.DefaultCredentials
							request.Timeout = 250
							request.Method = "GET"
							' Get the m_resp.
							m_resp = request.GetResponse()

							dataStream = m_resp.GetResponseStream()
							' Open the stream using a StreamReader for easy access.
							reader = New StreamReader(dataStream)
							' Read the content.
							m_respFromServer = reader.ReadToEnd()

							reader.Close()
							m_resp.Close()


							Try
								j = Integer.Parse(m_respFromServer)
							Catch ex As Exception
								j = 0
							End Try

						Catch ex As Exception

						End Try

						Try
							request = WebRequest.Create("http://" & IP & "/readx?ireg=2")
							' If required by the server, set the credentials.
							request.Credentials = CredentialCache.DefaultCredentials
							request.Timeout = 250
							request.Method = "GET"
							' Get the m_resp.
							m_resp = request.GetResponse()

							dataStream = m_resp.GetResponseStream()
							' Open the stream using a StreamReader for easy access.
							reader = New StreamReader(dataStream)
							' Read the content.
							m_respFromServer = reader.ReadToEnd()

							reader.Close()
							m_resp.Close()


							Try
								k = Integer.Parse(m_respFromServer)
							Catch ex As Exception
								k = 0
							End Try

						Catch ex As Exception

						End Try


						Try
							request = WebRequest.Create("http://" & IP & "/readx?ireg=3")
							' If required by the server, set the credentials.
							request.Credentials = CredentialCache.DefaultCredentials
							request.Timeout = 250
							request.Method = "GET"
							' Get the m_resp.
							m_resp = request.GetResponse()

							dataStream = m_resp.GetResponseStream()
							' Open the stream using a StreamReader for easy access.
							reader = New StreamReader(dataStream)
							' Read the content.
							m_respFromServer = reader.ReadToEnd()

							reader.Close()
							m_resp.Close()


							Try
								l = Integer.Parse(m_respFromServer)
							Catch ex As Exception
								l = 0
							End Try

						Catch ex As Exception

						End Try
						Response.Clear()
					else
						Exit Sub
					end if		
				else
					Exit Sub
				end if
			Catch ex As Exception
			
				Exit Sub
			End Try
       
	
			i=DateTime.Now.Millisecond
			j=DateTime.Now.Second
			k=DateTime.Now.Second
			l=DateTime.Now.Second

			If (k And 1) = 1 Then
				picPower="images\red.gif"
				txtPower="Авария"
			Else
				picPower="images\green.gif"
				txtPower="ОК"
			End If

			If (k And 2) = 2 Then
				picPop="images\red.gif"
				txtPop="Авария"
			Else
				picPop="images\green.gif"
				txtPop="ОК"
			End If

			s = "нет данных"
			t = 0
			
			If (i And 1) = 1 Then
				t = 1
				s = "сухой ход"
			End If

			If (i And 2) = 2 Then
				t = 2
				s = "1 уровень"
			End If

			If (i And 4) = 4 Then
				t = 3
				s = "2 уровень"
			End If
			If (i And 8) = 8 Then
				s = "3 уровень"
				t = 4
			End If
			If (i And 16) = 16 Then
				s = "аварийный уровень"
				t = 5
			End If
			picTank= "images\tank_" & t.ToString & ".gif"
			txtTank=s

			m = True
			t = 0
			s = "не готов"
			If (i And 128) = 128 Then
				t = 3
				s = "готов"
			End If

			If (i And 256) = 256 Then
				t = 1
				s = "работа"
			End If

			If (k And 16) = 16 Then
				t = 2
				s = "авария"
			End If

			If (i And 512) = 512 Then
				m = False
				s = "авт. " & s
			Else
				s = "руч. " & s
			End If

			If m Then
				picPump1="images\manPump_" & t.ToString & ".gif"
			Else
				picPump1="images\pump_" & t.ToString & ".gif"
			End If
			txtPump1 = s



			m = True
			t = 0
			s = "не готов"
			If (i And 1024) = 1024 Then
				t = 3
				s = "готов"
			End If

			If (i And 2048) = 2048 Then
				t = 1
				s = "работа"
			End If

			If (k And 64) = 64 Then
				t = 2
				s = "авария"
			End If


			If (j And 1) = 1 Then
				m = False
				s = "авт. " & s
			Else


				s = "руч. " & s
			End If

			If m Then
				picPump2="images\manPump_" & t.ToString & ".gif"
			Else
				picPump2="images\pump_" & t.ToString & ".gif"
			End If
			txtPump2 = s


			m = True
			t = 0
			s = "не готов"
			If (j And 2) = 2 Then
				t = 3
				s = "готов"
			End If

			If (j And 4) = 4 Then
				t = 1
				s = "работа"
			End If

			If (l And 1) = 1 Then
				t = 2
				s = "авария"
			End If

			If (j And 8) = 8 Then
				m = False
				s = "авт. " & s
			Else


				s = "руч. " & s
			End If

			If m Then
				picPump3="images\manPump_" & t.ToString & ".gif"
			Else
				picPump3="images\pump_" & t.ToString & ".gif"
			End If
			txtPump3 = s
				
			
		
       
		
	
		sout=sout+"<table border='0'>"
		sout=sout+"<tr><td width='80px'>Питание:</td><td width='160px'>" & txtPower &"</td><td>"& img(picPower) & "</td></tr>"
		sout=sout+"<tr><td width='80px'>Поплавки:</td><td width='160px'>" & txtPop &"</td><td>"& img(picPop) &"</td></tr>"
		sout=sout+"<tr><td width='80px'>Емкость:</td><td  width='160px'>" & txtTank &"</td><td>&nbsp;</td><td>(" &  DateTime.Now.ToString() & ")</td></tr>"
		sout=sout+"</table>"
		sout=sout+"<table border='0'><tr>"
		sout=sout+"<td>"& img(picTank,200,300) & "</td><td>"
		
		sout=sout+"<table border='0'><tr>"
		sout=sout+"<td>"& img(picpump1,100,80) & "</td>"
		sout=sout+"<td width='60px'>Насос 1</td>"
		sout=sout+"<td>" & txtpump1  & "</td>"
		
		sout=sout+"</tr><tr>"
		sout=sout+"<td>"& img(picpump2,100,80) & "</td>"
		sout=sout+"<td width='60px'>Насос 2</td>"
		sout=sout+"<td>"& txtpump2  & "</td>"
		
		sout=sout+"</tr><tr>"
		sout=sout+"<td>"& img(picpump3,100,80) & "</td>"
		sout=sout+"<td width='60px'>Насос 3</td>"
		sout=sout+"<td>"& txtpump3  & "</td>"
		sout=sout+"</tr></table></td></tr></table>"
		Response.Write("<div> " & sout  &   " </div>")
		Response.End()
    End Sub
	
	private function img( byval img_path as string, optional w as integer=20, optional h as integer=20) as string
		return "<img src=""" & img_path & """ width=""" & w.ToString & """ height=""" & h &""" border=""0"" />"
	end function
	
	
End Class
