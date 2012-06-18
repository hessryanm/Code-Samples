// JavaScript Document

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


   $(".nav-button").click(function () {  
   		var content_show = $(this).attr("title"); 
  

        // switch all tabs off  
        $(".active").removeClass("active");  

        // switch this tab on  
          $(this).addClass("active"); 

        if($("#reser_header").hasClass("showheader")){
  			if (content_show != "reser" && content_show != "reser_all" && content_show != "reser_confirmed" && content_show != "reser_dead" && content_show != "reser_cancelled"){
  				$("#reser_header").removeClass("showheader");
  				$("#reser_header").fadeOut(100);
  			}
  		}

        // slide all elements with the class 'page' up  
        $(".page").fadeOut(100);  

        if (content_show == "reser" || content_show == "reser_all" || content_show == "reser_confirmed" || content_show == "reser_dead" || content_show == "reser_cancelled"){
  			if(!$("#reser_header").hasClass("showheader")){
  				$("#reser_header").addClass("showheader"); 
  				$("#reser_header").fadeIn(1000); 
  			}
  		}
  
        // Now figure out what the 'title' attribute value is and find the element with that id.  Then slide that down.
		
		
		//---------------------------RESERVATION DATATABLES JS---------------------------//  
        $("#"+content_show).fadeIn(1000); 
		if ("#"+content_show+"_show" == "#reser_show") { 
		document.getElementById('all').style.height='19px';
		document.getElementById('all').style.backgroundColor='#CCCCCC';
		document.getElementById('confirmed').style.height='19px';
		document.getElementById('confirmed').style.backgroundColor='#CCCCCC';
		document.getElementById('dead').style.height='19px';
		document.getElementById('dead').style.backgroundColor='#CCCCCC';
		document.getElementById('cancelled').style.height='19px';
		document.getElementById('cancelled').style.backgroundColor='#CCCCCC';
		document.getElementById('pending').style.height='20px';
		document.getElementById('pending').style.backgroundColor='#FFFFFF';
 		$("#"+content_show+"_show").dataTable( {
			  "bProcessing": true,
			  "bServerSide": true,
			  "bInfo": true,
			  "bDestroy": true,
			  "sPaginationType": "two_button",
			  "bAutoWidth": false,
			  "bPaginate": true,
			  "iDisplayLength": 25,
			  "aaSorting": [[ 7, "desc" ]],
			  
			  "sAjaxSource": "php/processing_reservations_pending.php",
			  "aoColumnDefs": [ 
			  	{
					  "fnRender": function ( oObj ) {
						  return '<a class="reserv_link" href="?reserv_spec='+oObj.aData[0]+'" style="color:#3f7398" >'+ oObj.aData[0] +'</a>';
						  
					  },
					  "aTargets": [ 0 ]
				  },
				  {
					  "fnRender": function ( oObj ) {
						  var utcSeconds = oObj.aData[3];
			  
						  var d = new Date(0); 
						  d.setUTCSeconds(utcSeconds);
						  return d.toDateString();
					  },
					  "aTargets": [ 3 ]
				  },
				  {
					  "fnRender": function ( oObj ) {
						  var utcSeconds = oObj.aData[4];
			  
						  var d = new Date(0); 
						  d.setUTCSeconds(utcSeconds);
						  return d.toDateString();
					  },
					  "aTargets": [ 4 ]
				  },
				   {
					  "fnRender": function ( oObj ) {
						  return '<a class="avail_link" href="?avail_spec='+oObj.aData[6]+'" style="color:#3f7398" >'+ oObj.aData[6] +'</a>';
						  
					  },
					  "aTargets": [ 6 ]
				  },
				  {
					  "fnRender": function ( oObj ) {
						  var utcSeconds = oObj.aData[7];
			  
						  var d = new Date(0); 
						  d.setUTCSeconds(utcSeconds);
						  return d.toDateString();
					  },
					  "aTargets": [ 7 ]
				  }
			  ]
		  } ); }
else if ("#"+content_show+"_show" == "#reser_all_show") {
		document.getElementById('all').style.height='20px';
		document.getElementById('all').style.backgroundColor='#FFFFFF';
		document.getElementById('confirmed').style.height='19px';
		document.getElementById('confirmed').style.backgroundColor='#CCCCCC';
		document.getElementById('dead').style.height='19px';
		document.getElementById('dead').style.backgroundColor='#CCCCCC';
		document.getElementById('cancelled').style.height='19px';
		document.getElementById('cancelled').style.backgroundColor='#CCCCCC';
		document.getElementById('pending').style.height='19px';
		document.getElementById('pending').style.backgroundColor='#CCCCCC';
 		$("#"+content_show+"_show").dataTable( {
			  "bProcessing": true,
			  "bServerSide": true,
			  "bInfo": true,
			  "bDestroy": true,
			  "sPaginationType": "two_button",
			  "bAutoWidth": false,
			  "bPaginate": true,
			  "iDisplayLength": 10,
			  "aaSorting": [[ 7, "desc" ]],
			  
			  "sAjaxSource": "php/processing_reservations.php",
			  "aoColumnDefs": [ 
			  	{
					  "fnRender": function ( oObj ) {
						  return '<a class="reserv_link" href="?reserv_spec='+oObj.aData[0]+'" style="color:#3f7398" >'+ oObj.aData[0] +'</a>';
						  
					  },
					  "aTargets": [ 0 ]
				  },
				  {
					  "fnRender": function ( oObj ) {
						  var utcSeconds = oObj.aData[3];
			  
						  var d = new Date(0); 
						  d.setUTCSeconds(utcSeconds);
						  return d.toDateString();
					  },
					  "aTargets": [ 3 ]
				  },
				  {
					  "fnRender": function ( oObj ) {
						  var utcSeconds = oObj.aData[4];
			  
						  var d = new Date(0); 
						  d.setUTCSeconds(utcSeconds);
						  return d.toDateString();
					  },
					  "aTargets": [ 4 ]
				  },
				   {
					  "fnRender": function ( oObj ) {
						  return '<a class="avail_link" href="?avail_spec='+oObj.aData[6]+'" style="color:#3f7398" >'+ oObj.aData[6] +'</a>';
						  
					  },
					  "aTargets": [ 6 ]
				  },
				  {
					  "fnRender": function ( oObj ) {
						  var utcSeconds = oObj.aData[7];
			  
						  var d = new Date(0); 
						  d.setUTCSeconds(utcSeconds);
						  return d.toDateString();
					  },
					  "aTargets": [ 7 ]
				  }
			  ]
		  } ); } 
else if ("#"+content_show+"_show" == "#reser_confirmed_show") { 
		document.getElementById('all').style.height='19px';
		document.getElementById('all').style.backgroundColor='#CCCCCC';
		document.getElementById('confirmed').style.height='20px';
		document.getElementById('confirmed').style.backgroundColor='#FFFFFF';
		document.getElementById('dead').style.height='19px';
		document.getElementById('dead').style.backgroundColor='#CCCCCC';
		document.getElementById('cancelled').style.height='19px';
		document.getElementById('cancelled').style.backgroundColor='#CCCCCC';
		document.getElementById('pending').style.height='19px';
		document.getElementById('pending').style.backgroundColor='#CCCCCC';
 		$("#"+content_show+"_show").dataTable( {
			  "bProcessing": true,
			  "bServerSide": true,
			  "bInfo": true,
			  "bDestroy": true,
			  "sPaginationType": "two_button",
			  "bAutoWidth": false,
			  "bPaginate": true,
			  "iDisplayLength": 10,
			  "aaSorting": [[ 7, "desc" ]],
			  
			  "sAjaxSource": "php/processing_reservations_confirmed.php",
			  "aoColumnDefs": [ 
			  	{
					  "fnRender": function ( oObj ) {
						  return '<a class="reserv_link" href="?reserv_spec='+oObj.aData[0]+'" style="color:#3f7398" >'+ oObj.aData[0] +'</a>';
						  
					  },
					  "aTargets": [ 0 ]
				  },
				  {
					  "fnRender": function ( oObj ) {
						  var utcSeconds = oObj.aData[3];
			  
						  var d = new Date(0); 
						  d.setUTCSeconds(utcSeconds);
						  return d.toDateString();
					  },
					  "aTargets": [ 3 ]
				  },
				  {
					  "fnRender": function ( oObj ) {
						  var utcSeconds = oObj.aData[4];
			  
						  var d = new Date(0); 
						  d.setUTCSeconds(utcSeconds);
						  return d.toDateString();
					  },
					  "aTargets": [ 4 ]
				  },
				   {
					  "fnRender": function ( oObj ) {
						  return '<a class="avail_link" href="?avail_spec='+oObj.aData[6]+'" style="color:#3f7398" >'+ oObj.aData[6] +'</a>';
						  
					  },
					  "aTargets": [ 6 ]
				  },
				  {
					  "fnRender": function ( oObj ) {
						  var utcSeconds = oObj.aData[7];
			  
						  var d = new Date(0); 
						  d.setUTCSeconds(utcSeconds);
						  return d.toDateString();
					  },
					  "aTargets": [ 7 ]
				  }
			  ]
		  } ); }
else if ("#"+content_show+"_show" == "#reser_dead_show") { 
		document.getElementById('all').style.height='19px';
		document.getElementById('all').style.backgroundColor='#CCCCCC';
		document.getElementById('confirmed').style.height='19px';
		document.getElementById('confirmed').style.backgroundColor='#CCCCCC';
		document.getElementById('dead').style.height='20px';
		document.getElementById('dead').style.backgroundColor='#FFFFFF';
		document.getElementById('cancelled').style.height='19px';
		document.getElementById('cancelled').style.backgroundColor='#CCCCCC';
		document.getElementById('pending').style.height='19px';
		document.getElementById('pending').style.backgroundColor='#CCCCCC';
 		$("#"+content_show+"_show").dataTable( {
			  "bProcessing": true,
			  "bServerSide": true,
			  "bInfo": true,
			  "bDestroy": true,
			  "sPaginationType": "two_button",
			  "bAutoWidth": false,
			  "bPaginate": true,
			  "iDisplayLength": 10,
			  "aaSorting": [[ 7, "desc" ]],
			  
			  "sAjaxSource": "php/processing_reservations_dead.php",
			  "aoColumnDefs": [ 
			  	{
					  "fnRender": function ( oObj ) {
						  return '<a class="reserv_link" href="?reserv_spec='+oObj.aData[0]+'" style="color:#3f7398" >'+ oObj.aData[0] +'</a>';
						  
					  },
					  "aTargets": [ 0 ]
				  },
				  {
					  "fnRender": function ( oObj ) {
						  var utcSeconds = oObj.aData[3];
			  
						  var d = new Date(0); 
						  d.setUTCSeconds(utcSeconds);
						  return d.toDateString();
					  },
					  "aTargets": [ 3 ]
				  },
				  {
					  "fnRender": function ( oObj ) {
						  var utcSeconds = oObj.aData[4];
			  
						  var d = new Date(0); 
						  d.setUTCSeconds(utcSeconds);
						  return d.toDateString();
					  },
					  "aTargets": [ 4 ]
				  },
				   {
					  "fnRender": function ( oObj ) {
						  return '<a class="avail_link" href="?avail_spec='+oObj.aData[6]+'" style="color:#3f7398" >'+ oObj.aData[6] +'</a>';
						  
					  },
					  "aTargets": [ 6 ]
				  },
				  {
					  "fnRender": function ( oObj ) {
						  var utcSeconds = oObj.aData[7];
			  
						  var d = new Date(0); 
						  d.setUTCSeconds(utcSeconds);
						  return d.toDateString();
					  },
					  "aTargets": [ 7 ]
				  }
			  ]
		  } ); }
else if ("#"+content_show+"_show" == "#reser_cancelled_show") {
		document.getElementById('all').style.height='19px';
		document.getElementById('all').style.backgroundColor='#CCCCCC';
		document.getElementById('confirmed').style.height='19px';
		document.getElementById('confirmed').style.backgroundColor='#CCCCCC';
		document.getElementById('dead').style.height='19px';
		document.getElementById('dead').style.backgroundColor='#CCCCCC';
		document.getElementById('cancelled').style.height='20px';
		document.getElementById('cancelled').style.backgroundColor='#FFFFFF';
		document.getElementById('pending').style.height='19px';
		document.getElementById('pending').style.backgroundColor='#CCCCCC';
 		$("#"+content_show+"_show").dataTable( {
			  "bProcessing": true,
			  "bServerSide": true,
			  "bInfo": true,
			  "bDestroy": true,
			  "sPaginationType": "two_button",
			  "bAutoWidth": false,
			  "bPaginate": true,
			  "iDisplayLength": 10,
			  "aaSorting": [[ 7, "desc" ]],
			  
			  "sAjaxSource": "php/processing_reservations_cancelled.php",
			  "aoColumnDefs": [ 
			  	{
					  "fnRender": function ( oObj ) {
						  return '<a class="reserv_link" href="?reserv_spec='+oObj.aData[0]+'" style="color:#3f7398" >'+ oObj.aData[0] +'</a>';
						  
					  },
					  "aTargets": [ 0 ]
				  },
				  {
					  "fnRender": function ( oObj ) {
						  var utcSeconds = oObj.aData[3];
			  
						  var d = new Date(0); 
						  d.setUTCSeconds(utcSeconds);
						  return d.toDateString();
					  },
					  "aTargets": [ 3 ]
				  },
				  {
					  "fnRender": function ( oObj ) {
						  var utcSeconds = oObj.aData[4];
			  
						  var d = new Date(0); 
						  d.setUTCSeconds(utcSeconds);
						  return d.toDateString();
					  },
					  "aTargets": [ 4 ]
				  },
				   {
					  "fnRender": function ( oObj ) {
						  return '<a class="avail_link" href="?avail_spec='+oObj.aData[6]+'" style="color:#3f7398" >'+ oObj.aData[6] +'</a>';
						  
					  },
					  "aTargets": [ 6 ]
				  },
				  {
					  "fnRender": function ( oObj ) {
						  var utcSeconds = oObj.aData[7];
			  
						  var d = new Date(0); 
						  d.setUTCSeconds(utcSeconds);
						  return d.toDateString();
					  },
					  "aTargets": [ 7 ]
				  }
			  ]
		  } ); }
else if  ("#"+content_show+"_show" == "#avail_show") {
			  
			  
			//----------------------------AVAILABILITY DATATABLES JS--------------------------  
			
			
			$("#"+content_show+"_show").dataTable( {
			  "bProcessing": true,
			  "bServerSide": true,
			  "bInfo": true,
			  "bDestroy": true,
			  "sPaginationType": "full_numbers",
			  "bAutoWidth": false,
			  "bStateSave": true,
			  "iDisplayLength": 50,
			  "sAjaxSource": "php/processing_availability.php",
			  "aoColumnDefs": [ 
			  	  
				  {
					  "sClass": "my_class",
					  "fnRender": function ( oObj ) {
						  var utcSeconds = oObj.aData[3];
			  
						  var d = new Date(0); 
						  d.setUTCSeconds(utcSeconds);
						  return d.toDateString();
					  },
					  "aTargets": [ 3 ]
				  },
				  {
					  "fnRender": function ( oObj ) {
						  var utcSeconds = oObj.aData[4];
			  
						  var d = new Date(0); 
						  d.setUTCSeconds(utcSeconds);
						  return d.toDateString();
					  },
					  "aTargets": [ 4 ]
				  },
				  {
					  "fnRender": function ( oObj ) {
						  return '<a class="avail_link" href="?avail_spec='+oObj.aData[0]+'" style="color:#fff000" >'+ oObj.aData[0] +'</a>';
						  
					  },
					  "aTargets": [ 0 ]
				  }
				 
			  ]
		  } );
		  
		  $("#notif_show").dataTable( {
			  "bProcessing": true,
			  "bServerSide": true,
			  "bInfo": true,
			  "bDestroy": true,
			  "sPaginationType": "full_numbers",
			  "bAutoWidth": false,
			  "bStateSave": true,
			  "iDisplayLength": 50,
			  "sAjaxSource": "php/processing_notifications.php",
			  "aoColumnDefs": [ 
			  	  
				  {
					  "sClass": "my_class",
					  "fnRender": function ( oObj ) {
						  var utcSeconds = oObj.aData[2];
			  
						  var d = new Date(0); 
						  d.setUTCSeconds(utcSeconds);
						  return d.toDateString();
					  },
					  "aTargets": [ 2 ]
				  },
				  {
					  "fnRender": function ( oObj ) {
						  var utcSeconds = oObj.aData[3];
			  
						  var d = new Date(0); 
						  d.setUTCSeconds(utcSeconds);
						  return d.toDateString();
					  },
					  "aTargets": [ 3 ]
				  },
				  {
					  "fnRender": function ( oObj ) {
						  return '<a class="avail_link" onclick="addSearch(\''+oObj.aData[0]+'\')" style="color:#fff000" >'+ oObj.aData[0] +'</a>';
						  
					  },
					  "aTargets": [ 0 ]
				  }
				 
			  ]
		  } );
		    
			  
		  } else if  ("#"+content_show+"_show" == "#peep_show") {
			  
			$("#"+content_show+"_show").dataTable( {
			  "bProcessing": true,
			  "bServerSide": false,
			  "bInfo": true,
			  "bDestroy": true,
			  "sPaginationType": "two_button",
			  "bAutoWidth": false,
			  "bPaginate": true,
			  "sAjaxSource": "php/processing_people.php",
			  "aoColumnDefs": [ 
			  	  
				  {
					  "fnRender": function ( oObj ) {
						  return '<a class="owner_link" href="?owner_spec='+oObj.aData[1]+'" style="color:#fff000" >'+ oObj.aData[0] +'</a>';
						  
					  },
					  "aTargets": [ 0 ]
				  }
				 
			  ]
		  } );
		    		  
		  }
    });
	
    $(".avail_link").click(function () {  
  
        // switch all tabs off  
        $(".active").removeClass("active");  
  
        // switch this tab on  
          $("#specific_avail").addClass("active"); 
	});
	
	$(".reserv_link").click(function () {  
  
        // switch all tabs off  
        $(".active").removeClass("active");  
  
        // switch this tab on  
          $("#specific_reserv").addClass("active"); 
	});
	
	$(".owner_link").click(function () {  
  
        // switch all tabs off  
        $(".active").removeClass("active");  
  
        // switch this tab on  
          $("#specific_owner").addClass("active"); 
	});
	
