<?php 
$host = "localhost";
$username = "joogway";
$password = "";
$database = "c9";
$server = mysql_connect($host, $username, $password);
$connection = mysql_select_db($database, $server);

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
} 

$myquery = "SELECT data, wartosc FROM mytable";
$query = mysql_query($myquery);

if ( ! $query ) {
        echo mysql_error();
        die;
    }
    
    $data = array();
    
for ($x = 0; $x < mysql_num_rows($query); $x++) {
        $data[] = mysql_fetch_assoc($query);
    }
    
    echo json_encode($data);     
     
    mysql_close($server);
    
?>  
