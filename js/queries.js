function fetchOsloS_Eidsvoll() {
  const query = `{
      trip(from: {place: "NSR:StopPlace:59872"}, to: {place: "NSR:StopPlace:58844"}, numTripPatterns: 3, modes: rail) {
        tripPatterns {
          duration
          walkDistance
          legs {
            mode
            distance
            line {
              id
              publicCode
            }
            toPlace {
              name
            }
          }
          expectedStartTime
          expectedEndTime
        }
      }
    }
    
    `
  fetch('https://api.entur.io/journey-planner/v2/graphql', {
      method: 'POST',
      headers: {
        // Replace this with your own client name:
        'ET-Client-Name': 'LienIT',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      }),
    })
    .then(res => res.json())
    .then(data => {
      var lineArr = data.data.trip.tripPatterns
      console.log(lineArr)
      togTider1Arr = []
      lineArr.forEach(element => {
        var startTime = timeParser(element.expectedStartTime)
        var endTime = timeParser(element.expectedEndTime)
        var melding = startTime + " -> " + endTime
        var localTime = getDate().getHours() + ":" + getDate().getMinutes()
        var time = startTime.split(":")[1] - localTime.split(":")[1]
        if (time < 0) {
          time = time + 60
        }

        pushMelding(element.legs[0].line.publicCode, [element.legs[0].toPlace.name, time], togTider1Arr)
      });
    })
}

function fetchHeimdalsgata() {
  const query = `
  {
    stopPlace(id: "NSR:StopPlace:58253") {
      id
      name
      estimatedCalls(timeRange: 72100, numberOfDepartures: 10) {
        realtime
        aimedArrivalTime
        aimedDepartureTime
        expectedArrivalTime
        expectedDepartureTime
        actualArrivalTime
        actualDepartureTime
        date
        forBoarding
        forAlighting
        destinationDisplay {
          frontText
        }
        quay {
          id
        }
        serviceJourney {
          journeyPattern {
            line {
              id
              name
              transportMode
            }
          }
        }
      }
    }
  }
  `
  fetch('https://api.entur.io/journey-planner/v2/graphql', {
      method: 'POST',
      headers: {
        // Replace this with your own client name:
        'ET-Client-Name': 'LienIT',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      }),
    })
    .then(res => res.json())
    .then(data => {
      var lineArr = data.data.stopPlace.estimatedCalls
      console.log(lineArr)
      togTider2Arr = []
      lineArr.forEach(element => {
        if (element.destinationDisplay.frontText == "Rikshospitalet") {
          var startTime = timeParser(element.expectedDepartureTime)
          var line = element.serviceJourney.journeyPattern.line.id.split(":")[2]
          var melding = startTime + " -> " + element.destinationDisplay.frontText

          var localTime = getDate().getHours() + ":" + getDate().getMinutes()
          var time = startTime.split(":")[1] - localTime.split(":")[1]
          if (time < 0) {
            time = time + 60
          }
          if (time == 0) {
            time = "nå"
          }
          pushMelding(line, [element.destinationDisplay.frontText, time], togTider2Arr)
        }
      });
    })
}

function fetchSchousPlass() {
  const query = `
  {
    stopPlace(id: "NSR:StopPlace:58259") {
      id
      name
      estimatedCalls(timeRange: 72100, numberOfDepartures: 10) {
        realtime
        aimedArrivalTime
        aimedDepartureTime
        expectedArrivalTime
        expectedDepartureTime
        actualArrivalTime
        actualDepartureTime
        date
        forBoarding
        forAlighting
        destinationDisplay {
          frontText
        }
        quay {
          id
        }
        serviceJourney {
          journeyPattern {
            line {
              id
              name
              transportMode
            }
          }
        }
      }
    }
  }
  `
  fetch('https://api.entur.io/journey-planner/v2/graphql', {
      method: 'POST',
      headers: {
        // Replace this with your own client name:
        'ET-Client-Name': 'LienIT',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      }),
    })
    .then(res => res.json())
    .then(data => {
      var lineArr = data.data.stopPlace.estimatedCalls
      console.log(lineArr)
      togTider3Arr = []
      lineArr.forEach(element => {
        var startTime = timeParser(element.expectedDepartureTime)
        var line = element.serviceJourney.journeyPattern.line.id.split(":")[2]
        var melding = startTime + " -> " + element.destinationDisplay.frontText
        var localTime = getDate().getHours() + ":" + getDate().getMinutes()
        var time = startTime.split(":")[1] - localTime.split(":")[1]
        if (time < 0) {
          time = time + 60
        }
        if (element.destinationDisplay.frontText == "Kjelsås") {


          pushMelding(line, [element.destinationDisplay.frontText, time], togTider3Arr)

        }
        if (element.destinationDisplay.frontText == "Majorstuen") {
          pushMelding(line, [element.destinationDisplay.frontText, time], togTider4Arr)
        }
      });
    })
}


