var Porlet = new mPortlet("m_portlet_tools_1");
var UserListTable = {
    dataTable: {},
    init: function (method, url, headers) {
        var i;
        dataTable = $(".m_datatable").mDatatable({
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: url,
                        method: method,
                        headers: headers,
                        map: function (raw) {
                            var dataSet = raw;
                            if (typeof raw.data !== 'undefined') {
                                dataSet = raw.data;
                            }
                            return dataSet;
                        },
                    }
                },
                pageSize: 10,
                saveState: {
                    cookie: true,
                    webstorage: true
                },

                serverPaging: false,
                serverFiltering: false,
                serverSorting: false,
                autoColumns: false
            },
            layout: {
                theme: "default",
                class: "",
                scroll: false,
                footer: false
            },
            sortable: true,
            pagination: true,
            // search: {
            //     input: $("#generalSearch")
            // },
            columns: [{
                field: "name",
                title: "Name",
                width: 120
            }, {
                field: "age",
                title: "Age",
                width: 80
            }, {
                field: "address",
                title: "Address",
            }, {
                field: "Actions",
                width: 60,
                title: "Actions",
                sortable: false,
                overflow: "visible",
                template: function (e) {
                    return '<a data-id=' + e.id + ' class="btn-edit m-portlet__nav-link btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="Chỉnh Sửa"><i class="la la-edit"></i></a>'
                }
            }]
        });
    },
    destroy: function () {
        dataTable.destroy();
    },
    reload: function () {
        dataTable.reload();
    },
    getDataRow: function (id) {
        return dataTable.getDataSet().find(row => {
            return row.id == id;
        });
    },
    searchName: function (value) {
        dataTable.search(value, "name");
    },
    getComponentUI: function () {
        return $(".m_datatable");
    }
};