function showRoomtype(str)
{
if (str=="")
  {
  document.getElementById("unittype").innerHTML="";
  return;
  } 
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    document.getElementById("unittype").innerHTML=xmlhttp.responseText;
    }
  }
xmlhttp.open("GET","php/avail_addrental_roomtype.php?q="+str,true);
xmlhttp.send();
}
$(function() {
		$( "#startdate" ).datepicker(
		    {
			altField: '#unixstartdate',
            altFormat: '@',        // Gives a timestamp dateformat
            dateFormat: "D, mm/dd/yy",
			}
		);
		
	});
	$(function() {
		$( "#enddate" ).datepicker(
		{
			altField: '#unixenddate',
            altFormat: '@',        // Gives a timestamp dateformat
            dateFormat: "D, mm/dd/yy",
			}
		);
	});
	
$(".avail_addrental").click(function () {
	$("#lightbox").addClass("active");
	$(this).addClass("active"); 
	var content_show = $(this).attr("title");  
	$("#lightbox").slideDown(); 
    $("."+content_show).slideDown(); 

});

$("#lightbox").click(function() {
	$("#lightbox").removeClass("active");
	$(".lightbox_box").removeClass("active");
	$("#lightbox").slideUp();
	$(".lightbox_box").slideUp();
});

function viewUnverifiedList(){
	$('#unverified_rentals_button').addClass('listInactive');
	$('#unverified_rentals').removeClass('listInactive');
	if ($('#price_problems_button').hasClass('listInactive')){
		$('#price_problems').addClass('listInactive');
		$('#price_problems_button').removeClass('listInactive');
	}
}

