
<head>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js">
  </script>
  <script src="https://api-maps.yandex.ru/2.1/?lang=tr_TR" type="text/javascript">
  </script>
  <script src = "script.js" type="text/javascript">
  </script>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>
<label for="areas" class="">
  Область
</label>
<select onchange="getCities(this)" id="areas">
</select>
<label for="cities">Город
</label>
<select data-value="" onchange="getPoints(this);" id="cities" >
  <option value="">Выберите город
  </option>
</select>
<div style = "width:300px;height:300px;" id = "map" class="">
</div>
