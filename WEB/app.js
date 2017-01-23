
Ext.define('list_model', {
    extend: 'Ext.data.Model',
    fields: [
	{ name: 'NAME', type: 'string' }
]
});

Ext.define('dev_model', {
    extend: 'Ext.data.Model',
    fields: [
	{ name: 'NAME', type: 'string' },
	{ name: 'ID_BD', type: 'string' },
    { name: 'ID_GRP', type: 'string' },
    { name: 'CDEVDESC', type: 'string' }
]
,
    idProperty: 'ID_BD'
});


Ext.define('tpl_model', {
    extend: 'Ext.data.Model',
    fields: [
	{ name: 'WEBTEMPLATEID', type: 'string' },
    { name: 'FILENAME', type: 'string' }
	
]
,
    idProperty: 'WEBTEMPLATEID'
});



Ext.define('col_model', {
    extend: 'Ext.data.Model',
    fields: [
	{ name: 'TEXT', type: 'string' },
	{ name: 'DATAINDEX', type: 'string' },
    { name: 'WIDTH', type: 'number' }
],
idProperty:'DATAINDEX'
});


Ext.define('map_model', {
    extend: 'Ext.data.Model',
    fields: [
	{ name: 'ID_BD', type: 'string' },
	{ name: 'CHORT', type: 'string' },
    { name: 'MAPX', type: 'number' },
    { name: 'MAPY', type: 'number' },
	{ name: 'COLOR', type: 'string' },
	{ name: 'INFO', type: 'string' }
	]
	,
    idProperty: 'ID_BD'
});


Ext.define('rep_model', {
    extend: 'Ext.data.Model',
    fields: [
	{ name: 'WEBREPORTID', type: 'number'}, 
	{ name: 'CREATEDATE', type: 'date'}, 
	{ name: 'USERSID', type: 'number'}   , 
	{ name: 'ID_BD', type: 'number'}   , 
	{ name: 'ID_PTYPE', type: 'number'}, 
	{ name: 'DFROM', type: 'date'}   , 
	{ name: 'DTO', type: 'date'}   , 
	{ name: 'TEMPLATEID', type: 'number'}, 
	{ name: 'REPORTFILE', type: 'string'}, 
	{ name: 'REPORTREADY', type: 'number'}, 
	{ name: 'REPORTMSG', type: 'string'},
	{ name: 'NODENAME', type: 'string'},
	{ name: 'CTYPE', type: 'string'},
	{ name: 'FILENAME', type: 'string' },
	{ name: 'TNAME', type: 'string' }
],
idProperty:'WEBREPORTID'
});


Ext.define('status_model', {
    extend: 'Ext.data.Model',
    fields: [
	{ name: 'GROUP_NAME', type: 'string' },
	{ name: 'NODE', type: 'string' },
	{ name: 'CURTIME', type: 'number' },
    { name: 'HOURTIME', type: 'number' },
    { name: 'DAYTIME', type: 'number' },
    { name: 'TOTALTIME', type: 'number' },
	{ name: 'COLOR', type: 'string' },
	{ name: 'HMISSING', type: 'number' },
	{ name: 'DMISSING', type: 'number' },
	{ name: 'INFO', type: 'string' },
    { name: 'ID_BD', type: 'number' }
],
    idProperty: 'ID_BD'
});


Ext.define('log_model', {
    extend: 'Ext.data.Model',
    fields: [
	{ name: 'ID', type: 'string' },
	{ name: 'УЗЕЛ', type: 'string' },
	{ name: 'ВРЕМЯ', type: 'string' },
    { name: 'ТИП', type: 'string' },
    { name: 'ДЛИТЕЛЬНОСТЬ', type: 'string' },
	{ name: 'ТЕКСТ', type: 'string' }
]
});


Ext.define('graph_model', {
    extend: 'Ext.data.Model',
    fields: [
	{ name: 'P_DATE', type: 'string' },
	{ name: 'S0', type: 'number' },
	{ name: 'S1', type: 'number' },
	{ name: 'S2', type: 'number' },
	{ name: 'S3', type: 'number' },
	{ name: 'S4', type: 'number' },
	{ name: 'S5', type: 'number' },
	{ name: 'S6', type: 'number' },
	{ name: 'S7', type: 'number' },
	{ name: 'S8', type: 'number' },
	{ name: 'S9', type: 'number' },
	{ name: 'S_INFO', type: 'string' }
],
idProperty:'P_DATE'
});


var enumPtype = Ext.create('Ext.data.ArrayStore', {
    fields: [{ name: 'name' }, { name: 'value', type: 'int'}], data: [
   ['Мгновенные значения', 1]
  ,['Итоговые значения', 2]
  ,['Часовой архив', 3]
 , ['Суточный архив', 4]
 ]
});

var enumPtype34 = Ext.create('Ext.data.ArrayStore', {
    fields: [{ name: 'name' }, { name: 'value', type: 'int'}], data: [
  ['Часовой архив', 3]
 , ['Суточный архив', 4]
 ]
});

var enumGtype = Ext.create('Ext.data.ArrayStore', {
    fields: [{ name: 'name' }, { name: 'value', type: 'int'}], data: [
	['Температуры', 2]
   ,['Массы и объемы', 3]
  ,['Энергия', 1]
 ]
});



if( typeof(Date.prototype.toLocaleFormat)=='undefined'){
    Date.prototype.toLocaleFormat = function(format) {
	    var f = {y : (this.getYear())%100 ,Y : this.getYear() + 1900,m : this.getMonth() + 1,d : this.getDate(),H : this.getHours(),M : this.getMinutes(),S : this.getSeconds()}
	    for(var k in f)
	        format = format.replace('%' + k, f[k] < 10 ? "0" + f[k] : f[k]);
	    return format;
	};
}


var last_tpl = "";
var last_tplname = "не задан";

var last_p = "";
var last_pname = "не задан";
var last_d = "";
var last_dname = "узел не выбран";

var date_f =Ext.Date.clearTime( Ext.Date.subtract(new Date(), Ext.Date.DAY, 5) ) ;
var date_t =Ext.Date.clearTime( Ext.Date.add     (new Date(), Ext.Date.DAY, 1) );

var last_f=myDateRenderer(  date_f );
var	last_t=myDateRenderer(  date_t );

var contentPanel;
var menuPanel;

var intervalID = 0;
var dGrid;


Ext.define('data_model', {
    extend: 'Ext.data.Model',
    fields: [
            { name: 'ID', type: 'number' }
            , { name: 'ID_BD', type: 'string' }
            , { name: 'ID_PTYPE', type: 'string' }
            , { name: 'WORKTIME', type: 'number' }
            , { name: 'DCALL', type: 'date', dateFormat: 'Y-m-d H:i:s' }
             , { name: 'DCOUNTER', type: 'date', dateFormat: 'Y-m-d H:i:s' }
            , { name: 'ERRTIME', type: 'number' }
            , { name: 'OKTIME', type: 'number' }
			, { name: 'OKTIME2', type: 'number' }
			 , { name: 'ERRTIME2', type: 'number' }
             ,{ name: 'ERRTIMEH', type: 'number' }
            , { name: 'D_EQL_24', type: 'string' }
            , { name: 'HC_CODE', type: 'string' }
            , { name: 'HC', type: 'string' }
            , { name: 'HC_1', type: 'string' }
            , { name: 'HC_2', type: 'string' }
			, { name: 'HCRAW', type: 'string' }
            , { name: 'HCRAW1', type: 'string' }
            , { name: 'HCRAW2', type: 'string' }
			
			
	

            , { name: 'T1', type: 'number' }
            , { name: 'T2', type: 'number' }
            , { name: 'T3', type: 'number' }
            , { name: 'T4', type: 'number' }
            , { name: 'T5', type: 'number' }
            , { name: 'T6', type: 'number' }
            , { name: 'DT12', type: 'number' }
            , { name: 'DT45', type: 'number' }




            , { name: 'TCOOL', type: 'number' }
            , { name: 'TSUM1', type: 'number' }
            , { name: 'TSUM2', type: 'number' }
            , { name: 'TAIR1', type: 'number' }
              , { name: 'THOT', type: 'number' }


            , { name: 'Q1', type: 'number' }
            , { name: 'Q2', type: 'number' }
            , { name: 'Q3', type: 'number' }
            , { name: 'Q4', type: 'number' }
            , { name: 'Q5', type: 'number' }
            , { name: 'Q6', type: 'number' }

            , { name: 'Q1H', type: 'number' }
            , { name: 'Q2H', type: 'number' }
            , { name: 'DQ12', type: 'number' }
            , { name: 'DQ45', type: 'number' }

            , { name: 'G1', type: 'number' }
            , { name: 'G2', type: 'number' }
            , { name: 'G3', type: 'number' }
            , { name: 'G4', type: 'number' }
            , { name: 'G5', type: 'number' }
            , { name: 'G6', type: 'number' }
            , { name: 'DG45', type: 'number' }

            , { name: 'V1', type: 'number' }
            , { name: 'V2', type: 'number' }
            , { name: 'V3', type: 'number' }
            , { name: 'V4', type: 'number' }
            , { name: 'V5', type: 'number' }
            , { name: 'V6', type: 'number' }

            , { name: 'V1H', type: 'number' }
            , { name: 'V2H', type: 'number' }
            , { name: 'V4H', type: 'number' }
            , { name: 'V5H', type: 'number' }
            , { name: 'DV12', type: 'number' }

            , { name: 'M1', type: 'number' }
            , { name: 'M2', type: 'number' }
            , { name: 'M3', type: 'number' }
            , { name: 'M4', type: 'number' }
            , { name: 'M5', type: 'number' }
            , { name: 'M6', type: 'number' }
            , { name: 'DM12', type: 'number' }
            , { name: 'DM45', type: 'number' }



            , { name: 'P1', type: 'number' }
            , { name: 'P2', type: 'number' }
            , { name: 'P3', type: 'number' }
            , { name: 'P4', type: 'number' }
            , { name: 'P5', type: 'number' }
            , { name: 'P6', type: 'number' }


            , { name: 'DP12', type: 'number' }
            , { name: 'DP45', type: 'number' }



            , { name: 'DANS1', type: 'number' }
            , { name: 'DANS2', type: 'number' }
            , { name: 'DANS3', type: 'number' }
            , { name: 'DANS4', type: 'number' }
            , { name: 'DANS5', type: 'number' }
            , { name: 'DANS6', type: 'number' }

			, { name: 'L_TAIR1', type: 'number' }
			, { name: 'L_T1', type: 'number' }
			, { name: 'L_T2', type: 'number' }
			, { name: 'L_T3', type: 'number' }
			, { name: 'L_T4', type: 'number' }
			, { name: 'L_T5', type: 'number' }
			, { name: 'L_T6   ', type: 'number' }
			, { name: 'L_G1', type: 'number' }
			, { name: 'L_G2', type: 'number' }
			, { name: 'L_G3', type: 'number' }
			, { name: 'L_G4', type: 'number' }
			, { name: 'L_G5', type: 'number' }
			, { name: 'L_G6   ', type: 'number' }
			, { name: 'L_V1', type: 'number' }
			, { name: 'L_V2', type: 'number' }
			, { name: 'L_V3', type: 'number' }
			, { name: 'L_V4', type: 'number' }
			, { name: 'L_V5', type: 'number' }
			, { name: 'L_V6   ', type: 'number' }
			, { name: 'L_Q1', type: 'number' }
			, { name: 'L_Q2', type: 'number' }
			, { name: 'L_Q3', type: 'number' }
			, { name: 'L_Q4   ', type: 'number' }
			, { name: 'L_P1', type: 'number' }
			, { name: 'L_P2', type: 'number' }
			, { name: 'L_P3', type: 'number' }
			, { name: 'L_P4', type: 'number' }
			, { name: 'L_P5', type: 'number' }
			, { name: 'L_P6', type: 'number' }

        ]
});



