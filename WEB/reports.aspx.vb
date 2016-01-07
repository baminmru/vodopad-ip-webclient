Imports System.Data
Imports Newtonsoft.Json

Partial Class reports
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        If IsPostBack Then Exit Sub
        Dim jj As JOut
        Dim cm As CMConnector
        cm = New CMConnector()
        Dim dt As DataTable
        If Not cm.Init() Then

            dt = New DataTable
            jj = New JOut
            jj.success = "false"
            jj.data = dt
            jj.msg = "Error"
            Response.Clear()
            Response.Write(JsonConvert.SerializeObject(jj))
            Response.End()
            Exit Sub
        End If

        Dim D As String
        Dim A As String
        'Dim F As String
        'Dim T As String
        'Dim sF As String
        'Dim sT As String
        D = Request.QueryString("D") & ""
        A = Request.QueryString("P") & ""
        'F = Request.QueryString("F") & ""
        'T = Request.QueryString("T") & ""
        Dim w As String
        w = " 1=1 "



        'If T = "" Then
        '    sT = " sysdate "
        'Else
        '    sT = " to_date('" + T + "','YYYY-MM-DD HH24:MI:SS')"
        'End If

        'If F = "" Then
        '    sF = " (sysdate-1) "
        'Else
        '    sF = " to_date('" + F + "','YYYY-MM-DD HH24:MI:SS')"
        'End If
        If D <> "" Then
            w = w & " and WEBREPORT.ID_BD=" & D
        End If
        If A <> "" Then
            w = w & " and WEBREPORT.ID_PTYPE=" & A
        End If


        ' w = w & " and createdate>=" & sF & " and createdate <" & sT

        dt = cm.QuerySelect("select WEBREPORT.*,NODENAME,CTYPE, nvl(WEBTEMPLATE.FILENAME,'') FILENAME,nvl(WEBTEMPLATE.NAME,'') as TNAME from WEBREPORT left join WEBTEMPLATE on WEBREPORT.TEMPLATEID=WEBTEMPLATE.WEBTEMPLATEID  join v_dev2_all on WEBREPORT.id_bd=v_dev2_all.id_bd join paramtype on WEBREPORT.Id_Ptype=paramtype.id_type WHERE " & w & " order  by CREATEDATE DESC ")


        jj = New JOut
        jj.success = "true"
        jj.data = dt
        jj.msg = "OK"
        Response.Clear()
        Response.Write(JsonConvert.SerializeObject(jj))
        Response.End()



    End Sub
End Class
