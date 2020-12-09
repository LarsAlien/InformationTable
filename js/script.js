var togTider1Arr = []
var togTider2Arr = []
var togTider3Arr = []
var togTider4Arr = []
//Henter og returnerer tidsstempel
function hentTidsstempel() {
    var d = new Date();
    //Formaterer dato til hh:mm:ss
    var dates = d.getHours() + ":" + ('0'+d.getMinutes()).slice(-2)+ ":" + ('0'+d.getSeconds()).slice(-2);
    return dates;
}

var holdStatus = 0;
var laasStatus = 0;

//Sender forespørsel om å åpne/lukke døren til websocket
function endreStatusDoor() {
    holdStatus = !holdStatus;
    var status = document.getElementById("statusCheck"); //Henter checkboksen
    var statusP = document.getElementById("statusP");//Henter <p>elementet under knappen
    //holdStatus = status.checked;//Setter boolean til samme status som checkboksen
    console.log('Dørhold har endret til status: ' + holdStatus);

    //Sjekker hvilken dør-status som skal sendes til server
    if(holdStatus) {
        pushMelding("KLIENT", "Sendte forespørsel om å holde dør til server");
        statusP.innerHTML = "Status: Åpen";
    } else {
        pushMelding("KLIENT", "Sendte forespørsel om å ikke holde opp dør til server");
        statusP.innerHTML = "Status: Lukket";
    }
};

//Sender forespørsel om å låse døren til websocket
function endreLaasDoor() {
    laasStatus = !laasStatus;
    var laas = document.getElementById("laasCheck"); //Henter checkboksen
    var laasP = document.getElementById("laasP"); //Henter <p>elementet under knappen
    //laasStatus = laas.checked; //Setter boolean til samme status som checkboksen
    console.log('Dørlås har endret til status: ' + laasStatus);

    //Sjekker hvilken lås-status som skal sendes til server
    if(laasStatus) {
        pushMelding("KLIENT", "Sendte forespørsel om å låse dør til server");
        laasP.innerHTML = "Status: Låst";
    } else {
        pushMelding("KLIENT", "Sendte forespørsel om å låse opp dør til server");
        laasP.innerHTML = "Status: Åpen";
    }
};

//Kjører alle startup-funksjoner for siden (Starter kommunikasjon med ESP og fyller konsollen med meldinger)
function sideOnLoad() {
    fetchOsloS_Eidsvoll()
    fetchHeimdalsgata()
    fetchSchousPlass()
    currentTime()
    var tt = setInterval(() => (fetchOsloS_Eidsvoll(),fetchHeimdalsgata(),fetchSchousPlass()), 10000)

}



function timeParser(time) {
    var outTime = time.split("T")
    outTime = outTime[1].split("+")
    outTime = outTime[0].split(":")
    outTime = outTime[0]+":"+outTime[1]

    return outTime
}

//Pusher melding til sidens konsoll-array
function pushMelding(avsender, melding, array) {
    array.push([avsender, melding]);
    fyllVenstre("togTider1", togTider1Arr)
    fyllVenstre("togTider2", togTider2Arr)
    fyllVenstre("togTider3", togTider3Arr)
    fyllVenstre("togTider4", togTider4Arr)
    fyllKonsoll()
};

//Oppdaterer konsollen med meldinger fra konsoll-array
function fyllKonsoll(){
    el = document.getElementById("botContainer");
    el.innerHTML = "";
    for(i = 0; i < meldingArr1.length; i++) {
        el.innerHTML += "<p class=\"melding\">" + meldingArr1[i][0]  + meldingArr1[i][1] + "</p><br>";
    };
    oppdaterScroll();
};

function fyllVenstre(element, array){
    el = document.getElementById(element);
    el.innerHTML = "";
    array.slice(0,3).forEach(element => {
        el.innerHTML += " <div class=\"avgang\"><button class=\"linje\">"+ element[0] +"</button>" + element[1] + "</div>";
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

    document.getElementById("clock").innerText = hour + " : " + min + " : " + sec
    var t = setTimeout(function(){currentTime()}, 1000)
}

function updateTime(k) {
    if(k < 10) {
        return "0" + k
    }
    else {
        return k
    }
}