function fetchSpreadsheet() {
  fetch('https://sheets.googleapis.com/v4/spreadsheets/1d4bu8WyDkMGBEOLrA0JHwo7NmizHXzd24JXzNoQv-Y8/values/Sheet1!A1:C20?key=AIzaSyAOeJd6e4QYXXnZxPR6xVjo7N4XGY3H4Xo', {
      mode: 'cors'
    }, {
      method: 'POST',
      headers: {
        // Replace this with your own client name:
        'ET-Client-Name': 'LienIT',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {

      console.log(data)
      document.getElementById("tHead").innerHTML = ""
      document.getElementById("tBody").innerHTML = ""
      const row = document.getElementById("tHead")
      let time = row.insertCell(0)
      time.innerHTML = data.values[0][0]
      let navn1 = row.insertCell(1)
      navn1.innerHTML = data.values[0][1]
      let navn2 = row.insertCell(2)
      navn2.innerHTML = data.values[0][2]
      const table = document.getElementById("tBody")
      data.values.slice(1, 17).forEach(item => {
        let row = table.insertRow()
        let time = row.insertCell(0)
        time.innerHTML = item[0]
        let navn1 = row.insertCell(1)
        navn1.innerHTML = item[1]
        let navn2 = row.insertCell(2)
        navn2.innerHTML = item[2]
      })
    })
}

function fetchImage() {
  fetch('https://www.googleapis.com/drive/v3/files?q=%270B8YZA0U4KjEWODFGamxaTFJaU1k%27+in+parents&key=AIzaSyAOeJd6e4QYXXnZxPR6xVjo7N4XGY3H4Xo', {
      mode: 'cors'
    }, {
      method: 'POST',
      headers: {
        // Replace this with your own client name:
        'ET-Client-Name': 'LienIT',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {

      console.log(data)
      var tag = "<img class =\"imafge\"src=\"https://drive.google.com/uc?export=view&id="
      const images = document.getElementById("imageCon")
      var id = "0B8YZA0U4KjEWeGUtcFZWdDhsYzdESUpDSkp5MkZIb09IbnMw"

      data.files.forEach(item => {
        var imageLine = "<div class=\"mySlides fade\">"
        imageLine += "<img class=\"imgur\" src=\"https://drive.google.com/thumbnail?id=" + item.id + "\" >"
        imageLine += "</div>"
        images.innerHTML += imageLine
      })

    })
}

function fetchCurrPlay() {
  $.ajax({
    url: 'https://api.spotify.com/v1/me/player/currently-playing',
    beforeSend: function(xhr) {
         xhr.setRequestHeader("Authorization", "Bearer 7d9d5fd7506f4ee4a6587bac1f7f7ae8")
    }, success: function(data){
        alert(data);
        console.log(data)
        //process the JSON data etc
    }
})
}

function fetchWeather() {
  fetch('https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=59.91733&lon=10.76455', {
      mode: 'cors'
    }, {
      method: 'POST',
      headers: {
        // Replace this with your own client name:
        'ET-Client-Name': 'LienIT',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {

      console.log(data)
      var weatherModule1 = document.getElementById("temperature")
      var index = getDate().getHours()
      if(getDate().getHours() == 01) index = 1
      weatherModule1.innerHTML = "<p>"+data.properties.timeseries[index].data.instant.details.air_temperature+"℃</p>"

    })
}