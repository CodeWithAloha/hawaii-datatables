// begin main function
$(document).ready(function(){
    //var url = ["https://docs.google.com/spreadsheets/d", key, "pubhtml"].join("/");
    var key = "1ugRl6rdtIQMODwvTJXMnoXT4pd8vt4qewvWQ8kxdNtk";
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


function writeTableWith(data, tabletop) {

    var columns,
        concatenated_data,
        table;

    // create table headers
    columns = [
        {'mDataProp': 'name', 'sTitle': 'Name', 'sClass': 'center'},
        {'mDataProp': 'description', 'sTitle': 'Description', 'sClass': 'center'},
    ];

    table = $("<table/></table>");
    table.attr({
        id: 'data-table-container',
        cellpadding: 0,
        cellspacing: 0,
        border: 0,
        class: "display table table-bordered table-striped"
    });

    // Get all the data
    var all_data =
      (tabletop.simpleSheet) ?
        tabletop.data() :
        _.reduce(tabletop.sheets(), function(memo, num){ 
        	return memo.concat(num.all()); 
        }, []);

    all_data = _.map(all_data, function(v) {
        var linkedName = '<a href="'+v.url+'">'+v.name+'</a>';
        return { name: linkedName, description: v.description };
    });

    $("#data-container").replaceWith(table);

    table.DataTable({
        "paging": false,
        "aaData": all_data,
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
