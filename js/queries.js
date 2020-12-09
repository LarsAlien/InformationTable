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
        body: JSON.stringify({ query }),
    })
        .then(res => res.json())
        .then(data => {
            var lineArr = data.data.trip.tripPatterns
            console.log(lineArr)
            togTider1Arr = []
            togtidMaker1(lineArr, togTider1Arr)
        })
}

function togtidMaker1(array, pushArr) {
  array.forEach(element => {
          var startTime = timeParser(element.expectedStartTime)
          var endTime = timeParser(element.expectedEndTime)
          var melding = startTime +" -> "+endTime
          pushMelding(element.legs[0].line.publicCode, melding, pushArr)
    });
}

function fetchHeimdalsgata(){
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
      body: JSON.stringify({ query }),
  })
      .then(res => res.json())
      .then(data => {
          var lineArr = data.data.stopPlace.estimatedCalls
          console.log(lineArr)
          togTider2Arr = []
          togtidMaker2(lineArr, togTider2Arr)
      })
}
function togtidMaker2(array, pushArr) {
  array.forEach(element => {
          if(element.destinationDisplay.frontText == "Rikshospitalet") {
          var startTime = timeParser(element.expectedDepartureTime)
          var line = element.serviceJourney.journeyPattern.line.id.split(":")[2]
          var melding = startTime +" -> " + element.destinationDisplay.frontText
          pushMelding(line, melding, pushArr)
          }
    });
}

function fetchSchousPlass(){
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
      body: JSON.stringify({ query }),
  })
      .then(res => res.json())
      .then(data => {
          var lineArr = data.data.stopPlace.estimatedCalls
          console.log(lineArr)
          togTider3Arr = []
          togtidMaker3(lineArr, togTider3Arr)
      })
}
function togtidMaker3(array, pushArr) {
  array.forEach(element => {
          if(element.destinationDisplay.frontText == "Kjelsås") {
          var startTime = timeParser(element.expectedDepartureTime)
          var line = element.serviceJourney.journeyPattern.line.id.split(":")[2]
          var melding = startTime +" -> " + element.destinationDisplay.frontText
          pushMelding(line, melding, pushArr)
          }
          if(element.destinationDisplay.frontText == "Majorstuen") {
            var startTime = timeParser(element.expectedDepartureTime)
            var line = element.serviceJourney.journeyPattern.line.id.split(":")[2]
            var melding = startTime +" -> " + element.destinationDisplay.frontText
            pushMelding(line, melding, togTider4Arr)
            }
    });
}