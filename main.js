console.log("-Database Online-");

// Computer sound when clicking on StarFleet Logo
const library = document.querySelector("#sfLogo");
    library.addEventListener("click", function () {
    var audio = new Audio("/Users/emmanueldador/Documents/Momentum/Projects/stTest/accessinglibrarycomputerdata_clean.mp3");
    audio.play().loop;
    })


// Search Form
let form = document.querySelector("#search-form");

// Seach buton - to Line 111
form.addEventListener("submit", function (event) {
event.preventDefault();

    var audio = new Audio("/Users/emmanueldador/Documents/Momentum/Projects/stTest/computerbeep_15.mp3");
    audio.play("submit").loop;

// Reloads / refreshes mainDiv
function adiosMD(parent) {
    while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
    }
}
adiosMD(mainDiv);

let uInput = document.querySelector("#search-input");


fetch(
    `https://proxy-itunes-api.glitch.me/search?term=${uInput.value}&media=music`,
    {
    method: "GET",
    // headers: {},
    })
    
    .then(function (response) {
        // Response: what you got from code above
        return response.json();
    })
    .then(function (data) {
    // Data is what's retuned in line 41
    // console.log('The response is', data.results)

    if (data.results) {
        if (data.results.length === 0) {
            console.log("No Results Found"); // For 'error' logging
            let error = document.createElement("p");
                error.classList.add("error");
                error.innerText = "Error Searching.. please try again.";
            mainDiv.appendChild(error);
            
            // ST alert sound on error
            var audio = new Audio("/Users/emmanueldador/Documents/Momentum/Projects/stTest/alert09.mp3");
            audio.play();

            return;
        }


        // Main container/div for artist/band info:
        const mainContainer = document.querySelector("#mainDiv");

        let results = data.results.slice(1);
            for (let result of results) {
            
                
            // Artist/band info container/div
                let bandDiv = document.createElement("div");
                    bandDiv.classList.add("bandPanel");

                let imgThumb = document.createElement("img");
                    imgThumb.classList.add("bImg");
                    imgThumb.src = result.artworkUrl100;
                bandDiv.appendChild(imgThumb);

                let artName = document.createElement("p");
                    artName.classList.add("bName");
                    artName.innerText = result.artistName;
                bandDiv.appendChild(artName);


          // Song/track clickable
                let track = document.createElement("a");
                    track.classList.add("cToPlay");

                let linkedSong = document.createTextNode(`${result.trackName}`);
                    track.appendChild(linkedSong);
                    track.dataset.href = `${result.previewUrl}`;
                bandDiv.appendChild(track);

                let clickMe = document.createElement("p");
                    clickMe.innerText = "(click song title to hear sample)";
                bandDiv.appendChild(clickMe);

            mainContainer.appendChild(bandDiv);


          // Audio player - title click triggers it's creation 
                const topPlayer = document.querySelector("#player");
                    track.addEventListener("click", function () {
                    function playIT() {
                        let player = document.createElement("audio");
                            player.controls = true;
                            player.src = result.previewUrl;
                        player.play();

                        let trackName = document.createElement("p");
                            trackName.innerText = `Now Listening to: ${result.trackName}`;
                        topPlayer.appendChild(player);
                        topPlayer.appendChild(trackName);
                    }
                        if (topPlayer.innerHTML !== "") {
                            topPlayer.innerHTML = "";
                            uInput.value = "";
                        playIT();
                        }
                    });
                    }
    }
    });
});


// Reset button
const topPlayer = document.querySelector("#player")
let uInput = document.querySelector("#search-input");
const mainContainer = document.querySelector("#mainDiv")

reset.addEventListener('click', () => {
    topPlayer.innerHTML = "";
    uInput.value = "";
    mainContainer.innerHTML = "";
    let sfLogo = document.createElement("img");
        sfLogo.src = "/Users/emmanueldador/Documents/Momentum/Projects/stTest/StarFleet.jpeg";
        sfLogo.width = 400
        topPlayer.appendChild(sfLogo);
    let ncc = document.createElement("p");
        ncc.classList.add("ncc");
        ncc.innerText = "USS Momentum - NCC 27713";
        topPlayer.appendChild(ncc);
    var audio = new Audio("/Users/emmanueldador/Documents/Momentum/Projects/stTest/computerbeep_3.mp3");
    audio.play();    
})