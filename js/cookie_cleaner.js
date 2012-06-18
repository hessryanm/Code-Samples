// Cookie Cleaner js functions
/* contents 

temp_cookie_cleaner
see_ip
dateFormat
*/


//takes an ip address and adds it to the appropriate table
//gets the ip address and ignore type from inputs with ids.
//if ignore is true ie: ignore == 1 then it adds ip to the ignore_ips table
//if ignore == 0 adds ip to ignore_usage_ips 
//then removes the ip from the list
function temp_cookie_cleaner(){
	$("#ignore_submit_button").html("<img src='assets/loading.gif' alt='Working' style='height:20px;width:20px;'/>");
	//get ip from box on top
	var ip = $("#ip").val();
	//get ignore type from hidden input on popover
	var ignore = $("#ignore_type").val();
	//get notes from box on popover
	var notes = $("#ignore_notes").val();
	
	$.ajax({
		url: "ajax/cookie_cleaner.php",
		type: "POST",
		data: {ip: ip, ignore: ignore, notes: notes},
		success:function(responseText){
			if (responseText == "success"){
				//close popover
				$("#lightbox").removeClass("active");
				$(".lightbox_box").removeClass("active");
				$("#lightbox").slideUp();
				$(".lightbox_box").slideUp();
				$("#ignore_submit_button").html("<input type='button' value='Submit' onclick='temp_cookie_cleaner()' />");

				//remove div from list
				$(".ips").children().remove('[id="'+ip+'"]');
				
				//going to reset alt rows so they still alternate
				//remove alt class from all rows
				$(".alt").removeClass("alt");
				//loop through each of the children of the .ips div (ie all the ips)
				//add the alt class to every other one
				var alt = 0;
				$(".ips").children().each(function(){
					if (alt){
						$(this).addClass("alt");
						alt--;
					} else{
						alt++;
					}
				});
				
				var obj = $(".ips").children(":first");
				see_ip(obj);
			} else{
				$("#ignore_submit_button").html("<input type='button' value='Submit' onclick='temp_cookie_cleaner()' />");
				alert("There was an error inserting the ip:\n"+responseText);
			}
		}
	});
}

// takes an ip address, adds it to the ip textbox and reloads the iframe with 
// the new ip in the source
function see_ip(obj){
	//get the ip we're working with
	var ip = $(obj).html();
	//set the box on top to have the ip
	$("#ip").val(ip);
	//refresh iframe with ip
	$("#domaintz").attr("src", "http://domaintz.com/tools/overview/"+ip);
	
	//get other info about ip, set in boxed in toolbar
	var count = ips[ip].count;
	if (count == undefined) $("#count").val("");
	else $("#count").val(count);
	
	var firsttime = ips[ip].firstdate;
	if (firsttime == undefined) $("#first").val("");
	else{
		var firstdate =  new Date(firsttime * 1000);
		$("#first").val(dateFormat(firstdate, "mediumDate"));
	}
	
	var lasttime = ips[ip].lastdate;
	if (lasttime == undefined) $("#last").val("");
	else{
		var lastdate =  new Date(lasttime * 1000);
		$("#last").val(dateFormat(lastdate, "mediumDate"));
	}
	
	var hasothers = ips[ip].hasothers;
	var count_hr;
	
	//calculate count per hr
	if (lasttime == undefined || firsttime == undefined) count_hr = "N/A";
	else{
		var time_passed = lasttime - firsttime;
		if (time_passed == 0){
			count_hr = "N/A";
		} else{
			count_hr = (count / (time_passed / 3600));
			count_hr = count_hr.toPrecision(3);
		}
	}
	
	$("#count_hr").val(count_hr);
	
	if (hasothers && hasothers != undefined){
		$("#has_others").attr("checked", true);
	} else{
		$("#has_others").attr("checked", false);
	}
}

//jquery command to bring up lightbox when the buttons are clicked
$(".ignore_button").click(function () {
	//get the ip from the box
	var ip = $("#ip").val();
	//if there is no ip do nothing
	if (ip == "" || ip == null || ip == undefined) return;
	
	//figure out which div to show for the lightbox
	var content_show = $(this).attr("title"); 
	//get which button they clicked on
	var ignore_type = $(this).attr("name");
	var type_text;
	//get the type
	if (ignore_type == 0) type_text = "Usage for IP";
	else type_text = "IP";

	//set stuff in lightbox popover
	$("#ignore_type").val(ignore_type); 
	$("#ignore_title_type").html(type_text);
	$("#ignore_title_ip").html(ip);
	//empty notes box
	$("#ignore_notes").val("");

	//activate lightbox
	$("#lightbox").addClass("active");
	//display lightbox popover
	$("#lightbox").slideDown(); 
    $("."+content_show).slideDown(); 
});

/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 *
 * Documentation at http://blog.stevenlevithan.com/archives/date-time-format
 */

var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};