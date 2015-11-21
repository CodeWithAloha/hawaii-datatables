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


function writeTableWith(data, tabletop) {

    var columns,
        concatenated_data,
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

    // Get all the data
    var all_data =
      (tabletop.simpleSheet) ?
        tabletop.data() :
        _.reduce(tabletop.sheets(), function(memo, num){ return memo.concat(num.all()); }, []);

    // Autolink / timestamps
    // TODO: To be generic, this should be passed in from the caller
    all_data = _.map(all_data, function(v) {
      return _.mapValues(v, function(v,k,o) {
        return (k == "last_updated" && v) ? convertTimestamp(v) : v.autoLink();
    })});

    jqueryNoConflict("#data-container").replaceWith(table);

    table.DataTable({
        "iDisplayLength": 25,
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

// https://gist.github.com/kmaida/6045266
function convertTimestamp(timestamp) {
  var d = new Date(timestamp * 1000),	// Convert the passed timestamp to milliseconds
		yyyy = d.getFullYear(),
		mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
		dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
		hh = d.getHours(),
		h = hh,
		min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
		ampm = 'AM',
		time;

	if (hh > 12) {
		h = hh - 12;
		ampm = 'PM';
	} else if (hh === 12) {
		h = 12;
		ampm = 'PM';
	} else if (hh == 0) {
		h = 12;
	}

	// ie: 2013-02-18, 8:35 AM
	return yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
}