var store_tpl = Ext.create('Ext.data.Store', {
	model: 'tpl_model',
	autoLoad: false,
	autoSync: false,
	proxy: {
		type: 'ajax',
		url: 'tlist.aspx',
		reader: {
			type: 'json'
		, root: 'data'
		, successProperty: 'success'
		, messageProperty: 'msg'
		},
		listeners: {
			exception: function (proxy, response, operation) {
			}
		}
	}
});


var store_map = Ext.create('Ext.data.Store', {
	model: 'map_model',
	autoLoad: false,
	autoSync: false,
	proxy: {
		type: 'ajax',
		url: 'mapinfo.aspx',
		reader: {
			type: 'json'
		, root: 'data'
		, successProperty: 'success'
		, messageProperty: 'msg'
		},
		listeners: {
			exception: function (proxy, response, operation) {
			}
			  
			
			
		}
	},
	listeners: {
	'load': function(){reloadMap();}
	}

});


var store_dev = Ext.create('Ext.data.Store', {
	model: 'dev_model',
	autoLoad: false,
	autoSync: false,
	proxy: {
		type: 'ajax',
		url: 'dev.aspx',
		reader: {
			type: 'json'
		, root: 'data'
		, successProperty: 'success'
		, messageProperty: 'msg'
		},
		listeners: {
			exception: function (proxy, response, operation) {
			    /*
			    Ext.MessageBox.show({
			    title: 'REMOTE EXCEPTION',
			    msg: operation.getError(),
			    icon: Ext.MessageBox.ERROR,
			    buttons: Ext.Msg.OK
			    });
			    */
			}
		}
	}
});



var store_status = Ext.create('Ext.data.Store', {
	model: 'status_model',
	autoLoad: false,
	autoSync: false,
	proxy: {
		type: 'ajax',
		url: 'status.aspx',
		reader: {
			type: 'json'
		, root: 'data'
		, successProperty: 'success'
		, messageProperty: 'msg'
		},
		listeners: {
			exception: function (proxy, response, operation) {
			    /*
			    Ext.MessageBox.show({
			    title: 'REMOTE EXCEPTION',
			    msg: operation.getError(),
			    icon: Ext.MessageBox.ERROR,
			    buttons: Ext.Msg.OK
			    });
			    */
			}
		}
	}
});



var store_graph = Ext.create('Ext.data.Store', {
	model: 'graph_model',
	autoLoad: false,
	autoSync: false,
	proxy: {
		type: 'ajax',
		url: 'g1.aspx',
		reader: {
			type: 'json'
		, root: 'data'
		, successProperty: 'success'
		, messageProperty: 'msg'
		},
		listeners: {
			exception: function (proxy, response, operation) {
			}
		}
	}
});


var store_data = Ext.create('Ext.data.Store', {
    model: 'data_model',
    autoLoad: false,
    autoSync: false,
    proxy: {
        type: 'ajax',
        url: 'data.aspx',
        reader: {
            type: 'json'
		    , root: 'data'
		    , successProperty: 'success'
		    , messageProperty: 'msg'
        },
        listeners: {

            exception: function (proxy, response, operation) {
                /*Ext.MessageBox.show({
                title: 'REMOTE EXCEPTION',
                msg: operation.getError(),
                icon: Ext.MessageBox.ERROR,
                buttons: Ext.Msg.OK
                });
                */
            }
        }
        
    },
    listeners: {
        load: function () {
            store_cols.load({ params: { D: last_d, P: last_p} });
        }
    }

    
});

var store_rep = Ext.create('Ext.data.Store', {
    model: 'rep_model',
    autoLoad: false,
    autoSync: false,
    proxy: {
        type: 'ajax',
        url: 'reports.aspx',
        reader: {
            type: 'json'
		    , root: 'data'
		    , successProperty: 'success'
		    , messageProperty: 'msg'
        },
        listeners: {

            exception: function (proxy, response, operation) {
                /*Ext.MessageBox.show({
                title: 'REMOTE EXCEPTION',
                msg: operation.getError(),
                icon: Ext.MessageBox.ERROR,
                buttons: Ext.Msg.OK
                });
                */
            }
        }
        
    }

});



var store_log = Ext.create('Ext.data.Store', {
    model: 'log_model',
    autoLoad: false,
    autoSync: false,
    proxy: {
        type: 'ajax',
        url: 'log.aspx',
        reader: {
            type: 'json'
		    , root: 'data'
		    , successProperty: 'success'
		    , messageProperty: 'msg'
        },
        listeners: {

            exception: function (proxy, response, operation) {
                /*Ext.MessageBox.show({
                title: 'REMOTE EXCEPTION',
                msg: operation.getError(),
                icon: Ext.MessageBox.ERROR,
                buttons: Ext.Msg.OK
                });
                */
            }
        }

    }

});


var newcolumns;
var store_cols = Ext.create('Ext.data.Store', {
    model: 'col_model',
    autoLoad: false,
    autoSync: false,
    proxy: {
        type: 'ajax',
        url: 'columns.aspx',
        reader: {
            type: 'json'
		, root: 'data'
		, successProperty: 'success'
		, messageProperty: 'msg'
        },
        listeners: {
            exception: function (proxy, response, operation) {
                /*Ext.MessageBox.show({
                title: 'REMOTE EXCEPTION',
                msg: operation.getError(),
                icon: Ext.MessageBox.ERROR,
                buttons: Ext.Msg.OK
                });
                */
            }
        }
    },
    listeners: {
        'load': function () {
            newcolumns = new Array();

//            newcolumns.push({ text:"№", xtype: 'rownumberer',  sortable: false, width: 50 });

            if (last_p == 1) {
                newcolumns.push({ text: 'Дата опроса', dataIndex: 'DCALL', width: 170, minWidth: 140, sortable: true, locked: true, xtype: 'datecolumn', format: 'd.m.Y H:i:s' });
                newcolumns.push({ text: 'Дата ТВ', dataIndex: 'DCOUNTER', width: 170, minWidth: 140, sortable: true, locked: true, xtype: 'datecolumn', format: 'd.m.Y H:i:s' });
            }
            if (last_p == 2) {
                newcolumns.push({ text: 'Дата ТВ', dataIndex: 'DCOUNTER', width: 170, minWidth: 140, sortable: true, locked: true, xtype: 'datecolumn', format: 'd.m.Y H:i:s' });
            }
            if (last_p == 3) {
                newcolumns.push({ text: 'Дата архива', dataIndex: 'DCOUNTER', width: 140, minWidth: 100, sortable: true, locked: true, xtype: 'datecolumn', format: 'd.m.Y H' });
            }
            if (last_p == 4) {
                newcolumns.push({ text: 'Дата архива', dataIndex: 'DCOUNTER', width: 140, minWidth: 100, sortable: true, locked: true, xtype: 'datecolumn', format: 'd.m.Y' });
            }


            store_cols.each(
				function (record, index) {
				    var txt = record.get('TEXT');
				    var di = record.get('DATAINDEX');
				    var w = record.get('WIDTH');
				    var f = record.get('COLFORMAT');
				    if (di != "DCALL" && di != "DCOUNTER") {
				        var formatstr = "0.000";
				        if (f == "N" || f == "F") {
				            if (f == "N")
				                formatstr = "0.00";
				            if (f == "F")
				                formatstr = "0.000";
				            newcolumns.push({ xtype: 'numbercolumn', text: txt, dataIndex: di, sortable: true, width: w, format: formatstr,renderer:myTipRenderer });
				        } else {
				            newcolumns.push({ text: txt, dataIndex: di, sortable: true, width: w ,renderer:myTipRenderer});
				        }
				    }
				}
			);

             if (last_p == 4) {
                 newcolumns.push({ text: 'Соответствие<br/>часовым', dataIndex: 'D_EQL_24', width: 100, minWidth: 50, sortable: true, renderer: D24Renderer });
            }
            

            dGrid.reconfigure(store_data, newcolumns);
   		    dGrid.setTitle(last_dname + ". " + last_pname + " (" + store_data.getCount() +" зап.)");
        }
    }
});

 

