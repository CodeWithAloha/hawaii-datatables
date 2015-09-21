var jqueryNoConflict = jQuery;

// begin main function
jqueryNoConflict(document).ready(function(){
    //var url = ["https://docs.google.com/spreadsheets/d", key, "pubhtml"].join("/");
    var key = "1UiIyfnvzRDTxt_0V7x6LXXw8_SyhRNcevx3eLCGVKIU";
    initializeTabletopObject(key);
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


function writeTableWith(dataSource) {
    var columns,
        table;

    console.log(JSON.stringify(dataSource));

    // create table headers
    columns = _
        .chain(dataSource)
        .reduce(_.merge)
        .map(function(v,k) { return { mDataProp: k, sTitle: k }; })
        .value();

    table = jqueryNoConflict("<table/></table>");
    table.attr({
        id: 'data-table-container',
        cellpadding: 0,
        cellspacing: 0,
        border: 0,
        class: "display table table-bordered table-striped"
    });

    // Autolink URLs
    dataSource = _.map(dataSource, function(v) { return _.mapValues(v, function(v) { return v.autoLink(); }); });

    jqueryNoConflict("#data-container").replaceWith(table);

    table.DataTable({
        "iDisplayLength": 25,
        "aaData": dataSource,
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
