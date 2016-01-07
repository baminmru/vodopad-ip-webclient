Imports System.Data
Imports Newtonsoft.Json

Partial Class g1
    Inherits System.Web.UI.Page
	
	
	


    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If IsPostBack Then Exit Sub
        Dim jj As JOut
        Dim cm As CMConnector
        cm = New CMConnector()
        Dim dt As DataTable
		Dim plist As String = ""
        Dim where As String = ""
		Dim i As Integer
        Dim pp As String
		Dim scnt as integer
		Dim q as string 
		dim sinfo as string=""
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
        Dim P As String
        Dim F As String
        Dim T As String
        Dim sF As String
        Dim sT As String
        D = Request.QueryString("D") & ""
        P = Request.QueryString("P") & ""
        F = Request.QueryString("F") & ""
        T = Request.QueryString("T") & ""
     


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



        dt = cm.QuerySelect("select * from chartsettings  where id_bd=" + D.ToString() + " and ptype=3 and CHARTNUM=" + P.ToString() + "-1 and Enable =1")

		scnt=0
        For i = 0 To dt.Rows.Count - 1
            pp = dt.Rows(i)("pname") + ""
			if pp <>"" then
				plist = plist + "," + pp + " as S" + scnt.ToString() + " "
				if sinfo <> "" then sinfo=sinfo & ";"
				sinfo = sinfo + "S" + scnt.ToString() + "=" +  pp
				scnt+=1
				if scnt=10 then exit for
			end if
        Next
		
		'for i=scnt to 9
		'    plist = plist + ",null as S"+scnt.ToString() +" "
		'		scnt+=1
		'	next
			
        
        q= "select d.dcounter  as P_DATE " + plist + ", '" + sinfo +  "' as S_INFO from datacurr d   where d.id_bd=" +D.Tostring()+ "  and d.dcounter >=" + sF +" and d.dcounter <=" + sT +" and d.id_ptype=3"
		
		
        dt = cm.QuerySelect(q)
		
		
        jj = New JOut
        jj.success = "true"
        jj.data = dt
        jj.msg = "OK"
        Response.Clear()
        Response.Write(JsonConvert.SerializeObject(jj))
        Response.End()



    End Sub
End Class
