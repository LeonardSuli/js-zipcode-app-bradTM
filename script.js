// Listen for submit
const zipForm = document.querySelector("#zipForm");
const body = document.querySelector("body");

zipForm.addEventListener("submit", getLocationInfo);
body.addEventListener("click", deleteLocation);

function getLocationInfo(e) {
  e.preventDefault();

  //    Get zip value from input
  const zip = document.querySelector(".zip").value;

  //   Make request
  fetch(`http://api.zippopotam.us/it/${zip}`)

  // --------------------------------------------------------------------
    .then((response) => {

      if (response.status != 200) {

        showIcon('remove');

        //  Mostra l'errore in pagina
        document.querySelector("#output").innerHTML = `
              <article class="message is-danger">
                <div class="message-body">Invalid Zipcode, please try again. Error: ${response.status}</div>
              </article>
            `;

        //  Serve per forzare e mandare l'errore al catch
        throw Error(response.statusText); 

      }else{

        showIcon('check');

        return response.json();
      }

    })

// --------------------------------------------------------------------------
    .then((data) => {

      let output = '';

      data.places.forEach((place) => {

        output += `
              <article class="message is-primary">
                <div class="message-header">
                  <p>Location Info</p>
                  <button class="delete"></button>
                </div>
                <div class="message-body">
                  <ul>
                    <li><strong>City: </strong>${place["place name"]}</li>
                    <li><strong>State/Region: </strong>${place["state"]}</li>
                    <li><strong>Longitude: </strong>${place["longitude"]}</li>
                    <li><strong>Latitude: </strong>${place["latitude"]}</li>
                  </ul>
                </div>
              </article>
            `;

        console.log(place["place name"]);

      });

      // Insert into output div
      document.querySelector("#output").innerHTML = output;

      console.log(data);
    })

// -------------------------------------------------------------------------
    // Throw manda l'errore qua
    .catch(err => console.log(err))
}

function showIcon(icon){

  // Clear icons
  document.querySelector('.icon-check').style.display = 'none';
  document.querySelector('.icon-remove').style.display = 'none';

  // Show correct icon
  document.querySelector(`.icon-${icon}`).style.display = 'inline-flex';

}

function deleteLocation(e){

  // if (e.target.className == "delete") {

  //   document.querySelector(".message").remove();
  //   document.querySelector(".zip").value = "";
  //   document.querySelector(".icon-check").remove();
  // }

  if (e.target.classList.contains("delete")) { 
    
    // Rimuove solo la card cliccata 
    e.target.closest(".message").remove(); 
    
    // Reset input 
    document.querySelector(".zip").value = ""; 
    
    // Nasconde l’icona di successo 
    document.querySelector(".icon-check").style.display = "none"; }
}

// Provare a collegare uno stato qualsiasi oltre l'italia e mettere il codice postale delle sue città
// Con una select o option