function myDateRenderer(value, metaData, record, row, col, store, gridView) 
{ 
    if(value==null) return '';
	var s='';
	if(Ext.isDate(value)){
		s = value.toLocaleFormat('%Y-%m-%dT%H:%M:%S');
	}else{
		s = new String(value);
	}
	
	var svalue='';
	if (s !=''){
		  var parts2 = s.split('T');
		  var dparts2  =parts2[0].split('-');
		  var hparts2 =parts2[1].split(':');
		  svalue=dparts2[0]+'-'+ dparts2[1] +'-'+ dparts2[2]+ ' '+hparts2[0] +':'+hparts2[1] +':'+ hparts2[2];
	}
	if (metaData != null) {
		metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(svalue) + '"';    
	};
    return svalue;
}


function myTSRenderer(value, metaData, record, row, col, store, gridView) 
{ 
    if(value==null) return '';
	var s='';
	s = new String(value);
	
	
	var svalue='';
	if (s !=''){
		  var parts = s.split('.');
		  if(parts.length==3){
		   svalue=parts[0] +'сут. ' + parts[1] ;
		  }
		  if(parts.length==2){
		   svalue=parts[0];
		  }
		  if(parts.length==1){
			svalue=s
		  }
		  
	}
    if (metaData != null) {
		metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(svalue) + '"';    
	};
    return svalue;
}


function OkRenderer(value, metaData, record, row, col, store, gridView) 
{ 
	val="";
    if(value==null) val= 'не готов';
	if(value==0) val= 'не готов';
	if(value==1) val= 'готов';
	if (metaData != null) {
		metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(val) + '"';    
	};
	return val;
}

function D24Renderer(value, metaData, record, row, col, store, gridView) {
	if (metaData != null) {
		metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(value) + '"';    
	};
    if (value == null) {if (metaData != null) metaData.style = "background-color:cyan";  return '?'; }
    if (value == '0') { if (metaData != null) metaData.style = "background-color:cyan"; return '?'; }
    if (value == '1') { if (metaData != null) metaData.style = "background-color:white"; return 'ОК'; }
    if (value == '2') { if (metaData != null) metaData.style = "background-color:red"; return 'не совпадает с часовыми'; }
    if (value == '3') { if (metaData != null) metaData.style = "background-color:yellow"; return 'не хватает часовых'; }
    
}


function myColorRenderer(value, metaData, record, row, col, store, gridView) {
    color = record.get('COLOR');
    if (color == null || color=='') {if (metaData != null) metaData.style = "background-color:whilte";} 
    if (color == 'RED') { if (metaData != null) metaData.style = "background-color:red";}
    if (color == 'YELLOW') { if (metaData != null) metaData.style = "background-color:yellow";  }
	if (metaData != null) {
		metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(value) + '"';    
	};
    return value;
}


function myTipRenderer(value, metaData, record, row, col, store, gridView) {
	if (metaData != null) {
		metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(value) + '"';    
	};
    return value;
}



function refRenderer(value, metaData, record, row, col, store, gridView) 
{ 

    
	if(record.get('REPORTREADY')==0) return '';
	if (metaData != null) {
		metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(record.get('REPORTFILE')) + '"';    
	};
	return '<a href=\''+record.get('REPORTFILE')+'\' target=\'_blank\'>Отчет</a>';

}

function trefRenderer(value, metaData, record, row, col, store, gridView) {


    if (record.get('FILENAME') == '') return '';
	if (metaData != null) {
		metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(record.get('FILENAME')) + '"';    
	};
    return "<a href='rpt\\template\\" + record.get('TNAME') + "' target='_blank' >" + record.get('FILENAME') +"</a>";

}


function reloadData(){
	
	store_data.load({ params: { D: last_d, P: last_p,  F:last_f, T:last_t} });
}

function reloadRep(){
	
	store_rep.load({ params: { D: last_d, P: last_p,  F:last_f, T:last_t, TPL:last_tpl,U: userid} });
}



//  MAP support
var map;
var leafletView;
var markers;
var rIcon; 
var gIcon ;
var bIcon ;
var yIcon ;
var win='undefined';

var monitorIntervalID=0;
var monitorID=0;

function Monitor(id){
if(win=='undefined'){
 win = Ext.create('widget.window', {
                title: 'Монитор',
                header: {
                    titlePosition: 2,
                    titleAlign: 'center'
                },
                closable: true,
                closeAction: 'hide',
				modal:true,
                maximizable: false,
                width: 500,
                minWidth: 400,
                height: 450,
                layout: {
                    type: 'absolute'
                },
                items: [ {
                    xtype: 'panel',
					id:'ajaxpanel',
					x:5,
					y:5,
					height:440,
					width:480,
                    items: [{
                        //title: 'Bogus Tab',
                        html: 'Ожидаем ответа...'
                    }]
                }]
            });
	}
	
	win.show();
	Ext.get('ajaxpanel').dom.innerHTML ='Подключение монитора...';
	LoadMonitor(id);
	monitorID=id;
	monitorIntervalID = window.setInterval(LoadMonitortimer, 1000);
}

function LoadMonitortimer(){
	LoadMonitor(monitorID);
};
function LoadMonitor(id){
	Ext.Ajax.request({
		url: 'monitor.aspx',
		method:  'POST',
		params: { 
					MID: id
				},
		scripts:true,
		success: function (response) {
			Ext.get('ajaxpanel').dom.innerHTML = response.responseText;
		}
	});
}

function reloadMap(){
	//console.log(
	markers = [];
	leafletView.RemoveMarkers();
	store_map.each(
		function (record, index) {
			var COLOR = record.get('COLOR');
			var MAPX = record.get('MAPX');
			var MAPY = record.get('MAPY');
			var f = record.get('COLFORMAT');
			var sName = record.get('CSHORT');
			var sPopup=sName +'<br/>' +record.get('INFO') + '<br/><a href="#" onclick="return Monitor(' +record.get("ID_BD") + ');">Монитор</a>';
			if(MAPX!=0 && MAPY!=0){
				switch (COLOR) {
					case 'GREEN':
						var marker = new PruneCluster.Marker(MAPY,MAPX,{ popup: sPopup, icon:gIcon},sName,0);
						break;
					case 'YELLOW':
						var marker = new PruneCluster.Marker(MAPY,MAPX,{ popup: sPopup, icon:yIcon},sName,1);
						break;
					case 'RED':
						var marker = new PruneCluster.Marker(MAPY,MAPX,{ popup: sPopup, icon:rIcon},sName,2);
						break;
					default:
						var marker = new PruneCluster.Marker(MAPY,MAPX,{ popup: sPopup, icon:bIcon},sName,3);
						break;
				}
				markers.push(marker);
				leafletView.RegisterMarker(marker);
			}
		}
	);
	leafletView.ProcessView();
};


function loadMap(){
	map = new L.Map('map', {center: new L.LatLng(60.000, 30.000), zoom: 10, zoomAnimation: false ,maxZoom:18});
	var yndx = new L.Yandex();
	map.addLayer(yndx);

	leafletView = new PruneClusterForLeaflet();

    leafletView.BuildLeafletClusterIcon = function(cluster) {
        var e = new L.Icon.MarkerCluster();

        e.stats = cluster.stats;
        e.population = cluster.population;
        return e;
    };

    var colors = ['#00AA00', '#dddd00','#EE0000'],
        pi2 = Math.PI * 2;
		
		
	rIcon = L.icon({
    iconUrl: '../css/iconr.png',
    iconSize: [20, 34],
    iconAnchor: [10, 34],
    popupAnchor: [0, -34],
    shadowUrl: '',
    shadowSize: [0, 0],
    shadowAnchor: [10, 34]
	});
	
	gIcon = L.icon({
    iconUrl: '../css/icong.png',
    iconSize: [20, 34],
    iconAnchor: [10, 34],
    popupAnchor: [0, -34],
    shadowUrl: '',
    shadowSize: [0, 0],
    shadowAnchor: [10, 34]
	});
	
	bIcon = L.icon({
    iconUrl: '../css/iconb.png',
    iconSize: [20, 34],
    iconAnchor: [10, 34],
    popupAnchor: [0, -34],
    shadowUrl: '',
    shadowSize: [0, 0],
    shadowAnchor: [10, 34]
	});
	
	yIcon = L.icon({
    iconUrl: '../css/icony.png',
    iconSize: [20, 34],
    iconAnchor: [10, 34],
    popupAnchor: [0, -34],
    shadowUrl: '',
    shadowSize: [0, 0],
    shadowAnchor: [10, 34]
	});


    L.Icon.MarkerCluster = L.Icon.extend({
        options: {
            iconSize: new L.Point(44, 44),
            className: 'prunecluster leaflet-markercluster-icon'
        },

        createIcon: function () {
            // based on L.Icon.Canvas from shramov/leaflet-plugins (BSD licence)
            var e = document.createElement('canvas');
            this._setIconStyles(e, 'icon');
            var s = this.options.iconSize;
            e.width = s.x;
            e.height = s.y;
            this.draw(e.getContext('2d'), s.x, s.y);
            return e;
        },

        createShadow: function () {
            return null;
        },

        draw: function(canvas, width, height) {

            var lol = 0;

            var start = 0;
            for (var i = 0, l = colors.length; i < l; ++i) {

                var size = this.stats[i] / this.population;


                if (size > 0) {
                    canvas.beginPath();
                    canvas.moveTo(22, 22);
                    canvas.fillStyle = colors[i];
                    var from = start + 0.14,
                        to = start + size * pi2;

                    if (to < from) {
                        from = start;
                    }
                    canvas.arc(22,22,22, from, to);

                    start = start + size*pi2;
                    canvas.lineTo(22,22);
                    canvas.fill();
                    canvas.closePath();
                }

            }

            canvas.beginPath();
            canvas.fillStyle = 'white';
            canvas.arc(22, 22, 18, 0, Math.PI*2);
            canvas.fill();
            canvas.closePath();

            canvas.fillStyle = '#555';
            canvas.textAlign = 'center';
            canvas.textBaseline = 'middle';
            canvas.font = 'bold 12px sans-serif';

            canvas.fillText(this.population, 22, 22, 40);
        }
    });

	 map.addLayer(leafletView);
	 
	 store_map.load();
}

