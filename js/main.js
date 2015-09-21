var jqueryNoConflict = jQuery;

// begin main function
jqueryNoConflict(document).ready(function(){
    //var url = ["https://docs.google.com/spreadsheets/d", key, "pubhtml"].join("/");
    var key = "1y_O2ayurKd4WZonv0RjAeuTsmVL6AzFv2Ex-988ikiQ";
    initializeTabletopObject(key);
});

// pull data from google spreadsheet
function initializeTabletopObject(dataSpreadsheet){
    Tabletop.init({
        key: dataSpreadsheet,
        callback: writeTableWith,
        simpleSheet: false,
        debug: false
    });
}


function writeTableWith(dataSource) {
    var columns,
        table;

    // create table headers
    columns = [
        {'mDataProp': 'id', 'sTitle': 'Url', 'sClass': 'center'},
        {'mDataProp': 'name', 'sTitle': 'Name', 'sClass': 'center'},
        {'mDataProp': 'description', 'sTitle': 'Description', 'sClass': 'center'},
        {'mDataProp': 'license', 'sTitle': 'License', 'sClass': 'center'},
        {'mDataProp': 'category', 'sTitle': 'Category', 'sClass': 'center'},
        {'mDataProp': 'tags', 'sTitle': 'Tags', 'sClass': 'center'},
        {'mDataProp': 'author', 'sTitle': 'Author', 'sClass': 'center'},
        {'mDataProp': 'organization', 'sTitle': 'Organization', 'sClass': 'center'},
        {'mDataProp': 'department', 'sTitle': 'Department', 'sClass': 'center'},
        {'mDataProp': 'division', 'sTitle': 'Division', 'sClass': 'center'},
        {'mDataProp': 'attribution', 'sTitle': 'Attribution', 'sClass': 'center'},
        {'mDataProp': 'last_updated', 'sTitle': 'Last Updated', 'sClass': 'center'}
    ];

    table = jqueryNoConflict("<table/></table>");
    table.attr({
        id: 'data-table-container',
        cellpadding: 0,
        cellspacing: 0,
        border: 0,
        class: "display table table-bordered table-striped"
    });

    concatenated_data = dataSource["manual"].elements.concat(
            dataSource["top-100-data.honolulu.gov"].elements,
            dataSource["top-100-data.hawaii.gov"].elements
        );

    // Autolink URLs
    // dataSource = _.map(dataSource, function(v) { return _.mapValues(v, function(v) { return v.autoLink(); }); });

    jqueryNoConflict("#data-container").replaceWith(table);

    table.DataTable({
        "iDisplayLength": 25,
        "aaData": concatenated_data,
        "aoColumns": columns,
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
