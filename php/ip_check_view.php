
<div id="cookie_header">
	<img src="assets/cookie_icon.png" alt="Cookie Icon"/>
	<div class="toolbar">
		<table>
			<tr>
				<td>
					Ip Address
				</td>
				<td>
					First Date
				</td>
				<td>
					Last Date
				</td>
				<td>
					Count
				</td>
				<td>
					Count/Hr
				</td>
				<td>
					Activity
				</td>
			</tr>
			<tr>
				<td>
					<input type="text" id="ip" disabled="disabled" value="" />
				</td>
				<td>
					<input type="text" id="first" disabled="disabled" value="" />
				</td>
				<td>
					<input type="text" id="last" disabled="disabled" value="" />
				</td>
				<td>
					<input type="text" id="count" disabled="disabled" value="" />
				</td>
				<td>
					<input type="text" id="count_hr" disabled="disabled" value="" />
				</td>
				<td>
					<input type="checkbox" id="has_others" disabled="disabled" />
				</td>
			</tr>
			<tr>
				<td colspan=6>
					<input type="button" name="1" value="Ignore IP" class="ignore_button" title="ignore_box"/>
					<input type="button" name="0" value="Ignore Usage" class="ignore_button" title="ignore_box"/>
				</td>
			</tr>
		</table>
	</div>
</div>
<div style="top:253px; position:fixed; z-index:200; width:130px; left:77px; background-color:white; height:25px; display:block; border:none;"></div>
<div class="ips">
	<?php
	$alt = 0;
	foreach($ip_array as $ip => $object){
		if ($object->count >= 4){
			echo "<div onclick='see_ip(this)' class='row";
			if ($alt){
				$alt--;
				echo " alt";
			} else{
				$alt++;
			}
			echo "' id='".$ip."'>";
			echo $ip;
			echo "</div>";
		}
	}
	?>
</div>
<div id="ip_iframe">
	<iframe src="http://domaintz.com/tools/overview/" id="domaintz"></iframe>
</div>
<?php echo "<script type='text/javascript'>var ips = ".json_encode($ip_array).";var test = 'test';</script>"; ?>
<script type="text/javascript" src="js/cookie_cleaner.js"></script>

<!-- Lightbox popup for when you want to ignore an IP -->
<div class="lightbox_box ignore_box" style="text-align:center;">
	<input type="hidden" value="" id="ignore_type"/>
	<h3 class="ignore_header">Ignore <div id="ignore_title_type" style="display:inline"></div>&nbsp;<div id="ignore_title_ip" style="display:inline"></div></h3>
	<p>Notes:<br/>
		<textarea name="ignore_notes" id="ignore_notes"></textarea><br/> 
		<div id="ignore_submit_button"><input type="button" value="Submit" onclick="temp_cookie_cleaner()" /></div>
	</p>
</div>