function reloadStatus(){
	store_status.load({ params: { U: userid} });
}

function reloadLog() {
    store_log.load({ params: { U: userid,D: last_d} });
}

function reloadGraph(){
	store_graph.load({ params: { D: last_d, P: last_p,  F:last_f, T:last_t} });
}


function reloadTpl(){
	last_tpl="";
	last_tplname="";
	store_tpl.load({ params: { D: last_d, P: last_p,U: userid} });
}





////////////////////// GRAPH ///////////////////////


function GetG1Filter(){
		var p1 = Ext.create('Ext.panel.Panel', {
		    layout: {
		        type: 'table',
				columns:2
		    },
		    autoScroll: true,
			items: [
				{

					xtype:  'datefield',
					minWidth:'350',
				
					labelAlign:'top',
					format:'d/m/Y',
					submitFormat:'Y-m-d H:i:s',
					value:  date_f,
					name:  'dev_dfrom',
					itemId: 'dev_dfrom',
					fieldLabel: 'C',
					emptyText: 'С',
					editable: false,

					submitEmptyText: false,
					listeners:{
						change: function( fld, newValue, oldValue, eOpts ){
									var dfrom = newValue;
									if(dfrom==null ){
										last_f="";
									}
									if(dfrom!=null ){
										last_f=myDateRenderer(dfrom);
									}
									if(	last_d!="" && last_p!="" 	)
										reloadGraph();
									
						}
					}
				}
						
					
				,{

						xtype:  'datefield',
						minWidth:'350',
						labelAlign:'top',
						format:'d/m/Y',
						submitFormat:'Y-m-d H:i:s',
						value:  date_t,
						name:  'dev_dto',
						itemId: 'dev_dto',
						fieldLabel: 'По',
						emptyText: 'По',
						editable: false,
	
						submitEmptyText: false,
						listeners:{
							change: function( fld, newValue, oldValue, eOpts ){
										var dto = newValue;
									
										
										if(dto==null ){
											last_t="";
										}
										if( dto!=null ){
											last_t=myDateRenderer(dto);
										}
											if(	last_d!="" && last_p!="" 	)
											reloadGraph();
							}
						}
					}
			
			
                    ,{
                        xtype: 'combobox',
						minWidth:'350',
                        store: store_dev,
                        itemId: 'dev_id',
                        displayField: 'NAME',
                        valueField: 'ID_BD',
                        fieldLabel: 'Узел',
						emptyText:'Узел',
						labelAlign:'top',
                        editable: false,
                        queryMode: 'local',
	
                        listeners: {
                            select: function (combo, records, eOpts) {
                                last_d = records[0].get('ID_BD');
                                last_dname=records[0].get("NAME") + ", " + records[0].get("CDEVDESC") ;
                                gPanel.setTitle(last_dname + ". " + last_pname);
								if(	last_d!="" && last_p!="" 	)
											reloadGraph();
                            }
                        }
                    }
						
					,{
                            xtype: 'combobox',
							minWidth:'350',
						    store: enumGtype,
                            itemId: 'g_type',
                            displayField: 'name',
                            valueField: 'value',
                            fieldLabel: 'График',
							emptyText:'График',
							labelAlign:'top',
                            editable: false,
                            queryMode: 'local',
						
                           
                            listeners: {
                                select: function (combo, records, eOpts) {
                                    last_p = records[0].get('value');
                                    last_pname = records[0].get('name');
                                    gPanel.setTitle(last_dname + ". " + last_pname);
									if(	last_d!="" && last_p!="" 	)
											reloadGraph();
                                },
								render : function(combo,eOpts) {
									combo.setValue(combo.store.first().data.value);
									last_p =combo.store.first().data.value;
									last_pname =combo.store.first().data.name;
								}
                            }
                        }
                    ]
		}
	);
	return p1;
			
}


