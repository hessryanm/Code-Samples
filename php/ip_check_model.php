<?php
include "../php/mysql.php";

class ip_address{
	public $ip;
	public $count;
	public $firstdate;
	public $lastdate;
	public $hasothers;
	
	function __construct($i, $d){
		$this->ip = $i;
		$this->count = 1;
		$this->firstdate = $d;
		$this->lastdate = $d;
		$this->hasothers = false;
	}
}

$ips = mysql_query("SELECT * FROM cookies_temp ORDER BY date_in ASC") or die("Error on line " . __LINE__ . " in file " . __FILE__ . "<br/>" . mysql_error());
$people_ips = mysql_query("SELECT ip FROM ignore_usage_ips") or die("Error on line " . __LINE__ . " in file " . __FILE__ . "<br/>" . mysql_error());

$skip_ips = array();
while($person = mysql_fetch_row($people_ips)){
	$ip = $person[0];
	array_push($skip_ips, $ip);
}

$ip_array = array();
while($info = mysql_fetch_array($ips)){
	// a zero time will be -62169962400 in date
	$looked = $info['looked'];
	$searches = $info['searches'];
	$has = false;
	if (preg_match("/[0-9]/", $looked) || preg_match("/[0-9]/", $searches)) $has = true;
	
	$date = strtotime($info['date_in']);
	$ip = $info['ip'];

	if(array_key_exists($ip, $ip_array)){
		$ip_array[$ip]->count++;
		if ($date > $ip_array[$ip]->lastdate) $ip_array[$ip]->lastdate = $date;
		if ($has) $ip_array[$ip]->hasothers = true;
	} else{
		if (!in_array($ip, $skip_ips)){
			$ip_array[$ip] = new ip_address($ip, $date);
			if ($has) $ip_array[$ip]->hasothers = true;
		}
	}
}
?>