console.log('client log!');
/* global google:ignore */

$(init);

function init() {
  initAutocomplete();
  hoverlogo();
  appear();
  disappear();
}

function initAutocomplete() {
  if (document.getElementById('map')) {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: placeCoordinates,
      zoom: 13,
      mapTypeId: 'roadmap'
    });
  }

  // Create the search box and link it to the UI element.
  const input = document.getElementById('pac-input');
  const autocomplete = new google.maps.places.Autocomplete((input));
  $(input).attr(`name`, `name`);


  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    fillInDetails();
  });

  function fillInDetails() {
    var place = autocomplete.getPlace();
    var placeId = place.place_id;
    $('#name').val(place.name);
    $('#placeId').val(place.place_id);
    $('#lat').val(place.geometry.location.lat());
    $('#long').val(place.geometry.location.lng());

    return placeId;
  }

  google.maps.event.addDomListener(window, 'load', initAutocomplete);

  var infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  var googlePlaceId = $('#restaurant-details').data('google-place-id');


  service.getDetails({
    placeId: googlePlaceId
  }, function(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      map.setCenter(place.geometry.location);
      populateShow(place);
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
        place.formatted_address + '</div>');
        infowindow.open(map, this);
      });
    }
  });


  function populateShow(place) {
    ('.rating-info').text(place.rating);
    ('.address-info').text(place.formatted_address);
    ('.website-info').html(`<a href="${place.website}">${place.website}</a>`);
    ('.phone-info').text(place.formatted_phone_number);
    ('.shoutout-info').text(`Shout Outs: ${$('.carousel-item').length}`);
  }
}

function hoverlogo() {
  $('.logo-hp').on('mouseover', function() {
    $(this).attr('src', 'images/Biglogo-01.png');
  });
  $('.logo-hp').on('mouseout', function() {
    $(this).attr('src', 'images/whitelogo.png');
  });
}

function appear() {
  $('.about').hide();
  $('.logo-hp').on('click', function() {
    $('.logo-hp').hide();
    $('.about').show();
    $('.about').empty().append('<h1>Travel Timeline</h1><br> <p>Have you always wanted to be able to keep track of the trips you had and the places you visited? <br><br> Travel Timeline is the answer to your question. <br><br> Welcome to a website where you can create trips and keep track of the destinations you have been to. <br><br> Here you will be able to create from scratch a full trip itinerary, store the locations you plan to visit, create a diary with notes to remember the places you loved the most, add pictures and integrate all of it into in a timeline.<br><br> Travel Timeline is made by Emilie Dussaix, a web developer who is passionate about travel and organisation.<br> Made by a traveller for travellers.</p>');
  });
}

function disappear() {
  $('.about').on('click', function() {
    $('.about').hide();
    $('.logo-hp').show();
  });
}