function GetG1Panel(){
	
	var markerFx = {
            duration: 200,
            easing: 'backOut'
        };
	gPanel =Ext.create('Ext.Panel',	
	       { xtype: 'panel',
			itemId: 'p_graph',
			items:[
			{
            xtype: 'cartesian',
            width: '100%',
            height: 500,
          
            store: store_graph,
            insetPadding: 10,
            // legend: {
            //    docked: 'right'
            //},
            
            axes: [{
                type: 'numeric',
                fields: ['S0', 'S1', 'S2', 'S3','S4', 'S5', 'S6', 'S7','S8', 'S9' ],
                position: 'left',
                grid: true,
                minimum: 0
                
            }, {
                type: 'category',
                fields: 'P_DATE',
                position: 'bottom',
                grid: true,
                label: {
                    rotate: {
                        degrees: -45
                    }
                }
            }],
			
			
			
			
            series: [{
                type: 'line',
                axis: 'left',
                title: 'График 0',
                xField: 'P_DATE',
                yField: 'S0',
                style: {
                    lineWidth: 4
                },
                marker: {
                    type: 'square',
                    fx: markerFx
                },
                highlight: {
                  scaling: 2
                },
				 renderer: function(sprite, record, attr, index, store){
					 
					var title="S0";
					var str =  store_graph.getAt(0).get('S_INFO');
					var res = str.split(";"); 
					for(i=0;i<res.length;i++){
						if(res[i].substring(0, 2)==title){
							var ss = res[i].split("=");
							title =ss[1];
							return Ext.apply(attr, {
							  title: title,
							  hidden:false
						   });
						}
					} 
				   return Ext.apply(attr, {
					  hidden: true
				   });
				   
				},
				
                tooltip: {
                    trackMouse: true,
                    style: 'background: #fff',
                     renderer: function(storeItem, item) {
						 
						
						var title="S0";
						var str = storeItem.get('S_INFO');
						var res = str.split(";"); 
						for(i=0;i<res.length;i++){
							if(res[i].substring(0, 2)==title){
								var ss = res[i].split("=");
								title =ss[1];
								this.setHtml(title + '  ' + storeItem.get('P_DATE') + ': ' + storeItem.get(item.series.getYField()) );
								return;
							}
						}
						this.setHtml('');
                    }
                }
            }, {
                type: 'line',
                axis: 'left',
                title: 'График 1',
                xField: 'P_DATE',
                yField: 'S1',
                style: {
                    lineWidth: 4
                },
                 marker: {
                    type: 'triangle',
                    fx: markerFx
                },
                highlight: {
                   scaling: 2
                },
				renderer: function(sprite, record, attr, index, store){
					 
					var title="S1";
					var str =  store_graph.getAt(0).get('S_INFO');
					var res = str.split(";"); 
					for(i=0;i<res.length;i++){
						if(res[i].substring(0, 2)==title){
							var ss = res[i].split("=");
							title =ss[1];
							return Ext.apply(attr, {
							  title: title,
							  hidden:false
						   });
						}
					} 
				   return Ext.apply(attr, {
					  hidden: true
				   });
				   
				},
                tooltip: {
                    trackMouse: true,
                    style: 'background: #fff',
					  renderer: function(storeItem, item) {
                         var title = 'S1';
						 var str = storeItem.get('S_INFO');
						var res = str.split(";"); 
						for(i=0;i<res.length;i++){
							if(res[i].substring(0, 2)==title){
								var ss = res[i].split("=");
								title =ss[1];
								this.setHtml(title + '  ' + storeItem.get('P_DATE') + ': ' + storeItem.get(item.series.getYField()) );
								return;
							}
						}
						this.setHtml('');
                    }
                }
            }, {
                type: 'line',
                axis: 'left',
                title: 'График 2',
                xField: 'P_DATE',
                yField: 'S2',
                style: {
                    lineWidth: 4
                },
               marker: {
                    type: 'arrow',
                    fx: markerFx
                },
                highlight: {
                   scaling: 2
                },
				renderer: function(sprite, record, attr, index, store){
					 
					var title="S2";
					var str =  store_graph.getAt(0).get('S_INFO');
					var res = str.split(";"); 
					for(i=0;i<res.length;i++){
						if(res[i].substring(0, 2)==title){
							var ss = res[i].split("=");
							title =ss[1];
							return Ext.apply(attr, {
							  title: title,
							  hidden:false
						   });
						}
					} 
				   return Ext.apply(attr, {
					  hidden: true
				   });
				   
				},
                tooltip: {
                    trackMouse: true,
                    style: 'background: #fff',
					  renderer: function(storeItem, item) {
                         var title = 'S2';
						 	var str = storeItem.get('S_INFO');
						var res = str.split(";"); 
						for(i=0;i<res.length;i++){
							if(res[i].substring(0, 2)==title){
								var ss = res[i].split("=");
								title =ss[1];
								this.setHtml(title + '  ' + storeItem.get('P_DATE') + ': ' + storeItem.get(item.series.getYField()) );
								return;
							}
						}
						this.setHtml('');
                    }
                }
            }, {
					type: 'line',
					axis: 'left',
					title: 'График 3',
					xField: 'P_DATE',
					yField: 'S3',
					style: {
						lineWidth: 4
					},
					 marker: {
						type: 'cross',
						fx: markerFx
					},
					highlight: {
						scaling: 2
						 
					}
					
					,
					renderer: function(sprite, record, attr, index, store){
					 
					var title="S3";
					var str =  store_graph.getAt(0).get('S_INFO');
					var res = str.split(";"); 
					for(i=0;i<res.length;i++){
						if(res[i].substring(0, 2)==title){
							var ss = res[i].split("=");
							title =ss[1];
							return Ext.apply(attr, {
							  title: title,
							  hidden:false
						   });
						}
					} 
				   return Ext.apply(attr, {
					  hidden: true
				   });
				   
				},
					tooltip: {
						trackMouse: true,
						style: 'background: #fff',
						renderer: function(storeItem, item) {
						   var title = 'S3';
						   	var str = storeItem.get('S_INFO');
						var res = str.split(";"); 
						for(i=0;i<res.length;i++){
							if(res[i].substring(0, 2)==title){
								var ss = res[i].split("=");
								title =ss[1];
								this.setHtml(title + '  ' + storeItem.get('P_DATE') + ': ' + storeItem.get(item.series.getYField()) );
								return;
							}
						}
						this.setHtml('');
						}
					}
			}
		   , {
					type: 'line',
					axis: 'left',
					title: 'График 4',
					xField: 'P_DATE',
					yField: 'S4',
					style: {
						lineWidth: 4
					},
					marker: {
						radius: 4,
						fx: markerFx
					},
					highlight: {
						scaling: 2
						 
					}
					
					,
					renderer: function(sprite, record, attr, index, store){
					 
					var title="S4";
					var str =  store_graph.getAt(0).get('S_INFO');
					var res = str.split(";"); 
					for(i=0;i<res.length;i++){
						if(res[i].substring(0, 2)==title){
							var ss = res[i].split("=");
							title =ss[1];
							return Ext.apply(attr, {
							  title: title,
							  hidden:false
						   });
						}
					} 
				   return Ext.apply(attr, {
					  hidden: true
				   });
				   
				},
					tooltip: {
						trackMouse: true,
						style: 'background: #fff',
						renderer: function(storeItem, item) {
						   var title = 'S4';
						   	var str = storeItem.get('S_INFO');
						var res = str.split(";"); 
						for(i=0;i<res.length;i++){
							if(res[i].substring(0, 2)==title){
								var ss = res[i].split("=");
								title =ss[1];
								this.setHtml(title + '  ' + storeItem.get('P_DATE') + ': ' + storeItem.get(item.series.getYField()) );
								return;
							}
						}
						this.setHtml('');
						}
					}
			}
		   
		   , {
					type: 'line',
					axis: 'left',
					title: 'График 5',
					xField: 'P_DATE',
					yField: 'S5',
					style: {
						lineWidth: 4
					},
					  marker: {
						type: 'square',
						fx: markerFx
					},
					highlight: {
						scaling: 2
						 
					}
					
					,
					renderer: function(sprite, record, attr, index, store){
					 
					var title="S5";
					var str =  store_graph.getAt(0).get('S_INFO');
					var res = str.split(";"); 
					for(i=0;i<res.length;i++){
						if(res[i].substring(0, 2)==title){
							var ss = res[i].split("=");
							title =ss[1];
							return Ext.apply(attr, {
							  title: title,
							  hidden:false
						   });
						}
					} 
				   return Ext.apply(attr, {
					  hidden: true
				   });
				   
				},
					tooltip: {
						trackMouse: true,
						style: 'background: #fff',
						renderer: function(storeItem, item) {
						   var title = 'S5';
						   	var str = storeItem.get('S_INFO');
						var res = str.split(";"); 
						for(i=0;i<res.length;i++){
							if(res[i].substring(0, 2)==title){
								var ss = res[i].split("=");
								title =ss[1];
								this.setHtml(title + '  ' + storeItem.get('P_DATE') + ': ' + storeItem.get(item.series.getYField()) );
								return;
							}
						}
						this.setHtml('');
						}
					}
			},
			, {
					type: 'line',
					axis: 'left',
					title: 'График 6',
					xField: 'P_DATE',
					yField: 'S6',
					style: {
						lineWidth: 4
					},
					  marker: {
						type: 'arrow',
						fx: markerFx
					},
					highlight: {
						scaling: 2
						 
					}
					
					,
					renderer: function(sprite, record, attr, index, store){
					 
					var title="S6";
					var str =  store_graph.getAt(0).get('S_INFO');
					var res = str.split(";"); 
					for(i=0;i<res.length;i++){
						if(res[i].substring(0, 2)==title){
							var ss = res[i].split("=");
							title =ss[1];
							return Ext.apply(attr, {
							  title: title,
							  hidden:false
						   });
						}
					} 
				   return Ext.apply(attr, {
					  hidden: true
				   });
				   
				},
					tooltip: {
						trackMouse: true,
						style: 'background: #fff',
						renderer: function(storeItem, item) {
						   var title = 'S6';
						   	var str = storeItem.get('S_INFO');
						var res = str.split(";"); 
						for(i=0;i<res.length;i++){
							if(res[i].substring(0, 2)==title){
								var ss = res[i].split("=");
								title =ss[1];
								this.setHtml(title + '  ' + storeItem.get('P_DATE') + ': ' + storeItem.get(item.series.getYField()) );
								return;
							}
						}
						this.setHtml('');
						}
					}
			}
		   , {
					type: 'line',
					axis: 'left',
					title: 'График 7',
					xField: 'P_DATE',
					yField: 'S7',
					style: {
						lineWidth: 4
					},
				    marker: {
						type: 'cross',
						fx: markerFx
					},
					highlight: {
					scaling: 2
						 
					}
					
					,
					renderer: function(sprite, record, attr, index, store){
					 
					var title="S7";
					var str =  store_graph.getAt(0).get('S_INFO');
					var res = str.split(";"); 
					for(i=0;i<res.length;i++){
						if(res[i].substring(0, 2)==title){
							var ss = res[i].split("=");
							title =ss[1];
							return Ext.apply(attr, {
							  title: title,
							  hidden:false
						   });
						}
					} 
				   return Ext.apply(attr, {
					  hidden: true
				   });
				   
				},
					tooltip: {
						trackMouse: true,
						style: 'background: #fff',
						renderer: function(storeItem, item) {
						var title = 'S7';
						   	var str = storeItem.get('S_INFO');
						
							var res = str.split(";"); 
							for(i=0;i<res.length;i++){
							if(res[i].substring(0, 2)==title){
								var ss = res[i].split("=");
								title =ss[1];
								this.setHtml(title + '  ' + storeItem.get('P_DATE') + ': ' + storeItem.get(item.series.getYField()) );
								return;
							}
						}
						this.setHtml('');
						}
					}
			}
		   
		   , {
					type: 'line',
					axis: 'left',
					title: 'График 8',
					xField: 'P_DATE',
					yField: 'S8',
					style: {
						lineWidth: 4
					},
					 marker: {
						type: 'triangle',
						fx: markerFx
					},
					highlight: {
						scaling: 2
						 
					}
					
					,
					renderer: function(sprite, record, attr, index, store){
					 
					var title="S8";
					var str =  store_graph.getAt(0).get('S_INFO');
					var res = str.split(";"); 
					for(i=0;i<res.length;i++){
						if(res[i].substring(0, 2)==title){
							var ss = res[i].split("=");
							title =ss[1];
							return Ext.apply(attr, {
							  title: title,
							  hidden:false
						   });
						}
					} 
				   return Ext.apply(attr, {
					  hidden: true
				   });
				   
				},
					tooltip: {
						trackMouse: true,
						style: 'background: #fff',
						renderer: function(storeItem, item) {
						   var title = 'S8';
						   	var str = storeItem.get('S_INFO');
						var res = str.split(";"); 
						for(i=0;i<res.length;i++){
							if(res[i].substring(0, 2)==title){
								var ss = res[i].split("=");
								title =ss[1];
								this.setHtml(title + '  ' + storeItem.get('P_DATE') + ': ' + storeItem.get(item.series.getYField()) );
								return;
							}
						}
						this.setHtml('');
						}
					}
			}
			
			, {
					type: 'line',
					axis: 'left',
					title: 'График 9',
					xField: 'P_DATE',
					yField: 'S9',
					style: {
						lineWidth: 4
					},
					marker: {
						radius: 4,
						fx: markerFx
					},
					highlight: {
						scaling: 2
					}
					
					,
					renderer: function(sprite, record, attr, index, store){
					 
					var title="S9";
					var str = store_graph.getAt(0).get('S_INFO');
					var res = str.split(";"); 
					for(i=0;i<res.length;i++){
						if(res[i].substring(0, 2)==title){
							var ss = res[i].split("=");
							title =ss[1];
							return Ext.apply(attr, {
							  title: title,
							  hidden:false
						   });
						}
					} 
				   return Ext.apply(attr, {
					  hidden: true
				   });
				   
				},
					tooltip: {
						trackMouse: true,
						style: 'background: #fff',
						renderer: function(storeItem, item) {
						   var title = 'S9';
						   	var str = storeItem.get('S_INFO');
						var res = str.split(";"); 
							for(i=0;i<res.length;i++){
							if(res[i].substring(0, 2)==title){
								var ss = res[i].split("=");
								title =ss[1];
								this.setHtml(title + '  ' + storeItem.get('P_DATE') + ': ' + storeItem.get(item.series.getYField()) );
								return;
							}
						}
						this.setHtml('');
						}
					}
			}
		   ]
        }]
	}
	);
	return gPanel; 
	
	
}




