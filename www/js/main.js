"use strict";//:3

// used to store our pages and navigations(From Tony's pen)
let pages = []; 
let links = [];
//Main Initialization function
if (document.deviceready) {
    document.addEventListener("deviceready", onDeviceReady);
}
else {
    document.addEventListener("DOMContentLoaded", onDeviceReady);
}
function onDeviceReady() {
    //get Jsondata
    serverData.getJSON();
    pages = document.querySelectorAll('[data-role = "page"]');
    links = document.querySelectorAll('[data-role = "nav"] a');
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener("click", navigate);
    }
     // create some fake data so you can see how to use a table
    //fakeStandingsData();
}
function navigate(ev) {
    ev.preventDefault();
    let link = ev.currentTarget;
    // split a string into an array of substrings using # as the seperator
    let id = link.href.split("#")[1]; // get the href page name
    //update what is shown in the location bar
    history.replaceState({}, "", link.href);
    for (let i = 0; i < pages.length; i++) {
        if (pages[i].id == id) {
            pages[i].classList.add("active");
        }
        else {
            pages[i].classList.remove("active");
        }
    }
}
//lets fetch datas from server(From Tony)
let serverData = {
    //server url(quidditch data)
    url: "https://griffis.edumedia.ca/mad9014/sports/quidditch.php"
    , httpRequest: "GET"
    , getJSON: function () {
        // Add headers and options objects
        // Create an empty Request Headers instance
        let headers = new Headers();
        // Add a header(s)
        // key value pairs sent to the server
        headers.append("Content-Type", "text/plain");
        headers.append("Accept", "application/json; charset=utf-8");
        // Now the best way to get this data all together is to use an options object:
        
        // Create an options object
        let options = {
            method: serverData.httpRequest
            , mode: "cors"
            , headers: headers
        };
        //Create an request object so everything we need is in one package
        let request = new Request(serverData.url, options);
        // console.log(request);
        fetch(request).then(function (response) {
            //console.log(response);
            return response.json();
        }).then(function (data) {
            //console.log(data); // now we have JS data, let's display it
            
            // Call a function that uses the data we recieved 
            addProperty(data);
            //            console.log("Before sorting in previous funciton data.teams:");
            //            console.log(data.teams);
            displayData(data);
        }).catch(function (err) {
            alert("Error: " + err.message);
        });
    }
};
function addProperty(data) {
    data.teams.forEach(function (value) {
        value["numofWin"] = 0;
    });
}

function displayData(data) {
    localStorage.clear();
    let refrButton = document.getElementById("buttonRefresh");
    refrButton.addEventListener("click", onDeviceReady);
    
    
    //get our schedule unordered list 
let ul = document.querySelector(".schduleList");
    //clears exisiting data
    ul.innerHTML = "";
    //In this chedule, create a list for each game
    data.scores.forEach(function (value) {
        
        let li = document.createElement("li");
        //li.className = "score"!!!!!!!!!!!!
        ul.appendChild(li);
        
        let h3 = document.createElement("h3");
        h3.textContent = value.date;
        ul.appendChild(h3);

        function addProperty(data) {
    data.teams.forEach(function (value) {
        value["numofWin"] = 0;
    });
}
        
        
        
//add new schedule to the unordered list        
let homeTeam = null;
let awayTeam = null;
     function getTeamName(teams, id) {
           for (let i = 0; i < teams.length; i++) {
           if (teams[i].id == id) {
            return teams[i].name;
        }
    }
        return "unknown";
}
            value.games.forEach(function (item) {
            homeTeam = getTeamName(data.teams, item.home);
            awayTeam = getTeamName(data.teams, item.away);
            let dg = document.createElement("div");
            dg.classList.add("onePair");
                
            let home = document.createElement("div");
            home.classList.add("homeTm");
            home.innerHTML = homeTeam + " " + "<b>" + item.home_score + "</b>" + "&nbsp" + "<br>";
            //            home.innerHTML = homeTeam + " " + "<b>" + item.home_score + "</b>"  + "<br>";
            dg.appendChild(home);
                
            let away = document.createElement("div");
            away.classList.add("awayTm");
            away.innerHTML = "&nbsp" + awayTeam + " " + "<b>" + item.away_score + "</b>" + "&nbsp";
            //            away.innerHTML = "&nbsp" + awayTeam + " " + "<b>" + item.away_score + "</b>" ;
            dg.appendChild(away);
                
            ul.appendChild(dg);
                

//Calculate nuber of wins                
            if (item.home_score > item.away_score) {
                calculateWins(data.teams, item.home);
            }
            else {
                calculateWins(data.teams, item.away);
            }
        });
    });
    
function calculateWins(teams, id) {
    for (let i = 0; i < teams.length; i++) {
        if (teams[i].id == id) {
            teams[i].numofWin += 1;
        }
    }
}
calcStanding(data);
    localStorage.setItem("scheduleResults", JSON.stringify(data));
}


function calcStanding(data) {
    console.log(data.teams.length);
    //    console.log("data.scores:");
    //    console.log(data.scores);
    // sort by num of wins
    data.teams.sort(function (a, b) {
        if (a.numofWin > b.numofWin) {
            return -1;
        }
        if (a.numofWin < b.numofWin) {
            return 1;
        }
        return 0;
    });
    console.log("After sorting data.teams:");
    console.log(data.teams);
    

  //show our list board(based on Tony'pen)
  let tbody = document.querySelector("#scores tbody");
    while(tbody.rows.length > 0) {
    tbody.deleteRow(0);
}
    for (let i = 0, numOfTm = data.teams.length; i < numOfTm; i++) {
        let tr = document.createElement("tr");
        let tdn = document.createElement("td");
        tdn.textContent = data.teams[i].name;
        let tdw = document.createElement("td");
        tdw.textContent = data.teams[i].numofWin;
        let tdl = document.createElement("td");
        tdl.textContent = (numOfTm - 1) * 2 - data.teams[i].numofWin;
        let tdt = document.createElement("td");
        tdt.textContent = 0;
        let tdp = document.createElement("td");
        tdp.textContent = data.teams[i].numofWin * 2;
        tr.appendChild(tdn);
        tr.appendChild(tdw);
        tr.appendChild(tdl);
        tr.appendChild(tdt);
        tr.appendChild(tdp);
        tbody.appendChild(tr);
    }
}

                

                
