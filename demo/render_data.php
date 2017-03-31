<?php

require __DIR__ . '/vendor/autoload.php';

$faker = Faker\Factory::create();

$result = [];

for($i = 0; $i < 127; $i++) {
    $result[] = [
        "id" => $faker->numerify('######'),
        "name" => $faker->name,
        "email" => $faker->email,
        "country" => $faker->countryCode
    ];
}

$data = serialize($result);

$file = fopen("data.txt","w");
fwrite($file, $data);
fclose($file);
