<?php

ini_set('display_errors','on');

$apiKEY = "";
function getData($data )
{


	$data_string = json_encode($data);

    $ch = curl_init('https://api.novaposhta.ua/v2.0/json/');


    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Content-Length: ' . strlen($data_string))
    );

    $result = curl_exec($ch);

	return json_decode($result,true);
}



switch ($_POST['action']) {

    case 'points':

	if($_POST['ref']  == '') { echo ''; break; }





		$data = array("apiKey" => $apiKEY,
		"modelName"=>"Address",
		"calledMethod"=>"getWarehouses","methodProperties"=>array(

			'CityRef'=>$_POST['ref'],
			'Page'=>$i

		)
	  );
		 $result = getData( $data );


		   echo json_encode($result['data']);






    break;



    case 'cities':



    $data = array("apiKey" => $apiKEY,
    "modelName"=>"Address",
    "calledMethod"=>"getCities"
  );


  $result = getData( $data );

    if(!empty($result))
    {
        $areas = (array) $result;

        $currentCities = array();
        foreach($areas['data'] as $current)
        {
            if($current['Area'] == $_POST['ref'])
            {
                $currentCities[] = $current;
            }

        }

        echo json_encode($currentCities);

    }

      break;

    case 'areas':

      $data = array("apiKey" => $apiKEY,
      "modelName"=>"Address",
      "calledMethod"=>"getAreas");


       $result = getData( $data );

      if(!empty($result))
      {

        echo json_encode($result['data']);

      }



    break;
}