function viewPriceList(){
	$('#price_problems_button').addClass('listInactive');
	$('#price_problems').removeClass('listInactive');
	if ($('#unverified_rentals_button').hasClass('listInactive')){
		$('#unverified_rentals').addClass('listInactive');
		$('#unverified_rentals_button').removeClass('listInactive');
	}
}

function closeUnverifiedList(){
	$('#unverified_rentals').addClass('listInactive');
	$('#unverified_rentals_button').removeClass('listInactive');
}

function closePriceList(){
	$('#price_problems').addClass('listInactive');
	$('#price_problems_button').removeClass('listInactive');
}

function editRow(id, bedrooms, bathrooms, occupancy){
	var bedField = id+'_bedrooms';
	var bathField = id+'_bathrooms';
	var ocField = id+'_occupancy';
	var editField = id+'_edit';

	document.getElementById(bedField).innerHTML="<input type='text' name='bedrooms' value='"+bedrooms+"' />";
	document.getElementById(bathField).innerHTML="<input type='text' name='bathrooms' value='"+bathrooms+"' />";
	document.getElementById(ocField).innerHTML="<input type='text' name='occupancy' value='"+occupancy+"' />";
	document.getElementById(editField).innerHTML="<input type='submit' value='Submit' /><br/><input type='button' value='Cancel' onClick='cancelEdit(\""+id+"\", \""+bedrooms+"\", \""+bathrooms+"\", \""+occupancy+"\")' />";
}

function cancelEdit(id, bedrooms, bathrooms, occupancy){
	var bedField = id+'_bedrooms';
	var bathField = id+'_bathrooms';
	var ocField = id+'_occupancy';
	var editField = id+'_edit';

	document.getElementById(bedField).innerHTML=bedrooms;
	document.getElementById(bathField).innerHTML=bathrooms;
	document.getElementById(ocField).innerHTML=occupancy;
	document.getElementById(editField).innerHTML="<input type='button' onClick='editRow(\""+id+"\", \""+bedrooms+"\", \""+bathrooms+"\", \""+occupancy+"\")' value='Edit' />";
}


