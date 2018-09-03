webcam.set_hook('onComplete', 'my_completion_handler');

function mobileNoValidate() {
    var mobileDom = document.getElementById('mobileno');
    if (mobileDom) {
        var x = mobileDom.value;
        var re10digit = /^\d{10}$/;
        if (x.search(re10digit) == -1) {
            alert("Invalid Mobile No");
            return true;
        };
    };
    return true;
}

function emailValidate() {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var emailDom = document.getElementById('email');
    if (emailDom) {
        if (emailDom.value.search(emailPattern) == -1) {
            alert('Invalid Email Id');
            return true;
        };
    };
    return true;
}

function take_snapshot() {
    if (!mobileNoValidate()) {
        return false;
    };
    if (!emailValidate()) {
        return false;
    };
    var formUI = document.getElementById('ui');
    if (formUI) {
        var url = 'main.php?dt=' + (new Date()).getTime();
        if (formUI.uname && formUI.uname.value) {
            url += '&un=' + escape(formUI.uname.value);
        };

        if (formUI.meet && formUI.meet.value) {
            url += '&mt=' + escape(formUI.meet.value);
        };

        if (formUI.from && formUI.from.value) {
            url += '&cpname=' + escape(formUI.from.value);
        };

        if (formUI.representinglist && formUI.representinglist.value) {
            url += '&ra=' + escape(formUI.representinglist.value);
        };

        if (formUI.mobileno && formUI.mobileno.value) {
            url += '&mn=' + escape(formUI.mobileno.value);
        };

        if (formUI.email && formUI.email.value) {
            url += '&em=' + escape(formUI.email.value);
        };
        webcam.set_api_url(url);
    };
    webcam.snap();
}

clearLogin = function () {
    var domLogin = document.getElementById('ui');
    if (domLogin) {
        domLogin.reset();
    }
}

function GetString(Str, startTagName, endTagName) {
    return Str.substring((Str.indexOf(startTagName) + startTagName.length), Str.indexOf(endTagName));
}


    function my_completion_handler(msg) {
    // extract URL out of PHP output
    //var output = msg;
    var image_url = GetString(msg, '<urlsrc>', '</urlsrc>');
    var usrid = GetString(msg, '<id>', '</id>');
    var fname = GetString(msg, '<fname>', '</fname>');
    var tomeet = GetString(msg, '<tomeet>', '</tomeet>');
    var comingfrom = GetString(msg, '<comingfrom>', '</comingfrom>');
    var mobile = GetString(msg, '<mobile>', '</mobile>');
    var email = GetString(msg, '<email>', '</email>');
    var checkin = GetString(msg, '<checkin>', '</checkin>');
    var status = GetString(msg, '<status>', '</status>');

    webcam.reset();

    clearLogin();

    myWindow = window.open('', '', 'width=500,height=300');

    var divUpd = document.createElement('div');
    divUpd.id = 'upload_results';
    if (myWindow.document.body != null) { myWindow.document.body.appendChild(divUpd); }

    myWindow.document.body.innerHTML =
                    "<table width='200px' style='border-width: 1px 1px 1px 1px;border-spacing: 0;border-collapse: collapse;" +
                    "border-style: ridge;border-color: black;font-family: Verdana;font-size: 8pt;clear: both;margin: 0;padding: 0;'>" +
                    "<tr style='height: 20px;'>" +
                    "<td align='center' valign='middle' style='font-weight: bold;font-size: 12px;color: black;background-color:" +
                    "#D7D8D2;width: 300px;height:30px;font-size:15pt;font-family: Verdana;font-weight:bold;background-color: #000000;color:#ffffff;'>" +
                    "VISITOR PASS</td></tr>" +
                    "<tr><td align='center'><br /><img width='120' height='120' src='" + image_url + "'/><br /><br />" +
                    "<table border='0' style='font-size: 8pt;font-family: Verdana;' " +
                    "width='200px' bgcolor='#ffffff' >" +
                    "<tr style='height: 20px;'>" +
                    "<td align='right' style='width: 70px;font-weight:bold;'>ID &nbsp;&nbsp;</td>" +
                    "<td style='width: 140px;font-weight:bold;'>" + usrid + "</td></tr>" +
                    "<tr style='height: 20px;'>" +
                    "<td align='right' style='width: 70px;font-weight:bold;'>Name :&nbsp;&nbsp;</td>" +
                    "<td style='width: 140px;font-weight:bold;'>" + fname + "</td></tr>" +
                    "<tr style='height: 20px;'>" +
                    "<td align='right' style='width: 70px;'>To Meet :&nbsp;&nbsp;</td>" +
                    "<td style='width: 140px;'>" + tomeet + "</td></tr>" +
                    "<tr style='height: 20px;'>" +
                    "<td align='right' style='width: 70px;'>Type:&nbsp;&nbsp;</td>" +
                    "<td style='width: 140px;'>" + comingfrom + "</td></tr>" +
                    "<tr style='height: 20px;'>" +
                    "<td align='right' style='width: 70px;'>CheckIn:&nbsp;&nbsp;</td>" +
                    "<td style='width: 140px;'>" + checkin + "</td></tr></table></td></tr>" +
                    "</table>";
    myWindow.focus();
    printContent = function () {
        myWindow.focus();
        myWindow.print();
        closeCurWindow = function () {
            myWindow.close();
        };
        window.setTimeout(closeCurWindow, 3000);
    };
    window.setTimeout(printContent, 3000);
};

clearSignoutPage = function () {
    var logoutDom = document.getElementById('logout');
    if (logoutDom) {
        logoutDom.reset();
    };
};

succSignout = function (o) {
    var outputDom = document.getElementById('output');
    if (outputDom) {
        if (o.responseText == 'error') {
            outputDom.innerHTML = 'Invalid Visitor Id';
        } else if (o.responseText == 'Invalid') {
            outputDom.innerHTML = 'Invalid Visitor Id';
        } else {
            outputDom.innerHTML = 'Visitor Id ' + o.responseText + ' succefully logged out';
        }
    };
};

failSignout = function (o) {
};

var SignOutCallback = {
    success: succSignout,
    failure: failSignout
};

Signout = function () {
    var sUrl = "signout.php?mk=" + (new Date()).getTime();
    var domVid = document.getElementById('vid');
    if (domVid) {
        sUrl += '&vid=' + domVid.value;
    };
    var request = YAHOO.util.Connect.asyncRequest('GET', sUrl, SignOutCallback);
}