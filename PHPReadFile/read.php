<?php
   $fp = fopen('introduction2', 'r');
    $batch = [];
      $myfile = fopen("newfile.txt", "w");
    while (!feof($fp)) {
        $name = trim(fgets($fp));
        $str = '"'.substr($name,0,4).'"'.":".'"'.substr($name,8).'",'."\n";
        var_dump($str);
        $item = $str;
        array_push($batch, $item);
        fwrite($myfile, $str );

    }
    fclose($fp);
    echo json_encode($batch, JSON_UNESCAPED_UNICODE);
    //fwrite($myfile, json_encode($batch));
    fclose($myfile);