<?php

require __DIR__ . '/vendor/autoload.php';

$file = dirname(__FILE__) . '/data.txt';
$data = file_get_contents($file, true);
$fullCollection = unserialize($data);

$params = json_decode(array_keys($_POST)[0]);

$start = $params->start ? $params->start : 0;
$limit = $params->limit ? $params->limit : 0;

$collection = array_splice($fullCollection, $start, $limit);

switch($_SERVER['REQUEST_URI']){

  case '/api/collection':
    getCollection($collection);
    break;
}

function getCollection($collection)
{
  echo json_encode(['data' => [
    'collection' => $collection,
    'count' => count($collection)
  ]]);
}




