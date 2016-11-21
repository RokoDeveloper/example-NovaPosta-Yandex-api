var points = {};
var myMap;
var center;
var objectManager;


function getAreas() {
    $.post('np.php', {
        action: 'areas'
    }, function(data) {


        var val = $('#areas').attr('data-value');
        var html = '<option value="">Выберите область</option>';

        $(data).each(function(index, item) {

            var selected = '';
            if (val == item.Description) {
                selected = 'selected';
            }

            html = html + '<option ' + selected + ' data-value=' + item.Ref + ' value="' + item.Description + '">' + item.Description + '</option>';

        });

        $('#areas').html(html);

    }, 'json');
}


function getCities(obj) {


    $.post('np.php', {
        action: 'cities',
        ref: $(obj).find('option:selected').attr('data-value')
    }, function(data) {



        var val = $('#cities').attr('data-value');
        var html = "<option value=''>Выберите город</option>";
        $(data).each(function(index, item) {

            var selected = '';
            if (val == item.Description) {
                selected = 'selected';
            }
            html = html + '<option ' + selected + ' data-value="' + item.Ref + '" value="' + item.Description + '">' + item.Description + '</option>';

        });

        $('#cities').html(html);


    }, 'json');

}


function getPoints(obj) {

    if ($(obj).find('option:selected').attr('data-value') != '') {

        $.post('np.php', {
            action: 'points',
            ref: $(obj).find('option:selected').attr('data-value')
        }, function(data) {

            var html = '<option value="">Выберите отделение</option>';
            var dataMap = {
                "type": "FeatureCollection",
                "features": []
            };

            $(data).each(function(index, item) {



                html = html + '<option data-value="' + item.Ref + '" value="' + item.Description + '">' + item.Description + '</option>';

                var description = '<div id = "hint">' + item.Description + '<br />Телефон: ' + item.Phone;

                if (item.TotalMaxWeightAllowed != '0') {
                    description = description + '<br />Максимальный вес: до ' + item.TotalMaxWeightAllowed + ' кг.';
                }

                description = description + '<br /></div>';

                dataMap['features'].push({
                    "type": "Feature",
                    "id": index,
                    "geometry": {
                        "type": "Point",
                        "coordinates": [item.Latitude, item.Longitude]
                    },
                    "properties": {
                        "addr": item.Description,
                        "balloonContent": item.Ref,
                        "hintContent": description
                    }
                });

            });



            ymaps.ready(function() {

                drawPoints(dataMap);

            });



        }, 'json');

    }


}



function drawPoints(dataMap) {
    if (dataMap.features.length == 0) {
        return;
    }

    objectManager = new ymaps.ObjectManager({
        clusterize: false
    });

    objectManager.add(dataMap);


    if (myMap != undefined) {
        myMap.destroy();
    }


    if (center == undefined) {
        myMap = new ymaps.Map("map", {
            center: ['50.4495', '30.5232'],
            zoom: 12
        }, {
            geoObjectOpenBalloonOnClick: false
        });
    } else {
        myMap = new ymaps.Map("map", {
            center: [center.Latitude, center.Longitude],
            zoom: 12
        }, {
            geoObjectOpenBalloonOnClick: false
        });



        var Placemark = new ymaps.Placemark([center.Latitude, center.Longitude], {}, {
            preset: 'islands#redIcon'
        });


        myMap.geoObjects.remove(document.marker_post);
        myMap.geoObjects.add(Placemark);
        document.marker_post = Placemark;

    }



    myMap.geoObjects.add(objectManager);
    myMap.setBounds(myMap.geoObjects.getBounds(), {
        checkZoomRange: false
    });


}




//start

getAreas();
