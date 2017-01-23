Imports System.Data
Imports Newtonsoft.Json


Partial Class mapinfo
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

        dt = cm.QuerySelect("SELECT bdevices.id_bd, bbuildings.CSHORT, bbuildings.MAPX,bbuildings.MAPY,nvl(ANALIZER.COLOR,'GREEN') COLOR,NVL(ANALIZER.INFO,' ') INFO from bdevices  JOIN bbuildings on bdevices.id_bu=bbuildings.id_BU   JOIN ANALIZER  ON  bdevices.id_bd=ANALIZER.ID_BD WHERE NPQUERY=1 AND MAPX<>0 AND MAPY<>0")
        jj = New JOut
        jj.success = "true"
        jj.data = dt
        jj.msg = "OK"
        Response.Clear()
        Response.Write(JsonConvert.SerializeObject(jj))
        Response.End()



    End Sub


End Class