function test_contact(rental, reservation)
{

    $.ajax({
       type: "POST",
       url: "php/update_rental_contacted.php",
	   data: ({
	   	rental_num: rental, reservation_num: reservation
	   }),
       success: function(msg){
				$('#contact_owner_go').html("<div id='contact_owner_go_updated'></div>");
      			$('#contact_owner_go_updated').html("<h2>Rental Updated!</h2>")       }
     });

  	  	var lightbox_class = "lightbox_contact_owner"+rental;

		$("#lightbox").slideUp();
	 	$("."+lightbox_class).slideUp();
	 	$("#lightbox").removeClass("active");
	 	$(".contact_owner").removeClass("active");

	 	document.forms["contact-owner"].submit;
	 	if (reservation == ""){
	 		alert("Message Sent");
	 	}
	 	


// 	 	$(".resort_link").click(function () {
// 	$("#lightbox").addClass("active");
// 	$(this).addClass("active"); 
// 	var content_show = $(this).attr("title"); 
// 	var resort_num = $(this).html(); 

// 	$.ajax({
// 		type: "POST",
// 		url: "/backend/php/resort_info.php",
// 		data: "resort="+resort_num,
// 		success:function(responseText){
// 			var json = JSON.parse(responseText);
// 			//$('#resortpic').html("<img alt='resortpic' src='"+json.resortImg+"' width='50%' height='50%' />");
// 			$('#resortname').html("<br/><a href='"+json.theurl+"' target='_blank'>"+json.ResortName+"</a>");
// 			$('#resortloc').html(json.City+"<br/>");
// 		}
// 	});

// 	$("#lightbox").slideDown(); 
//     $("."+content_show).slideDown(); 
// });

}

function add_rental_field_focus(obj){

	obj.style.color="";
	obj.style.fontStyle="";
	if (obj.value == "Input rental to consider"){
		obj.value="";
	}
}


function add_rental_field_blur(obj){

	if (obj.value == ""){
		obj.style.color="#808080";
		obj.style.fontStyle="italic";
		obj.value="Input rental to consider";
	}
}

function show_upcoming_reservations(){
	document.getElementById('upcoming_reservations_button_wrapper').innerHTML="<div id=\"upcoming_reservations_button\" title=\"upcoming_reservations\" class=\"button\" style=\"display:inline\" onClick=\"hide_upcoming_reservations()\">Close</div>";
	document.getElementById('upcoming_reservations').style.display="block";
	document.getElementById('reservations_current').style.display="none";
	document.getElementById('upcoming_tab').style.height="21px";
}

function hide_upcoming_reservations(){
	document.getElementById('upcoming_reservations_button_wrapper').innerHTML="<div id=\"upcoming_reservations_button\" title=\"upcoming_reservations\" class=\"button\" style=\"display:inline\" onClick=\"show_upcoming_reservations()\">Upcoming Reservations</div>";
	document.getElementById('upcoming_reservations').style.display="none";
}

function showCurrent(){
	document.getElementById('reservations_soon').style.display="none";
	document.getElementById('reservations_current').style.display="block";
	document.getElementById('upcoming_tab').style.height="auto";
	document.getElementById('upcoming_tab').style.backgroundColor="#CCCCCC";
	document.getElementById('current_tab').style.height="21px";
	document.getElementById('current_tab').style.backgroundColor="#FFFFFF";
}

function showUpcoming(){
	document.getElementById('reservations_soon').style.display="block";
	document.getElementById('reservations_current').style.display="none";
	document.getElementById('upcoming_tab').style.height="21px";
	document.getElementById('upcoming_tab').style.backgroundColor="#FFFFFF";
	document.getElementById('current_tab').style.height="auto";
	document.getElementById('current_tab').style.backgroundColor="#CCCCCC";
}

function edit_owner_information(){
	//document.getElementById('owner_info_quickbooks').style.display="none";
	var screenname = document.getElementById('owner_screenname').innerHTML;
	var fullname = document.getElementById('owner_fullname').innerHTML;
	var fname = document.getElementById('owner_fname').innerHTML;
	var lname = document.getElementById('owner_lname').innerHTML;
	var email = document.getElementById('owner_email').innerHTML;
	var phone = document.getElementById('owner_phone').innerHTML;
	var street = document.getElementById('owner_street').innerHTML;
	var city = document.getElementById('owner_city').innerHTML;
	var state = document.getElementById('owner_state').innerHTML;
	var zip = document.getElementById('owner_zip').innerHTML;
	var country = document.getElementById('owner_country').innerHTML;
	var past = document.getElementById('owner_past').value;
	var w9 = document.getElementById('owner_w9').value;
	var url = document.URL;

	var myHTML = "<form name='owner_update_form' action='php/update_owner.php' method='post' id='owner_update_form'><input type='hidden' name='screenname' value='"+screenname+"' /><input type='text' name='fullname' value='"+fullname+"' /><input type='text' name='fname' value='"+fname+"' /><input type='text' name='lname' value='"+lname+"' /><input type='text' name='email' value='"+email+"' /><input type='hidden' name='email_old' value='"+email+"' /><input type='text' name='phone' value='"+phone+"' onblur='stripPhone(this)' /><input type='text' name='street' value='"+street+"' /><input type='text' name='city' value='"+city+"' /><input type='text' name='state' value='"+state+"' /><input type='text' name='zip' value='"+zip+"' /><input type='text' name='country' value='"+country+"' /><div style='padding-top:5px;'><input type='checkbox' name='past' value='1'";
	if (past == 1){
		myHTML += " checked";
	}
	myHTML += " /></div><div style='padding-top:6px;padding-bottom:8px;'><input type='checkbox' name='w9' value='1'";
	if (w9 == 1){
		myHTML += " checked";
	}
	myHTML += " /></div><input type='hidden' name='url' value='"+url+"' /><input type='submit'value='Submit' /></form>";

	document.getElementById('owner_information_right').innerHTML = myHTML;
	document.getElementById('owner_information_right').style.lineHeight = "26px";
	document.getElementById('owner_information_left').style.lineHeight = "26px";
	document.getElementById('owner_information_left').innerHTML = "Full Name:<br/>First Name:<br/>Last Name:<br/>Email Address:<br/>Phone Number:<br/>Street:<br/>City:<br/>State:<br/>Postal Code:<br/>Country:<br/>Past Owner:<br/>W9:<br/>";
	document.getElementById('owner_edit_button').innerHTML = "Cancel";
	document.getElementById('owner_edit_button').onclick = function() {cancel_information_edit()};
}

