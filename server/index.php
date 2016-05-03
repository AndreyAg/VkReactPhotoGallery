<?php

require 'classes/vk.php';

$v = new Vk(['access_token' => '']);

$params = json_decode(file_get_contents("php://input"));
$count = isset($params->count) ? $params->count : 1;
$offset = isset($params->offset) ? $params->offset : 0;
$hiddenAlbums = [8504157];

$response = $v->api('photos.getAll', array(
    'count' => $count,
    'offset' => $offset,
    'photo_sizes' =>1
));

foreach($response['items'] as $k=>$v) {
    if(in_array($v['album_id'], $hiddenAlbums)) {
        unset($response['items'][$k]);
    }
}
$response['items'] = array_values($response['items']);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
echo json_encode($response);