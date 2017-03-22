<?php

require __DIR__ . '/vendor/autoload.php';


switch($_SERVER['REQUEST_URI']){

  case '/api/collection':
    getCollection();
    break;
}


function getCollection()
{
  $faker = Faker\Factory::create();

  $result = [];

  for($i = 0; $i < 10; $i++) {
    $result[] = [
      "name" => $faker->name
    ];
  }

  echo json_encode(['data' => [
    'collection' => $result,
    'count' => 100,
    'limit' => 10,
    'start' => 0
  ]]);
}