function GetDataFilter(){
		var p1 = Ext.create('Ext.panel.Panel', {
		    layout: {
		        type: 'table',
				columns:2
		    },
		    autoScroll: true,
			items: [
			{

						xtype:  'datefield',
						minWidth:'350',
					
						labelAlign:'top',
						format:'d/m/Y',
						submitFormat:'Y-m-d H:i:s',
						value:  date_f,
						name:  'dev_dfrom',
						itemId: 'dev_dfrom',
						fieldLabel: 'C',
						emptyText: 'С',
						editable: false,

				 		submitEmptyText: false,
						listeners:{
							change: function( fld, newValue, oldValue, eOpts ){
										var dfrom = newValue;
										if(dfrom==null ){
											last_f="";
										}
										if(dfrom!=null ){
											last_f=myDateRenderer(dfrom);
										}
										if(	last_d!="" && last_p!="" 	)
											reloadData();
										
							}
						}
						}
						
					
						,{

						xtype:  'datefield',
						
					
						minWidth:'350',
						labelAlign:'top',
						format:'d/m/Y',
						submitFormat:'Y-m-d H:i:s',
						value:  date_t,
						name:  'dev_dto',
						itemId: 'dev_dto',
						fieldLabel: 'По',
						emptyText: 'По',
						editable: false,
	
						submitEmptyText: false,
						listeners:{
							change: function( fld, newValue, oldValue, eOpts ){
										var dto = newValue;
									
										
										if(dto==null ){
											last_t="";
										}
										if( dto!=null ){
											last_t=myDateRenderer(dto);
										}
											if(	last_d!="" && last_p!="" 	)
											reloadData();
							}
						}
						},
			
			
                    {
                        xtype: 'combobox',
					
					
						minWidth:'350',
                        store: store_dev,
                        itemId: 'dev_id',
                        displayField: 'NAME',
                        valueField: 'ID_BD',
                        fieldLabel: 'Узел',
						emptyText:'Узел',
						labelAlign:'top',
                        editable: false,
                        queryMode: 'local',
	
                        listeners: {
                            select: function (combo, records, eOpts) {
                                last_d = records[0].get('ID_BD');
                                last_dname=records[0].get("NAME") + ", " + records[0].get("CDEVDESC") ;
                                dGrid.setTitle(last_dname + ". " + last_pname);
								if(	last_d!="" && last_p!="" 	)
											reloadData();
                            }
                        }
                    }
						
						,
                        {
                            xtype: 'combobox',
							minWidth:'350',
						    store: enumPtype,
                            itemId: 'dev_ptype',
                            displayField: 'name',
                            valueField: 'value',
                            fieldLabel: 'Архив',
							emptyText:'Архив',
							labelAlign:'top',
                            editable: false,
                            queryMode: 'local',
						
                           
                            listeners: {
                                select: function (combo, records, eOpts) {
                                    last_p = records[0].get('value');
                                    last_pname = records[0].get('name');
                                    dGrid.setTitle(last_dname + ". " + last_pname);
									if(	last_d!="" && last_p!="" 	)
											reloadData();
                                }
								,
								render : function(combo,eOpts) {
									combo.setValue(combo.store.first().data.value);
									last_p =combo.store.first().data.value;
									last_pname =combo.store.first().data.name;
								}
                            }
                        }
                    ]
		}
	);
	return p1;
			
}



function GetRepFilter(){
		var p1 = Ext.create('Ext.panel.Panel', {
		    layout: {
		        type: 'table',
				columns:2
		    },
		    autoScroll: true,
			items: [
			{

						xtype:  'datefield',
						minWidth:'350',
					
						labelAlign:'top',
						format:'d/m/Y',
						submitFormat:'Y-m-d H:i:s',
						value:  date_f,
						name:  'rep_dfrom',
						itemId: 'rep_dfrom',
						fieldLabel: 'C',
						emptyText: 'С',
						editable: false,

				 		submitEmptyText: false,
						listeners:{
							change: function( fld, newValue, oldValue, eOpts ){
										var dfrom = newValue;
										if(dfrom==null ){
											last_f="";
										}
										if(dfrom!=null ){
											last_f=myDateRenderer(dfrom);
										}
										if(	last_d!="" && last_p!="" 	)
											reloadRep();
										else
											last_tpl="";
										
							}
						}
						}
						
					
						,{

						xtype:  'datefield',
						
					
						minWidth:'350',
						labelAlign:'top',
						format:'d/m/Y',
						submitFormat:'Y-m-d H:i:s',
						value:  date_t,
						name:  'rep_dto',
						itemId: 'rep_dto',
						fieldLabel: 'По',
						emptyText: 'По',
						editable: false,
	
						submitEmptyText: false,
						listeners:{
							change: function( fld, newValue, oldValue, eOpts ){
										var dto = newValue;
										if(dto==null ){
											last_t="";
										}
										if( dto!=null ){
											last_t=myDateRenderer(dto);
										}
										if(	last_d!="" && last_p!="" 	)
											reloadRep();
										else
											last_tpl="";
							}
						}
						},
			
			
                    {
                        xtype: 'combobox',
					
					
						minWidth:'350',
                        store: store_dev,
                        itemId: 'dev_id',
                        displayField: 'NAME',
                        valueField: 'ID_BD',
                        fieldLabel: 'Узел',
						emptyText:'Узел',
						labelAlign:'top',
                        editable: false,
                        queryMode: 'local',
	
                        listeners: {
                            select: function (combo, records, eOpts) {
                                last_d = records[0].get('ID_BD');
                                last_dname=records[0].get("NAME") + ", " + records[0].get("CDEVDESC") ;
                                dGrid.setTitle(last_dname + ". " + last_pname);
                                
								if(	last_d!="" && last_p!="" 	){
									reloadTpl();
									combo.up('panel').down('#tpl_fld').setValue(null);
									reloadRep();
								}else{
									last_tpl="";
								}
                            }
                        }
                    }
						
						,
                        {
                            xtype: 'combobox',
							minWidth:'350',
						    store: enumPtype34,
                            itemId: 'dev_ptype',
                            displayField: 'name',
                            valueField: 'value',
                            fieldLabel: 'Архив',
							emptyText:'Архив',
							labelAlign:'top',
                            editable: false,
                            queryMode: 'local',
						
                           
                            listeners: {
                                select: function (combo, records, eOpts) {
                                    last_p = records[0].get('value');
                                    last_pname = records[0].get('name');
                                    dGrid.setTitle(last_dname + ". " + last_pname);
                    
									if(	last_d!="" && last_p!="" 	){
											reloadTpl();
											combo.up('panel').down('#tpl_fld').setValue(null);
											reloadRep();
									}else{
										last_tpl="";
									}
                                }
								,
								render : function(combo,eOpts) {
									combo.setValue(combo.store.first().data.value);
									last_p =combo.store.first().data.value;
									last_pname =combo.store.first().data.name;
								}
                            }
                        }
						
						
							,
                        {
                            xtype: 'combobox',
							minWidth:'350',
						    store: store_tpl,
                            itemId: 'tpl_fld',
                            displayField: 'FILENAME',
                            valueField: 'WEBTEMPLATEID',
                            fieldLabel: 'Шаблон',
							emptyText:'Шаблон',
							labelAlign:'top',
                            editable: false,
                            queryMode: 'local',
						
                           
                            listeners: {
                                select: function (combo, records, eOpts) {
                                    last_tpl = records[0].get('WEBTEMPLATEID');
                                    last_tplname = records[0].get('FILENAME');
									if(	last_d!="" && last_p!="" 	)
											reloadRep();
                                }
                            }
                        }
                        ,
                        {
                            xtype: 'button',
                            minWidth: '350',
							minHeight:60,
                            iconCls: 'icon-table_add',
                            text: 'Добавить шаблон',
							hidden: (allowtemplate == 0),
							disabled: (allowtemplate == 0),
                            itemId: 'bAddTpl',
                            handler: onAddTplClick
                        }

                    ]
		}
	);
	return p1;
			
}



