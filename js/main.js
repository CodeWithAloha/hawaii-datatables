var jqueryNoConflict = jQuery;

// begin main function
jqueryNoConflict(document).ready(function(){
    var url = "https://docs.google.com/spreadsheets/d/1y_O2ayurKd4WZonv0RjAeuTsmVL6AzFv2Ex-988ikiQ/pubhtml";
    initializeTabletopObject(url);
});

// pull data from google spreadsheet
function initializeTabletopObject(dataSpreadsheet){
    Tabletop.init({
        key: dataSpreadsheet,
        callback: writeTableWith,
        simpleSheet: true,
        debug: false
    });
}

// create table headers
function createTableColumns(){
    var tableColumns = [
      { "mDataProp": "id", "sTitle": "Id", "sClass": "center" },
    ];
    return tableColumns;
}

function writeTableWith(dataSource) {

    console.log(dataSource);

    jqueryNoConflict("#data-container").html("<table cellpadding='0' cellspacing='0' border='0' class='display table table-bordered table-striped' id='data-table-container'></table>");

    var oTable = jqueryNoConflict("#data-table-container").dataTable({
        "iDisplayLength": 25,
        "aaData": dataSource,
        "aoColumns": createTableColumns(),
        "fnRowCallback": function(nRow, aData, iDisplayIndex) {
            $("td:eq(2)", nRow).html("<a href='http://" + aData.website + "'>Website</a>");
            return nRow;
        },
        "oLanguage": {
            "sLengthMenu": "_MENU_ records per page"
        }
    });
};

jQuery.fn.dataTableExt.oSort["string-case-asc"]  = function(x,y) {
	return ((x < y) ? -1 : ((x > y) ?  0 : 0));
};

jQuery.fn.dataTableExt.oSort["string-case-desc"] = function(x,y) {
	return ((x < y) ?  1 : ((x > y) ? -1 : 0));
};