function cancel_information_edit(){
	//document.getElementById('owner_info_quickbooks').style.display="inline";
	var form = document.getElementById('owner_update_form');
	var screenname = form[0].value;
	var fullname;
	var fname;
	var lname;
	var email;
	var other_emails;
	var phone;
	var street;
	var city;
	var state;
	var zip;
	var country;
	var past;
	var w9;
	
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
	  	xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
	  	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
	  	if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
	    	var json = xmlhttp.responseText;
	    	//alert(json);
	    	var object = JSON.parse(json);
	    	fullname = object.name;
	    	fname = object.fname;
	    	lname = object.lname;
	    	email = object.email;
	    	other_emails = object.other_emails;
	    	phone = object.phone;
	    	street = object.street;
	    	city = object.city;
	    	state = object.state;
	    	zip = object.zip;
	    	country = object.country;
	    	past = object.past;
	    	w9 = object.w9;

	    	other_emails = other_emails.split(" ");
	    	other_emails.shift();
	    	var numEmails = other_emails.length;

	    	var myHTML = "<div id='owner_screenname' style='display:none;'>"+screenname+"</div><div id='owner_fullname'>"+fullname+"</div>";

	    	if(fname == "" || fname == null){
	    		myHTML += "<br/>";
	    	}
	    	myHTML += "<div id='owner_fname'>" +fname+"</div>";

	    	if(lname == "" || lname == null){
	    		myHTML += "<br/>";
	    	}
	    	myHTML += "<div id='owner_lname'>"+lname+"</div>";

	    	if(email == "" || email == null){
	    		myHTML += "<br/>";
	    	}
	    	myHTML += "<div id='owner_email'>"+email+"</div><div id='owner_other_emails'>";

	    	for (var i = 0; i < numEmails; i++){
	    		myHTML += other_emails[i]+"<br/>";
	    	}

	    	myHTML += "</div>";

	    	if(phone == "" || phone == null){
	    		myHTML += "<br/>";
	    	}
	    	myHTML += "<div id='owner_phone'>"+phone+"</div>";

	    	if(street == "" || street == null){
	    		myHTML += "<br/>";
	    	}
	    	myHTML += "<div id='owner_street'>"+street+"</div><div id='owner_city' style='display:inline;'>"+city+"</div>";

			if(city != "" && city != null && state != "" && state != null){
	    		myHTML += ", ";
	    	} else{
	    		myHTML += "<br/>";
	    	}
	    	
	    	myHTML += "<div id='owner_state' style='display:inline;'>"+state+"</div> <div id='owner_zip' style='display:inline;'>"+zip+"</div>";

	    	if(country == "" || country == null){
	    		myHTML += "<br/>";
	    	}
	    	myHTML += "<div id='owner_country'>"+country+"</div><br/><div><input id='owner_past' type='checkbox' name='past' value='"+past+"' disabled='disabled'";
			if (past == 1){
				myHTML += " checked";
			}
			myHTML += " /></div><div><input id='owner_w9' type='checkbox' name='w9' value='"+w9+"' disabled='disabled'"
			if (w9 == 1){
				myHTML += " checked";
			}
			myHTML += " /></div>";

			document.getElementById('owner_information_right').innerHTML = myHTML;
			document.getElementById('owner_information_right').style.lineHeight = "normal";
			document.getElementById('owner_information_left').style.lineHeight = "normal";
			leftHTML = "Full Name:<br/>First Name:<br/>Last Name:<br/>Email Address:<br/>";
			if (numEmails > 0){
				leftHTML += "Other Emails:<br/>";
			}
			if (numEmails > 1){
				for (var i = 1; i < numEmails; i++){
					leftHTML += "<br/>";
				}
			}
			leftHTML += "Phone Number:<br/>Address:<br/><br/><br/><br/>Past Owner:<br/>W9:<br/>";
			document.getElementById('owner_information_left').innerHTML = leftHTML;

			
			document.getElementById('owner_edit_button').innerHTML = "Edit";
			document.getElementById('owner_edit_button').onclick = function() {edit_owner_information()};
	    }
	}
	xmlhttp.open("GET","/backend/php/get_owner_info.php?q="+screenname,true);
	xmlhttp.send();
}

function stripPhone(obj){
	var phone = obj.value;
	phone = phone.replace(/\D/g, '');
	obj.value = phone;
}

function sendToQuickbooks(obj){
	var $form = $(obj).closest('form');

	$form.children('[class~="sendToQuickbooks"]').children('[class="owner_info_right"]').html('&nbsp;&nbsp;&nbsp;&nbsp;<img src="images/loading.gif" alt="Sending" height="42px" width="42px" />');
	
	var ownerscreen = $form.children('[class~="ownerscreen"]').children('[class="owner_info_right"]').children('input').attr('value');
	var fullname = $form.children('[class~="fullname"]').children('[class="owner_info_right"]').children('input').attr('value');
	var fname = $form.children('[class~="fname"]').children('[class="owner_info_right"]').children('input').attr('value');
	var lname = $form.children('[class~="lname"]').children('[class="owner_info_right"]').children('input').attr('value');
	var primaryemail = $form.children('[class~="primaryemail"]').children('[class="owner_info_right"]').children('input').attr('value');
	var phone = $form.children('[class~="phone"]').children('[class="owner_info_right"]').children('input').attr('value');
	var address = $form.children('[class~="address"]').children('[class="owner_info_right"]').children('input').attr('value');
	var city = $form.children('[class~="city"]').children('[class="owner_info_right"]').children('input').attr('value');
	var state = $form.children('[class~="state"]').children('[class="owner_info_right"]').children('input').attr('value');
	var zip = $form.children('[class~="zip"]').children('[class="owner_info_right"]').children('input').attr('value');
	var country = $form.children('[class~="country"]').children('[class="owner_info_right"]').children('input').attr('value');

	// var alertText = "Screen Name: " + ownerscreen + "\nFull Name: " + fullname + "\nFirst Name: " + fname + "\nLast Name: " + lname + "\nEmail: " + primaryemail + "\nPhone: " + phone + "\nStreet: " + address + "\nCity: " + city + "\nState: " + state + "\nPostal Code: " + zip + "\nCountry: " + country;

	// alert(alertText);

	$.ajax({
		type: "POST",
		url: "php/quickbooks/quickbooks_modify_vendor.php",
		data: "ownerscreen="+ownerscreen+"&fullname="+fullname+"&fname="+fname+"&lname="+lname+"&primaryemail="+primaryemail+"&phone="+phone+"&address="+address+"&city="+city+"&state="+state+"&zip="+zip+"&country="+country,
		success:function(responseText){
			var html = "<div style='font-weight:bold;'>NOTE: Changes have not been saved.  Please submit any changes.</div>";

			var json = JSON.parse(responseText);
			var queryStatus = json.vendorQueryFull;
			if (queryStatus == -1){
				html += "<div style='color:red; font-weight:bold;'>Error sending to quickbooks.<br/>Please tell a dev this owner's screen name.</div>";
			} else if (queryStatus == 0){
				var addStatus = json.addVendor;
				if (addStatus == 0){
					html += "<div style='color:green'>Owner Information sent to quickbooks.<br/>Added Owner.</div>"
				} else{
					html += "<div style='color:red; font-weight:bold;'>Error sending to quickbooks.<br/>Tried to add owner; status = "+addStatus+".<br/>Please tell a dev this owner's screen name.</div>";
				}
			} else{
				var modStatus = json.modifyVendor;
				if (modStatus == 0 || modStatus == 530){
					html += "<div style='color:green'>Owner Information sent to quickbooks.<br/>Modified Owner.</div>"
				} else{
					html += "<div style='color:red; font-weight:bold;'>Error sending to quickbooks.<br/>Tried to modify owner; status = "+modStatus+".<br/>Please tell a dev this owner's screen name.</div>";
				}
			}

			$form.children('[class~="sendToQuickbooks"]').children('[class="owner_info_middle"]').remove();
			$form.children('[class~="sendToQuickbooks"]').children('[class="owner_info_right"]').css("width", "545px");
			$form.children('[class~="sendToQuickbooks"]').children('[class="owner_info_right"]').html(html);
		}
	});
}

