Hawaii Datatables
=================

The purpose of this website is to make Hawaii data more accessible and searchable.

Currently, Hawaii data is distributed amongst many fiefdoms including, but not
limited to, the various governmental agencies, the local universities,
the City and County of Honolulu, and the State of Hawaii.

Code for Hawaii is trying to aggregate all these data repositories into this
[Google spreadsheet](https://docs.google.com/spreadsheets/d/1y_O2ayurKd4WZonv0RjAeuTsmVL6AzFv2Ex-988ikiQ/pubhtml).
You can think of this as a one-stop shop for all your data needs.

We're using [DataTables](https://github.com/DataTables/DataTables) to visualize
the spreadsheet data and [TableTop](https://github.com/jsoma/tabletop) to
feed the data into the website from the spreadsheet.


Getting Started
===============

To get started with this project, the only thing you'll need is a tool/webserver that can serve
files over http. I typically use python since it's installed by default in
most disitributions and with a short one-liner, you can serve static files.

Cut and paste the following python snippet into your terminal:

```shell
python -c $'import SimpleHTTPServer;\nSimpleHTTPServer.SimpleHTTPRequestHandler.extensions_map[""] = "text/plain";\nSimpleHTTPServer.test();' "50001"
```

Open your browser pointed @ [http://localhost:50001/index.html](http://localhost:50001/index.html)


Contributing
============


Licensing
=========
This software is licensed under the MIT License. See [LICENSE](https://github.com/codeforhawaii/hawaii-datatables/blob/master/LICENSE) for the full license text.