function GetRepPanel() {

	dGrid=Ext.create('Ext.grid.Panel',	{ xtype: 'grid',
					itemId: 'rep_grid',
					autoScroll:true,
					store: store_rep,

					dockedItems: [{
					    xtype: 'toolbar',
					    items: [ {
					        iconCls: 'icon-page_add',
					        text: 'Создать отчет',
					        itemId: 'bAddRep',
					        scope: this,
					        handler: onAddClick
					    } ,
						{
					        iconCls: 'icon-page_refresh',
					        text: 'Обновить',
					        itemId: 'bRefresh',
					        scope: this,
					        handler: function(){
								reloadRep();
							}
					    } 
						]
					}], 
					columns: [
							{ text: 'Дата создания', dataIndex: 'CREATEDATE', width: 140, minWidth: 150, sortable: true, renderer:myDateRenderer},
							{ text: 'С', dataIndex: 'DFROM', width: 140, minWidth: 150, sortable: true , renderer:myDateRenderer},
							{ text: 'По', dataIndex: 'DTO', width: 140, minWidth: 150, sortable: true , renderer:myDateRenderer},
							{ text: 'Тип архива', dataIndex: 'CTYPE', width: 120, minWidth: 100, sortable: true,renderer:myTipRenderer  },
                            { text: 'Узел', dataIndex: 'NODENAME', width: 120, minWidth: 100, sortable: true,renderer:myTipRenderer  },
							{ text: 'Шаблон', dataIndex: 'FILENAME', width: 120, minWidth: 100, sortable: true, renderer: trefRenderer },
                            { text: 'Готовность', dataIndex: 'REPORTREADY', width: 100, minWidth: 50, sortable: true ,renderer:OkRenderer},
							{ text: 'Файл', dataIndex: 'REPORTREADY', width: 100, minWidth: 50, sortable: true ,renderer:refRenderer},
                            { text: 'Ошибка', dataIndex: 'REPORTMSG',  minWidth: 100, sortable: true, flex:1,renderer:myTipRenderer  }
						]
				});

		var p1 = Ext.create('Ext.panel.Panel', 
		{
				title: 'Отчеты',
				layout: 'fit',
				autoScroll:true,
				items: [
					dGrid
				]
			}
		  
		);
	
		intervalID = window.setInterval(reloadRep, 60000);

    return p1;
}


function onAddTplClick() {
	if(	last_d!="" && last_p!="" 	){
		var edit = Ext.create('EditWindow_addtpl');
		edit.show();  
	}else{
			Ext.MessageBox.show({
                title:  'Ошибка',
                msg:    'Необходимо выбрать узел и тип архива!',
                buttons: Ext.MessageBox.OK,
                icon:   Ext.MessageBox.ERROR
        		});
	}
}

function onRequeryClick(){
	
	if(	last_d!="" && ( last_p=="3" || last_p=="4" ) && last_f !="" && last_t !=""	){
		 Ext.Ajax.request({
			url:    'requery.aspx',
			method:  'POST',
			params: { 
						D: last_d, 
						P: last_p,  
						F:last_f, 
						T:last_t
					}
					,
			 success: function(response){
				Ext.MessageBox.show({
					title:  'Переопрос',
					msg:    'Период поставлен в очередь на переопрос',
					buttons: Ext.MessageBox.OK,
					icon:   Ext.MessageBox.INFO
					});
			 }
		});
	}else{
			Ext.MessageBox.show({
                title:  'Ошибка',
                msg:    'Необходимо задать в фильтре узел, тип архива (часовой, или суточный) и период!',
                buttons: Ext.MessageBox.OK,
                icon:   Ext.MessageBox.ERROR
        		});
	}
	
	
}


function onRequeryLineClick(){
	var selection = dGrid.getView().getSelectionModel().getSelection()[0];
    if (selection) {

	    if(	last_d!="" && ( last_p=="3" || last_p=="4" ) 	){
		     Ext.Ajax.request({
			    url:    'requeryline.aspx',
			    method:  'POST',
			    params: { 
						    L: selection.get('ID')
					    }
					    ,
			     success: function(response){
				    Ext.MessageBox.show({
					    title:  'Переопрос',
					    msg:    'Строка поставлена в очередь на переопрос',
					    buttons: Ext.MessageBox.OK,
					    icon:   Ext.MessageBox.INFO
					    });
			     }
		    });
        
	    }else{
			    Ext.MessageBox.show({
                    title:  'Ошибка',
                    msg:    'Необходимо задать в фильтре узел, тип архива (часовой, или суточный)!',
                    buttons: Ext.MessageBox.OK,
                    icon:   Ext.MessageBox.ERROR
        		    });
	    }
    }else{
		 Ext.MessageBox.show({
                    title:  'Ошибка',
                    msg:    'Необходимо выбрать строку для переопроса!',
                    buttons: Ext.MessageBox.OK,
                    icon:   Ext.MessageBox.ERROR
        		    });
	}
	
	
}


function onExportClick() {
    var wn =last_dname +". "+last_pname;
    var config = { title: wn , columns: newcolumns };
    var workbook = new Workbook(config);
    workbook.addWorksheet(dGrid.store, config);
    var x = workbook.render();
    window.open('data:application/vnd.ms-excel;base64,' + Base64.encode(x), '_blank');
}

function onExportPDFClick() {
    
    window.open("data_pdf.aspx?D="+last_d+"&P="+last_p+"&F="+last_f+"&T="+last_t, '_blank');
}

function onAddClick() {

   Ext.Ajax.request({
		url:    'addreport.aspx',
		method:  'POST',
		params: { 
					D: last_d, 
					P: last_p,  
					F:last_f, 
					T:last_t, 
					TPL:last_tpl, 
					U:userid
				}
				,
		 success: function(response){
			reloadRep();
		 }
	});

}

function GetDataPanel() {

	dGrid=Ext.create('Ext.grid.Panel',	{ xtype: 'grid',
					itemId: 'data_grid',
					autoScroll:true,
					store: store_data,

					dockedItems: [{
					    xtype: 'toolbar',
					    items: [ {
					        iconCls: 'icon-page_excel',
					        text: 'Экспорт',
					        itemId: 'bExport',
							hidden: (allowreport == 0),
							disabled: (allowreport == 0),
					        scope: this,
					        handler: onExportClick
					    } ,
						{
							iconCls:  'icon-database_lightning',
							text:   'Переопросить период',
							itemId: 'requery',
							hidden: (allowrequery == 0),
							disabled: (allowrequery == 0),
							scope:  this,
							handler : onRequeryClick
						}
                        ,
						{
							iconCls:  'icon-database_table',
							text:   'Переопросить строку',
							itemId:  'requeryline',
							hidden: (allowrequery == 0),
                            disabled: (allowrequery == 0),
							scope:  this,
							handler : onRequeryLineClick
						}
						]
					}], 

					
					columns: [
							//{ text: 'Дата опроса', dataIndex: 'DCALL', width: 80, minWidth: 70, sortable: true, locked: true },
							{ text: 'Дата архива', dataIndex: 'DCOUNTER', width: 120, minWidth: 140, sortable: true , renderer:myDateRenderer},
							{ text: 'T1', dataIndex: 'T1', width: 100, minWidth: 50, sortable: true },
                            { text: 'T2', dataIndex: 'T2', width: 100, minWidth: 50, sortable: true }
							
						
							

						]
				});

    var p1 = Ext.create('Ext.panel.Panel', 
	{
            title: 'Данные по узлу',
			layout: 'fit',
			autoScroll:true,
			items: [
				dGrid
			]
		}
      
    );

    return p1;
}




function GetStatusPanel() {

    sGrid = Ext.create('Ext.grid.Panel', { xtype: 'grid',
        itemId: 'rep_grid',
        autoScroll: true,
        store: store_status,

        dockedItems: [{
            xtype: 'toolbar',
            items: [
						    {
						        iconCls: 'icon-page_refresh',
						        text: 'Обновить',
						        itemId: 'bRefresh',
						        scope: this,
						        handler: function () {
						            reloadStatus();
						        }
						    }
						]
        }],
        columns: [


    	                    { text: 'Группа', dataIndex: 'GROUP_NAME', width: 120, minWidth: 50, sortable: true, renderer: myColorRenderer },
							{ text: 'Узел', dataIndex: 'NODE', width: 200, minWidth: 50, sortable: true, renderer: myColorRenderer },
							{ text: 'Отст. текущих', dataIndex: 'CURTIME', width: 140, minWidth: 30, sortable: true, renderer: myColorRenderer },
                            { text: 'Отст. часовых', dataIndex: 'HOURTIME', width: 140, minWidth: 30, sortable: true, renderer: myColorRenderer },
                            { text: 'Отст. суточных', dataIndex: 'DAYTIME', width: 140, minWidth: 30, sortable: true, renderer: myColorRenderer },
                            { text: 'Отст. итоговых', dataIndex: 'TOTALTIME', width: 140, minWidth: 30, sortable: true, renderer: myColorRenderer },
                            { text: 'Недост. часовых', dataIndex: 'HMISSING', width: 140, minWidth: 30, sortable: true, renderer: myColorRenderer },
                            { text: 'Недост. суточных', dataIndex: 'DMISSING', width: 140, minWidth: 30, sortable: true, renderer: myColorRenderer },
                            { text: 'Статус', dataIndex: 'INFO', minWidth: 50, flex: 1, sortable: true, renderer: myColorRenderer }

						]
    });

    var p1 = Ext.create('Ext.panel.Panel',
				{
				    title: 'Статус',
				    layout: 'fit',
				    autoScroll: true,
				    items: [
						sGrid
					]
				}

			);

    intervalID = window.setInterval(reloadStatus, 60000);

    return p1;
}



function GetMapPanel() {
    var p1 = Ext.create('Ext.panel.Panel',
				{
				    //title: 'Карта',
					id:'map',
				    layout: 'fit',
				    autoScroll: true,
				    items: [
						
					]
				}

			);
    intervalID = window.setInterval(reloadMap, 60000);

    return p1;
}