function editChecklistLine(obj){
	var id = $(obj).attr('id');
	id = id.slice(0, -5);
	$id = $('#'+id);

	$id.css("background-color","#9fc0d7");

	var na = false;
	if (id == "conf_num"){
		var conf_num_value = $id.children('[class~="reservation_checklist_right_info"]').html();
		if (conf_num_value == "Not Completed"){
			conf_num_value = "";
		}
	} else if(id != "owner_pay_pref"){
		var info_value = $id.children('[class~="reservation_checklist_right_info"]').html();
		if (info_value == "Not Applicable"){
			na = true;
		}
	} else{
		var pref_method = $id.children('[class~="reservation_checklist_right_info"]').html();
		if (pref_method == "Unknown"){
			pref_method = "";
		}
	}

	var name = $id.children('[class~="reservation_checklist_right_initials"]').html();

	var completedDate = $id.children('[class~="reservation_checklist_right_date"]').html();
	var completed = true;
	if (completedDate == "" || completedDate == null || completedDate == undefined){
		completed = false;
	}

	var html = '';

	if (id == "conf_num"){
		html += '<div class="reservation_checklist_right_info" style="width:199px; padding:0px;">';
		html += '<input type="text" name="conf_num" id="checklist_conf_num" style="width:200px; margin:0; padding:3px; background:#9FC0D7;" value="'+conf_num_value+'" onKeyPress="return letternumber(event)" />';
	} else if(id != "owner_pay_pref"){
		html += '<div class="reservation_checklist_right_info" style="width:189px; padding:5px;';
		if (id == "owner_paid_dep"){
			html += 'font-size:75%;';
		} else{
					html += "&nbsp;";
		}
		html += '">';
		html += 'Done:<input class="checklist" type="checkbox" id="'+id+'_checklist_completed" name="completed" value="1"';
		if (completed && !na){
			html += ' checked="checked"';
		} else{
					html += "&nbsp;";
		}
		html += ' />';

		if(id == "owner_paid_dep" || id == "owner_paid_bal"){
			var methods = new Array("Check","Cashier's Check","Paypal Echeck","Paypal Instant Transfer","Paypal Credit Card","Credit Card","Wire");

			html += ' Method:<select name="method" id="'+id+'_checklist_method" style="margin:0; padding:0px; width:20px;">';

			for (var i = 0; i < methods.length; i++){
				html += '<option value="'+methods[i]+'"';
				if (methods[i] == info_value){
					html += ' selected="selected"';
				}
				html += '>'+methods[i]+'</option>';
			}

			html += '</select>';
		}

		if (id == "conf_view" || id == "owner_paid_dep" || id == "trans_money"){
			html += '  N/A:<input class="checklist" type="checkbox" id="'+id+'_checklist_na" name="na" value="1"';
			if (na){
				html += ' checked="checked"';
			}
			html += ' />';
		}
	} else{
		html += '<div class="reservation_checklist_right_info" style="width:189px; padding:5px;">';
		var methods = new Array("Unknown", "Check", "Cashier's Check", "Paypal", "Paypal NO FEES to Owner", "Credit Card");

		html += 'Method:<select name="method" id="'+id+'_checklist_method" style="margin:0; padding:0px; width:75px;">';

		for (var i = 0; i < methods.length; i++){
			html += '<option value="'+methods[i]+'"';
			if (methods[i] == pref_method){
				html += ' selected="selected"';
			}
			html += '>'+methods[i]+'</option>';
		}

		html += '</select>';
	}

	var names = new Array("Alex","Ali","Dan","Keenan","Mary","Paul","Ryan","Darin","Emily");

	html += '</div><div class="reservation_checklist_right_date">&nbsp;</div><div class="reservation_checklist_right_initials"><select name="name" id="'+id+'_checklist_name" style="margin:0; padding:0px;">';

	for (var i = 0; i < names.length; i++){
		html += '<option value="'+names[i]+'"';
		if (names[i] == name){
			html += ' selected="selected"';
		}
		html += '>'+names[i]+'</option>';
	}

	html += '</select></div><div class="reservation_checklist_right_edit" style="background:#fff"><div class="button checklist_edit_submit" onClick="submitChecklistEdit(\''+id+'\')" id="'+id+'_edit">Submit</div><div class="button checklist_edit_submit" style="margin-left:5px;"  onClick="cancelChecklistEdit(\''+id+'\')" id="'+id+'_edit">Cancel</div></div>';

	var leftHeight = $('.reservation_checklist_left').css("height");
	leftHeight = leftHeight.slice(0, -2);
	leftHeight = parseInt(leftHeight);
	leftHeight += 10;

	$id.html(html);
	$id.css("height",leftHeight);
}

function cancelChecklistEdit(id){
	var resID = $('input[name="resID"]').val();
	$id = $('#'+id);

	$.ajax({
		type: "POST",
		url: "php/ajax_checklist.php",
		data: "resID="+resID+"&id="+id,
		success:function(responseText){
			var html = '<div class="reservation_checklist_right_info">';

			json = JSON.parse(responseText);
			var done = false;
			if (json[id] != "" && json[id] != null && json[id] != undefined){
				done = true;
			}

			if(id == "conf_num"){
				if (done){
					html += json[id];
				} else{
					html += "Not Completed";
				}
				html += '</div><div class="reservation_checklist_right_date">';
				if (done){
					var d = new Date(json[id+'_date'] * 1000);
					html += dateFormat(d, "mediumDate");
				} else{
					html += "&nbsp;";
				}
				html += '</div><div class="reservation_checklist_right_initials">';
				if (done){
					html += json[id+'_name'];
				} else{
					html += "&nbsp;";
				}
				html += '</div><div class="button reservation_checklist_right_edit" style="margin:0px; padding:5px;" onClick="editChecklistLine(this)" id="'+id+'_edit">Edit</div>';
			} else{
				
				if (done){
					if(json[id] == 1 || json[id] == "1"){
						html += "Not Applicable";
					} else if(id == "owner_paid_dep" || id == "owner_paid_bal" || id == "owner_pay_pref"){
						var method = json[id+"_method"];
						if (method == null || method == undefined){
							method = "";
						}
						html += method;
					} else{
						html += "Finished";
					}
				} else if(id != "owner_pay_pref"){
					html += "Not Completed";
				} else{
					html += "Unknown";
				}
				html += '</div><div class="reservation_checklist_right_date">';
				if (done && json[id] != 1 && json[id] != "1"){
					var d = new Date(json[id] * 1000);
					html += dateFormat(d, "mediumDate");
				} else{
					html += "&nbsp;";
				}
				html += '</div><div class="reservation_checklist_right_initials">';
				if (done && json[id] != 1 && json[id] != "1"){
					html += json[id+'_name'];
				} else{
					html += "&nbsp;";
				}
				html += '</div><div class="button reservation_checklist_right_edit" style="margin:0px; padding:5px;" onClick="editChecklistLine(this)" id="'+id+'_edit">Edit</div>';
			}

			var leftHeight = $('.reservation_checklist_left').css("height");
			leftHeight = leftHeight.slice(0, -2);
			leftHeight = parseInt(leftHeight);
			leftHeight += 10;

			$id.html(html);
			$id.css("height",leftHeight);
			$id.css("background-color","#fff");
		}
	});	
}

