Imports System.Data
Imports Newtonsoft.Json
Imports System.Diagnostics


Partial Class requeryline
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

        Dim D As String = ""
        Dim A As String = ""
        Dim L As String = ""
        
     
        L = Request.Form("L") & ""


        Dim drq As Date
        Dim cnt As Integer = 0
        Dim OK As Boolean

        OK = True

        dt = cm.QuerySelect("select DCOUNTER,ID_BD,ID_PTYPE from datacurr where ID=" + L)

        If dt.Rows.Count > 0 Then
            drq = dt.Rows(0)("DCOUNTER")
            D = dt.Rows(0)("ID_BD").ToString() 
            A = dt.Rows(0)("ID_PTYPE").ToString()
        Else
            OK = False
        End If


        If OK Then
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





            jj = New JOut
            jj.success = "true"
            jj.msg = "OK"
            Response.Clear()
            Response.Write(JsonConvert.SerializeObject(jj))
            Response.End()

        Else
            jj = New JOut
            jj.success = "false"
            jj.msg = "Line out of filter data"
            Response.Clear()
            Response.Write(JsonConvert.SerializeObject(jj))
            Response.End()

        End If





    End Sub
End Class
