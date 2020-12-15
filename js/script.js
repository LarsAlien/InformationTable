var togTider1Arr = []
var togTider2Arr = []
var togTider3Arr = []
var togTider4Arr = []


//Kjører alle startup-funksjoner for siden (Starter kommunikasjon med ESP og fyller konsollen med meldinger)
function sideOnLoad() {
    fetchSpreadsheet()
    fetchImage()
    fetchOsloS_Eidsvoll()
    fetchHeimdalsgata()
    fetchSchousPlass()
    fetchWeather()
    currentTime()
    var tt = setInterval(() => (fetchWeather(),fetchSpreadsheet(),fetchOsloS_Eidsvoll(), fetchHeimdalsgata(), fetchSchousPlass()), 10000)

    //demo()
}



function timeParser(time) {
    var outTime = time.split("T")
    outTime = outTime[1].split("+")
    outTime = outTime[0].split(":")
    outTime = outTime[0] + ":" + outTime[1]

    return outTime
}

//Pusher melding til sidens konsoll-array
function pushMelding(line, melding, array) {
    array.push([line, melding]);
    fyllVenstre("togTider1", togTider1Arr.sort((a, b) => (a[1][1] - b[1][1])))
    fyllVenstre("togTider2", togTider2Arr.sort((a, b) => (a[1][1] - b[1][1])))
    fyllVenstre("togTider3", togTider3Arr.sort((a, b) => (a[1][1] - b[1][1])))
    fyllVenstre("togTider4", togTider4Arr.sort((a, b) => (a[1][1] - b[1][1])))
};



function fyllVenstre(element, array) {
    el = document.getElementById(element);
    el.innerHTML = "";
    var begin = "<div class=\"avgang\"><span class=\"circle\">"
    var end = " min</p></div>"
    array.slice(0, 3).forEach(element => {
        if (element[1][1] == "nå") end = "</p></div>"
        el.innerHTML += begin + element[0] + "</span><p>" + element[1][0] + " " + element[1][1] + end;
    });
};

//Sørger for at fokuset er på siste linje i konsollen
function oppdaterScroll() {
    var el = document.getElementById("botContainer");
    el.scrollTop = el.scrollHeight;
};

function currentTime() {
    var date = new Date()
    var hour = date.getHours()
    var min = date.getMinutes()
    var sec = date.getSeconds()

    hour = updateTime(hour)
    min = updateTime(min)
    sec = updateTime(sec)

    document.getElementById("clock").innerText = hour + " : " + min
    document.getElementById("date").innerText = days[date.getDay() - 1] + " " + date.getDate() + "." + months[date.getMonth()]
    var t = setTimeout(function () {
        currentTime()
    }, 1000)
}

function updateTime(k) {
    if (k < 10) {
        return "0" + k
    } else {
        return k
    }
}


function getDate() {
    var date = new Date()
    return date
}



var slideIndex = 0;

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 4000); // Change image every 2 seconds
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function demo() {
    console.log('Taking a break...');
    await sleep(5000);
    showSlides()
  
  }
  