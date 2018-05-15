window.onload = function () {
  var map = new BMap.Map("map");
  // 获取位置
  fetch("/location/" + "ip?ak=34jgLcsvXQaduwh8CZ6nbiKdAZf8a5Og&coor=bd09ll")
    .then(
      res => res.json()
    )
    .then(res => {
      console.log(res)

      // 创建地图实例  
      var point = new BMap.Point(res.content.point.x, res.content.point.y);
      // 创建点坐标  
      map.centerAndZoom(point, 15);
      map.enableScrollWheelZoom(true);
      document.querySelector("#city").innerHTML = res.content.address


      var mapLink = document.querySelector(".topBar a");
      mapLink.onclick = function () {
        if (document.querySelector("#map").style.zIndex > 0) {
          document.querySelector("#map").style.zIndex = 0
        } else {
          document.querySelector("#map").style.zIndex = 1
        }
      }
      var city = res.content.address.slice(0, 2);
      var url = "/air/cityair?city=" + city + "&key=8dd678d627da67a6f317090a1bf8d4df";
      fetch(url, {
          method: "GET",
        })
        .then(res => res.json())
        .then((response) => {
          document.querySelector("#aqiNum").innerHTML = response.result[0].citynow.AQI
          document.querySelector("#aqiDe").innerHTML = response.result[0].citynow.quality
          if (response.result[0].citynow.AQI < 100) {
            document.querySelector(".container").style.backgroundColor = "#aadffc"
          }else if(response.result[0].citynow.AQI > 100) {
            document.querySelector(".container").style.backgroundColor = "#ffe595"
          }else if(response.result[0].citynow.AQI > 300) {
            document.querySelector(".container").style.backgroundColor = "#f67b76"
          }
        })
    })


  var url = "/air/cityair?city=" + city + "&key=8dd678d627da67a6f317090a1bf8d4df";
  fetch(url, {
      method: "GET",
    })
    .then(res => res.json())
    .then((response) => {
      return response;
    })

  // 获取点击 city
  map.addEventListener("click", function (e) {
    var pt = e.point;
    var geoc = new BMap.Geocoder();

    geoc.getLocation(pt, function (rs) {
      var city = rs.addressComponents.city.slice(0, 2);
      var url = "/air/cityair?city=" + city + "&key=8dd678d627da67a6f317090a1bf8d4df";

      fetch(url, {
          method: "GET",
        })
        .then(res => res.json())
        .then((response) => {
          document.querySelector("#map").style.zIndex = 0
          document.querySelector("#aqiNum").innerHTML = response.result[0].citynow.AQI
          if (response.result[0].citynow.AQI < 100) {
            document.querySelector(".container").style.backgroundColor = "#aadffc"
          }else if(response.result[0].citynow.AQI > 100) {
            document.querySelector(".container").style.backgroundColor = "#ffe595"
          }else if(response.result[0].citynow.AQI > 300) {
            document.querySelector(".container").style.backgroundColor = "#f67b76"
          }
          document.querySelector("#aqiDe").innerHTML = response.result[0].citynow.quality
          document.querySelector("#city").innerHTML = response.result[0].citynow.city
        })
    })
  });
}