Imports System.Data
Imports Newtonsoft.Json
Imports System.Diagnostics


Partial Class requery
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
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

        Dim U As String
        Dim D As String
        Dim A As String
        Dim F As String
        Dim T As String
        Dim sF As String
        Dim sT As String
        U = Request.Form("U") & ""
        D = Request.Form("D") & ""
        A = Request.Form("P") & ""
        F = Request.Form("F") & ""
        T = Request.Form("T") & ""


        If T = "" Then
            sT = " sysdate "
        Else
            sT = " to_date('" + T + "','YYYY-MM-DD HH24:MI:SS')"
        End If

        If F = "" Then
            sF = " (sysdate-1) "
        Else
            sF = " to_date('" + F + "','YYYY-MM-DD HH24:MI:SS')"
        End If


        Dim drq As Date
        Dim sDate As Date
        Dim eDate As Date
        Dim delta As Integer = 0
        Dim cnt As Integer = 0

        If A = "3" Then delta = 60
        If A = "4" Then delta = 24 * 60
        If delta > 0 Then

            dt = cm.QuerySelect("select " + sF + " as  start_date," + sT + " end_date from dual")

            If dt.rows.count > 0 Then
                sDate = dt.rows(0)("start_date")
                eDate = dt.rows(0)("end_date")
            End If
            drq = sDate

            While drq <= eDate And cnt < 25
                cnt = cnt + 1
                dt = cm.QuerySelect("select count(*) cnt from qlist where id_bd=" + D + " and id_ptype=" + A + " and QDATE=" + cm.OracleDate(drq))
                If dt.Rows(0)("cnt") = 0 Then
                    Try
                        cm.QueryExec("insert into QLIST(QLISTID,id_bd,id_ptype,PROCESSED,QDATE) values( qlist_seq.nextval," + D + "," + A + ",0," + cm.OracleDate(drq) + ")")



                    Catch ex As Exception
                        jj = New JOut
                        jj.success = "false"
                        jj.msg = ex.Message
                        Response.Clear()
                        Response.Write(JsonConvert.SerializeObject(jj))
                        Response.End()
                        Exit Sub
                    End Try
                End If
                drq = drq.AddMinutes(delta)

            End While
            



            jj = New JOut
            jj.success = "true"
            jj.msg = "OK"
            Response.Clear()
            Response.Write(JsonConvert.SerializeObject(jj))
            Response.End()

        Else
            jj = New JOut
            jj.success = "false"
            jj.msg = "Day or hour archive only"
            Response.Clear()
            Response.Write(JsonConvert.SerializeObject(jj))
            Response.End()
            Exit Sub
        End If





    End Sub
End Class
