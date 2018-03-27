<?php
$name = $_GET["name"];
$time = $_GET["time"];
$stars = $_GET["stars"];

$db = new SQLite3("leaderboard.db");
$insert = "INSERT INTO scores ('name', 'time', 'stars') VALUES('$name','$time', '$stars')";
$db->exec($insert);
$db->close();

?>
