
function getAllUsers() {
    $('#allUsersDiv').empty();
    $.ajax({
        type: "GET",
        url: "admin/getAllUsers",
        success: function (data)
        {
            if (data.length > 0) {
                $('#userTable').remove();
                $("#allUsersDiv").empty();
                $("#allUsersDiv").append("<br><center><h4>All Users</h4></center>");
                var tbl = $("<table/>").attr({"id": "userTable", "class": "table table-striped"});
                $("#allUsersDiv").append(tbl);
                var th = "<thead><tr><th>Name</th><th>Email</th><th>Mobile</th><th>Role</th></tr></thead>";
                $("#userTable").append(th);
                for (var i = 0; i < data.length; i++)
                {
                    var tr = "<tr>";
                    var td1 = "<td>" + data[i]["userName"] + "</td>";
                    var td2 = "<td>" + data[i]["userEmail"] + "</td>";
                    var td3 = "<td>" + data[i]["userMobile"] + "</td>";
                    var td4 = "<td>" + data[i]["userRole"] + "</td></tr>";
                    $("#userTable").append(tr + td1 + td2 + td3 + td4);
                }
            } else {
                $("#userTable").empty();
                $("#userTable").append("No record found.");
            }
        }
    });
}

function getUserByMobile() {
    $('#allUsersDiv').empty();
    $.ajax({
        type: "GET",
        url: "admin/getUserByMobile/" + $('#mobileNumber').val(),
        success: function (data)
        {
            if (data) {
                $('#userTable').remove();
                $("#allUsersDiv").empty();
                $("#allUsersDiv").append("<br><center><h4>Searched User</h4></center>");
                var tbl = $("<table/>").attr({"id": "userTable", "class": "table table-striped"});
                $("#allUsersDiv").append(tbl);
                var th = "<thead><tr><th>Name</th><th>Email</th><th>Mobile</th><th>Role</th></tr></thead>";
                $("#userTable").append(th);
                var tr = "<tr>";
                var td1 = "<td>" + data.userName + "</td>";
                var td2 = "<td>" + data.userEmail + "</td>";
                var td3 = "<td>" + data.userMobile + "</td>";
                var td4 = "<td>" + data.userRole + "</td></tr>";
                $("#userTable").append(tr + td1 + td2 + td3 + td4);
            } else {
                $("#userTable").empty();
                $("#userTable").append("No record found.");
            }
        }
    });
}

$(document).ready(function () {
    $('#bg').fadeIn('slow');
});