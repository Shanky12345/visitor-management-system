<?php
//var_dump($_GET);

require_once('config.php');
$con = mysql_connect(HOSTNAME, USERNAME, PASSWORD);
if (!$con)
{
  die('Database connection failed: ' . mysql_error());
}
else
{
  echo("<h3>Database connected successfully !</h3>");
}
mysql_select_db(DBNAME, $con);

//$sql = "INSERT INTO visitorinfo(";

// Execute query
//mysql_query($sql,$con);


// some code

mysql_close($con);

?>