function submitChecklistEdit(id){
	var resID = $('input[name="resID"]').val();
	$id = $('#'+id);


	if (id == "conf_num"){
		var conf_num = $('#checklist_conf_num').val();
	} else{
		var completed = $('#'+id+'_checklist_completed').attr('checked');
		if (id == "conf_view" || id == "owner_paid_dep" || id == "trans_money"){
			var na = $('#'+id+'_checklist_na').attr('checked');
			if (completed && na){
				alert("The item is both Done and N/A.\nPlease choose one.");
				exit();
			}
		}
		if (id == "owner_paid_dep" || id == "owner_paid_bal" || id == "owner_pay_pref"){
			var method = $('#'+id+'_checklist_method').val();
		}
	}

	var name = $('#'+id+'_checklist_name').val();

	var myData = "resID="+resID+"&action="+id+"&name="+name;

	if (id == "conf_num"){
		myData += "&conf_num="+conf_num;
	} else if(id == "conf_view" || id == "trans_money"){
		myData += "&completed="+completed+"&na="+na;
	} else if(id == "owner_paid_bal"){
		myData += "&completed="+completed+"&method="+method;
	} else if(id == "owner_paid_dep"){
		myData += "&completed="+completed+"&method="+method+"&na="+na;
	} else if(id != "owner_pay_pref"){
		myData += "&completed="+completed;
	} else{
		myData += "&method="+method;
	}

	$.ajax({
		type: "POST",
		url: "php/checklist_update.php",
		data: myData,
		success:function(responseText){
			if (responseText == "done"){
				cancelChecklistEdit(id);
			} else{
				alert("Error with request.  Changes not saved.");
				alert(responseText);
			}
		}
	});	
}
/*
function financials_change(obj){
	var id = obj.id;
	id = id.slice(0,-7);

	var ids = new Array("financials_overview","financials_guest","financials_owner");

	
	var width = 0;
	var height = 0;
	$('#'+id).children('div').each(
		function(){
			var thisWidth = $(this).css("width");
			//alert(thisWidth);
			thisWidth = thisWidth.slice(0,-2);
			thisWidth = parseInt(thisWidth);

			if ($(this).attr("id") == "owner_name"){
				width = Math.max(thisWidth, width);
			} else{
				width += thisWidth;
			}

			// var thisHeight = $(this).height;
			// alert(thisHeight);
			// thisHeight = thisHeight.slice(0,-2);
			// thisHeight = parseInt(thisHeight);
			// height = Math.max(height, thisHeight);
		}
	);

	for (var i = 0; i < ids.length; i++){
		if (ids[i] == id){
			continue;
		}
		$('#'+ids[i]).css("display","none");
	}

	//alert("total: "+width);
	width += 25;
	$('#'+id).css("display","block");
	$('#reservation_financials').css("width",width);
	$('#reservation_financials').css("height","180px");
}
*/
$(".financials_change").click(function () {
	$(".financials_change").removeClass("finance_active");
	$(this).addClass("finance_active");
	$(".reservation_financials_section").fadeOut(100);
	var financials_content = $(this).attr("title");
	$("#"+financials_content).fadeIn(); 
});

$(".avail_addrental").click(function () {
	$("#lightbox").addClass("active");
	$(this).addClass("active"); 
	var content_show = $(this).attr("title");  
	$("#lightbox").slideDown(); 
    $("."+content_show).slideDown(); 

});
$(".resort_link").click(function () {
	$("#lightbox").addClass("active");
	$(this).addClass("active"); 
	var content_show = $(this).attr("title"); 
	var resort_num = $(this).html(); 

	$.ajax({
		type: "POST",
		url: "/php/resort_info.php",
		data: "resort="+resort_num,
		success:function(responseText){
			var json = JSON.parse(responseText);
			//$('#resortpic').html("<img alt='resortpic' src='"+json.resortImg+"' width='50%' height='50%' />");
			$('#resortname').html("<br/><a href='"+json.theurl+"' target='_blank'>"+json.ResortName+"</a>");
			$('#resortloc').html(json.City+"<br/>");
		}
	});

	$("#lightbox").slideDown(); 
    $("."+content_show).slideDown(); 
});
$(".dashboard_tabs").click(function () {
	$(".dashboard_tabs").removeClass("tabs_active");
	$(this).addClass("tabs_active");
	$(".dashboard_tabs_content").fadeOut(100);
	var dash_tabby = $(this).attr("title");
	$("#"+dash_tabby).fadeIn(1000);
});

$(".sub_header_reservations").click(function () {
	$(".sub_header_reservations").removeClass("dash_sub_header_active");
	$(this).addClass("dash_sub_header_active");
	$(".dash_sub_section").fadeOut(100);
	var dash_tabby = $(this).attr("title");
	$("#"+dash_tabby).fadeIn(1000);
});

$(".sub_header_payments").click(function () {
	$(".sub_header_payments").removeClass("dash_sub_header_active");
	$(this).addClass("dash_sub_header_active");
	$(".dash_sub_section").fadeOut(100);
	var dash_tabby = $(this).attr("title");
	$("#"+dash_tabby).fadeIn(1000);
});
$(".sub_header_notes").click(function () {
	$(".sub_header_notes").removeClass("dash_sub_header_active");
	$(this).addClass("dash_sub_header_active");
	$(".dash_sub_section").fadeOut(100);
	var dash_tabby = $(this).attr("title");
	$("#"+dash_tabby).fadeIn(1000);
});
$(".sub_header_rentals").click(function () {
	$(".sub_header_rentals").removeClass("dash_sub_header_active");
	$(this).addClass("dash_sub_header_active");
	$(".dash_sub_section").fadeOut(100);
	var dash_tabby = $(this).attr("title");
	$("#"+dash_tabby).fadeIn(1000);
});
$(".sub_header_rentals_unfit").click(function () {
	$(".sub_header_rentals_unfit").removeClass("dash_sub_header_active");
	$(this).addClass("dash_sub_header_active");
	$(".dash_sub_section_unfit").fadeOut(100);
	var dash_tabby = $(this).attr("title");
	$("#"+dash_tabby).fadeIn(1000);
});

function addSearch(num){
	if (num == undefined || num == null || num == ""){
		window.open('php/reserv_addnotification.php', '_blank');
	} else{
		window.open('php/reserv_addnotification.php?id='+num, '_blank');
	}
}

function confirmRes(obj){
	var $div = $(obj).parent();
	var first = $div.children('select').length;
	if (obj.value == "X"){
		$div.html("<input type='submit' value='Confirm' onclick='confirmRes(this);' />");
		return;
	}

	if (!first){
		var names = new Array("Alex","Ali","Dan","Keenan","Mary","Paul","Ryan","Darin","Emily");
		var html = '<select name="name" style="margin:0; padding:0px; width:50px;">';

		for (var i = 0; i < names.length; i++){
			html += '<option value="'+names[i]+'"';
			if (names[i] == name){
				html += ' selected="selected"';
			}
			html += '>'+names[i]+'</option>';
		}

		html += '</select><input type="submit" value="&#x2713;" onclick="confirmRes(this);" style="margin-right:0;padding-right:2px;padding-left:2px;" /><input type="submit" value="X" onclick="confirmRes(this);" style="margin-left:0;padding-right:3px;padding-left:3px;" />';

		$div.html(html);
	} else{
		var name = $div.children('select').val();
		var resID = $div.parent().children(":first").children('a').attr('title');

		$.ajax({
			type: "POST",
			url: "php/checklist_update.php",
			data: "action=re_verify_dash&name="+name+"&resID="+resID,
			success:function(responseText){
				$div.html(responseText);
			}
		});
	}
}