function GetLogFilter(){
		var p1 = Ext.create('Ext.panel.Panel', {
		    layout: {
		        type: 'table',
				columns:2
		    },
		    autoScroll: true,
			items: [
			
                    {
                        xtype: 'combobox',
					
					
						minWidth:'350',
                        store: store_dev,
                        itemId: 'dev_id',
                        displayField: 'NAME',
                        valueField: 'ID_BD',
                        fieldLabel: 'Узел',
						emptyText:'Узел',
						labelAlign:'top',
                        editable: false,
                        queryMode: 'local',
	
                        listeners: {
                            select: function (combo, records, eOpts) {
                                last_d = records[0].get('ID_BD');
                                last_dname=records[0].get("NAME") + ", " + records[0].get("CDEVDESC") ;
                                dGrid.setTitle(last_dname + ". " + last_pname);
								reloadLog();
								
                            }
                        }
                    }
						
				

                    ]
		}
	);
	return p1;
			
}

function GetLogPanel() {

	dGrid=Ext.create('Ext.grid.Panel',	{ xtype: 'grid',
					itemId: 'log_grid',
					autoScroll:true,
					store: store_log,

					dockedItems: [{
					    xtype: 'toolbar',
					    items: [
						{
					        iconCls: 'icon-page_refresh',
					        text: 'Обновить',
					        itemId: 'bRefresh',
					        scope: this,
					        handler: function(){
								reloadLog();
							}
					    } 
						]
					}], 
					columns: [
							{ text: 'ID', dataIndex: 'ID', width: 100, minWidth: 50, sortable: true },
							{ text: 'УЗЕЛ', dataIndex: 'УЗЕЛ', width: 200, minWidth: 150, sortable: true, renderer: myTipRenderer },
							{ text: 'ВРЕМЯ', dataIndex: 'ВРЕМЯ', width: 150, minWidth: 150, sortable: true },
							{ text: 'ТИП', dataIndex: 'ТИП', width: 150, minWidth: 100, sortable: true, renderer: myTipRenderer },
                            { text: 'ДЛИТЕЛЬНОСТЬ', dataIndex: 'ДЛИТЕЛЬНОСТЬ', width: 120, minWidth: 100, sortable: true },
							{ text: 'ТЕКСТ', dataIndex: 'ТЕКСТ', minWidth: 100, sortable: true, flex: 1, renderer: myTipRenderer }
                           
						]
				});

		var p1 = Ext.create('Ext.panel.Panel', 
		{
				title: 'ЛОГ',
				layout: 'fit',
				autoScroll:true,
				items: [
					dGrid
				]
			}
		  
		);
	
		intervalID = window.setInterval(reloadLog, 60000);

    return p1;
}


menuPanel = Ext.create('Ext.panel.Panel', 
		{ region:'north', layout:'hbox', height:60 }
		);

contentPanel=Ext.create('Ext.panel.Panel', { region:'center', layout:'fit' } );

filterPanel=Ext.create('Ext.panel.Panel', { hidden:true, title:'Регистрация', region:'north', layout:'fit' , // width: 180,  //west
	            collapsible: true,
                collapsed:false,
				autoScroll:true,
             	titleCollapse :true,
				border:true} 
				);


function OnLogin(){
	contentPanel.removeAll();
	if (intervalID != 0) {
		window.clearInterval(intervalID);
		intervalID = 0;
	}
	if(monitorIntervalID!=0){
		window.clearInterval(monitorIntervalID);
		monitorIntervalID=0;
	}
	menuPanel.removeAll();
	menuPanel.add(
            		{
						toggleGroup:'menu',
						xtype: 'button',
						scale: 'small',
						text: 'Статус',
		 				iconCls: 'icon-chart_bar',
						itemId: 'cmd_status',
						border: 1,
						minWidth: 200,
						style: {
							borderColor: 'cyan',
							borderStyle: 'solid'
						},
						handler: function () {
							contentPanel.removeAll();
							if(intervalID!=0){
								window.clearInterval(intervalID);
								intervalID=0;
							}
							if(monitorIntervalID!=0){
								window.clearInterval(monitorIntervalID);
								monitorIntervalID=0;
							}
							
							contentPanel.add(GetStatusPanel());
							filterPanel.removeAll();
							filterPanel.setVisible(false);
							store_status.load({ params: { U: userid} });
							
						}


					});
					
					
		menuPanel.add(
            		{
						toggleGroup:'menu',
						xtype: 'button',
						scale: 'small',
						text: 'Карта',
		 				iconCls: 'icon-map',
						itemId: 'cmd_map',
						border: 1,
						minWidth: 200,
						style: {
							borderColor: 'cyan',
							borderStyle: 'solid'
						},
						handler: function () {
							contentPanel.removeAll();
							if(intervalID!=0){
								window.clearInterval(intervalID);
								intervalID=0;
							}
							if(monitorIntervalID!=0){
								window.clearInterval(monitorIntervalID);
								monitorIntervalID=0;
							}
							contentPanel.add(GetMapPanel());
							filterPanel.removeAll();
							filterPanel.setVisible(false);
							loadMap();
							
						}


					});
					
	menuPanel.add({
						toggleGroup:'menu',
						xtype: 'button',
						scale: 'small',
						text: 'Архив',
		 				iconCls: 'icon-page_white_zip',
						itemId: 'cmd_arch',
						border: 1,
						minWidth: 200,
						style: {
							borderColor: 'cyan',
							borderStyle: 'solid'
						},
						handler: function () {
							contentPanel.removeAll();
							if(intervalID!=0){
								window.clearInterval(intervalID);
								intervalID=0;
							}
							if(monitorIntervalID!=0){
								window.clearInterval(monitorIntervalID);
								monitorIntervalID=0;
							}
							contentPanel.add(GetDataPanel());
							filterPanel.removeAll();
							filterPanel.add(GetDataFilter());
							filterPanel.setVisible(true);
							filterPanel.expand();
							filterPanel.setTitle('Фильтр');
							store_dev.load({ params: { U: userid} });
							
						}


					});
		if(allowreport==1){
			menuPanel.add({	
						toggleGroup:'menu',
						xtype: 'button',
						scale: 'small',
						text: 'Отчет',
						iconCls: 'icon-script',
						itemId: 'cmd_rep',
						border: 1,
						minWidth: 200,
						style: {
							borderColor: 'cyan',
							borderStyle: 'solid'
						},
						handler: function () {
						    contentPanel.removeAll();
							if(intervalID!=0){
								window.clearInterval(intervalID);
								intervalID=0;
							}
							if(monitorIntervalID!=0){
								window.clearInterval(monitorIntervalID);
								monitorIntervalID=0;
							}
							contentPanel.add(GetRepPanel());
							filterPanel.removeAll();
							filterPanel.add(GetRepFilter());
							filterPanel.setVisible(true);
							filterPanel.expand();
							filterPanel.setTitle('Фильтр');
							store_dev.load({ params: { U: userid} });
							}
					}
					);
		}
														
		menuPanel.add({	
						toggleGroup:'menu',
						xtype: 'button',
						scale: 'small',
						text: 'Графики',
						iconCls: 'icon-chart_line',
						itemId: 'cmd_g1',
						border: 1,
						minWidth: 200,
						//flex:1,
						style: {
							borderColor: 'cyan',
							borderStyle: 'solid'
						},
						handler: function () {
							contentPanel.removeAll();
							if(intervalID!=0){
								window.clearInterval(intervalID);
								intervalID=0;
							}
							if(monitorIntervalID!=0){
								window.clearInterval(monitorIntervalID);
								monitorIntervalID=0;
							}
							contentPanel.add(GetG1Panel());
							filterPanel.removeAll();
							filterPanel.add(GetG1Filter());
							filterPanel.setVisible(true);
							filterPanel.expand();
							filterPanel.setTitle('Фильтр');
							store_dev.load({ params: { U: userid} });
							

						}
					}
					);

menuPanel.add(
            		{
            		    toggleGroup: 'menu',
            		    xtype: 'button',
            		    scale: 'small',
            		    text: 'Лог',
            		    iconCls: 'icon-script_code_red',
            		    itemId: 'cmd_log',
            		    border: 1,
            		    minWidth: 200,
            		    style: {
            		        borderColor: 'cyan',
            		        borderStyle: 'solid'
            		    },
            		    handler: function () {
            		        contentPanel.removeAll();
            		        if (intervalID != 0) {
            		            window.clearInterval(intervalID);
            		            intervalID = 0;
            		        }
							if(monitorIntervalID!=0){
								window.clearInterval(monitorIntervalID);
								monitorIntervalID=0;
							}
            		        contentPanel.add(GetLogPanel());
            		        filterPanel.removeAll();
							filterPanel.add(GetLogFilter()) ;
							filterPanel.setVisible(true);
							filterPanel.expand();
							filterPanel.setTitle('Фильтр');
							last_d="";
							store_dev.load({ params: { U: userid} });
            		        store_log.load({ params: { U: userid, D:"" } });

            		    }


            		});

	
	
	
	menuPanel.setVisible(true);
	filterPanel.removeAll();
	filterPanel.setVisible(false);
    


}


Ext.application(
 {
     name: 'MyApp',

     launch: function () {
         var vPort = new Ext.container.Viewport(

	    {
	        renderTo: Ext.getBody(),
	        layout: 'border',
	        items: [
			menuPanel,
            filterPanel,
			contentPanel
		]

	    }
		);

		menuPanel.setVisible(false);
	    filterPanel.removeAll();
	    filterPanel.add(GetLogin());
	    filterPanel.setVisible(true);
	    filterPanel.expand();
        

     }
 }
);