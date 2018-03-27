<?php

$db = new SQLite3("leaderboard.db");

$sql = "SELECT * FROM scores";
$result = $db->query($sql);
$arr = array();
$i=0;
while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
    $arr[$i]['id'] = $row['id'];
    $arr[$i]['name'] = $row['name'];
    $arr[$i]['time'] = $row['time'];
    $arr[$i]['stars'] = $row['stars'];

    $i++;
}

echo json_encode($arr);
$db->close();

?>