function letternumber(e)
{
	var key;
	var keychar;

	if (window.event)
	   key = window.event.keyCode;
	else if (e)
	   key = e.which;
	else
	   return true;
	keychar = String.fromCharCode(key);
	keychar = keychar.toLowerCase();

	// control keys
	if ((key==null) || (key==0) || (key==8) || 
	    (key==9) || (key==13) || (key==27) )
	   return true;

	// alphas and numbers
	else if ((("abcdefghijklmnopqrstuvwxyz0123456789").indexOf(keychar) > -1))
	   return true;
	else
	   return false;
}

function float(e)
{
	var key;
	var keychar;

	if (window.event)
	   key = window.event.keyCode;
	else if (e)
	   key = e.which;
	else
	   return true;
	keychar = String.fromCharCode(key);
	keychar = keychar.toLowerCase();

	// control keys
	if ((key==null) || (key==0) || (key==8) || 
	    (key==9) || (key==13) || (key==27) )
	   return true;

	// alphas and numbers
	else if ((("0123456789.").indexOf(keychar) > -1))
	   return true;
	else
	   return false;
}

function int(e)
{
	var key;
	var keychar;

	if (window.event)
	   key = window.event.keyCode;
	else if (e)
	   key = e.which;
	else
	   return true;
	keychar = String.fromCharCode(key);
	keychar = keychar.toLowerCase();

	// control keys
	if ((key==null) || (key==0) || (key==8) || 
	    (key==9) || (key==13) || (key==27) )
	   return true;

	// alphas and numbers
	else if ((("0123456789").indexOf(keychar) > -1))
	   return true;
	else
	   return false;
}


// ____________Unfit Rental Functions_________________________________________________________________________
// author : Keenan
// rev #2.

	//change edit and bypass to submit and cancel and change thier functionality
function edit_imp(div){
	$row = $(div).parent().parent();
	$bed = $row.find('div[name="bed"]');
	$bath =$row.find('div[name="bath"]');
	$occup =$row.find('div[name="occup"]');
	$buttons =$row.find('div[name="keenan_cant_type"]');
	
	var id = $row.attr("id");
	var bed = $bed.attr("value");
	var bath = $bath.html();
	var occup = $occup.html();
	var html = "<input type='text' style= 'width:60px; height:14px;' />";
	
	$bed.html(html);
	$bath.html(html);
	$occup.html(html);

	$bed.children('input').val(bed);
	$bath.children('input').val(bath);
	$occup.children('input').val(occup);

	$buttons.html("&nbsp; <input type= \"submit\" value=\"Submit\" onclick='submit_edit_imp(this)'/>&nbsp;<input type=\"submit\" value='Cancel' onclick='cancel_edit_imp(this)'/>");

}
	//preform database update with the submited numbers.
function submit_edit_imp(div){
	$row = $(div).parent().parent();
	var id = $row.attr("id");
	var resort = $row.find('div[name="resort"]').attr('title');
	$bed = $row.find('div[name="bed"]');
	$bath =$row.find('div[name="bath"]');
	$occup =$row.find('div[name="occup"]');
	var bed = $bed.children('input').val();
	var bath = $bath.children('input').val();
	var occup = $occup.children('input').val();

	var conf = confirm("Change listing "+id+" to below?\nResort: "+resort+"\nBeds: "+bed+" Baths: "+bath+" Occupancy: "+occup);
	if(conf){
		$.ajax({
		type: "POST",
		data: "id="+id+"&bed="+bed+"&bath="+bath+"&occup="+occup,
		url: "../ajax/price_checker_submit.php",
		success: function(response){
			cancel_edit_imp(div);
		}
		});
	}

}
	//revert to edit and bypass buttons and repopulated using the database.
function cancel_edit_imp(div){
	$row = $(div).parent().parent();
	var id = $row.attr("id");
	var row_class =$row.attr("class");

	$bed = $row.find('div[name="bed"]');
	$bath =$row.find('div[name="bath"]');
	$occup =$row.find('div[name="occup"]');
	$buttons =$row.find('div[name="keenan_cant_type"]');

	$buttons.html("&nbsp; <input type= \"submit\" value=\"Edit\" onclick='edit_imp(this)'/>&nbsp;<input type=\"submit\" value='Bypass Days' onclick='bypass_length(this)'/>");
	$.ajax({
		type: "POST",
		data: "id="+id+"&class="+row_class,
		url: "../ajax/price_checker_cancel.php",
		success: function(response){
			var json = JSON.parse(response);

			$bed.html(json.bed_str);
			$bed.val(json.bed);
			$bath.html(json.bath);
			$occup.html(json.occup);
			var bed_c ="list_column "+json.bed_class;
			var bath_c ="list_column "+json.bath_class;
			var occup_c ="list_column "+json.occup_class;

			

			$bed.attr('class', bed_c);
			$bath.attr('class', bath_c);
			$occup.attr('class', occup_c);

			check_imp_removal($row);
		}
	});
}
	// bypass button functionality
function bypass_length(div){
	$row = $(div).parent().parent();
	var id = $row.attr("id");
	var resort = $row.find('div[name="resort"]').attr('title');
	var stay = $row.find('div[name="stay"]').html();
	var conf = confirm("Do you want to bypass the stay of listing "+id+"? \nResort: "+resort+"\nStay: "+stay);
	if(conf){
		$.ajax({
		type: "POST",
		data: "id="+id+"&stay=1",
		url: "../ajax/price_checker_bypass.php",
		success: function(response){
			alert(response);
			$stay =$row.find('div[name="stay"]');
			$stay.attr('class', "list_column ");
			check_imp_removal($row);
		}
		});
	}
}
//checks and removes passed in row of the improperlistings and updates the tab number
function check_imp_removal(row){
	$stay =$(row).find('div[name="stay"]');
	$bed = $(row).find('div[name="bed"]');
	$bath =$(row).find('div[name="bath"]');
	$occup =$(row).find('div[name="occup"]');
	
	var s = $stay.attr('class');
	var be = $bed.attr('class');
	var ba = $bath.attr('class');
	var o = $occup.attr('class');

	if(s==be && be==ba && ba==o){
		$tab = $(row).parent().parent().parent().children('div[name="error_improper"]');
		var new_number =$tab.attr('value');
		--new_number;
		$(row).remove();
		$tab.html("Improper Listings: "+new_number);
	}
}
	
//bypasses price flag and updates price number
function bypass_price(div){
	$row = $(div).parent().parent();
	var id = $row.attr("id");
	var resort = $row.find('div[name="resort"]').attr('title');
	var price = $row.find('div[name="price"]').html();
	var conf = confirm("Do you want to bypass the price of listing "+id+"? \nResort: "+resort+"\nPrice: "+price);
	if(conf){
		$.ajax({
		type: "POST",
		data: "id="+id+"&stay=null",
		url: "../ajax/price_checker_bypass.php",
		success: function(response){
			alert(response);
			$tab = $row.parent().parent().parent().children('div[name="error_prices"]');
			var new_number =$tab.attr('value');
			--new_number;
			$row.remove();
			$tab.html("Price Variants: "+new_number);
		}
		});
	}
}