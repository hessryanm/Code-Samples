<?php
include "../../php/mysql.php";

$ip = $_POST['ip'];
//0 is usage, 1 is ignore the ip completely
$ignore = $_POST['ignore'];
$notes = mysql_real_escape_string($_POST['notes']);

//figure out which table to add to based on the ignore variable
$table = ($ignore == 0) ? "ignore_usage_ips" : "ignore_ips";

//insert the ip and notes into the correct table
mysql_query("INSERT INTO $table (ip, notes) VALUES ('$ip', '$notes')") or die("Error on line " . __LINE__ . " in file " . __FILE__ . "<br/>" . mysql_error());

//if we are ignoring the ip completely, delete all the instances with that ip from the cookies_temp table
if ($ignore == 1){
	mysql_query("DELETE FROM cookies_temp WHERE ip = '$ip'") or die("Error on line " . __LINE__ . " in file " . __FILE__ . "<br/>" . mysql_error());
}

die("success");
?>