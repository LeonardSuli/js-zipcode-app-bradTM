// Listen for submit
const zipForm = document.querySelector("#zipForm");
const body = document.querySelector("body");

zipForm.addEventListener("submit", getLocationInfo);
body.addEventListener("click", deleteLocation);


function getLocationInfo(e) {
  e.preventDefault();

  // Get country from select
  const country = document.querySelector("#country").value;

  //    Get zip value from input
  const zip = document.querySelector(".zip").value;

  //   Make request
  fetch(`http://api.zippopotam.us/${country}/${zip}`)

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
          <div class="column is-one-third">
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
          </div>
            `;

        console.log(place["place name"]);

      });

      // Insert into output div
      document.querySelector("#output").innerHTML = `
        <div class="columns is-multiline">
          ${output}
        </div>
      `;

      console.log(data);
    })

// -------------------------------------------------------------------------
    // Throw manda l'errore qua
    .catch(err => console.log(err))
}

// Show check or remove icon
function showIcon(icon){

  // Clear icons
  document.querySelector('.icon-check').style.display = 'none';
  document.querySelector('.icon-remove').style.display = 'none';

  // Show correct icon
  document.querySelector(`.icon-${icon}`).style.display = 'inline-flex';

}

// Delete location card
function deleteLocation(e){

  // if (e.target.className == "delete") {

  //   document.querySelector(".message").remove();
  //   document.querySelector(".zip").value = "";
  //   document.querySelector(".icon-check").remove();
  // }

  if (e.target.classList.contains("delete")) { 
    
    // Rimuove solo la card cliccata 
    const card = e.target.closest(".column"); 

    // 1. Aggiungo la classe di animazione 
    card.classList.add("slide-out"); 
    
    // 2. Aspetto la fine dell’animazione e poi rimuovo 
    setTimeout(() => { 
      card.remove(); 
    }, 500); // deve combaciare con il transition del CSS
    
    // Reset input 
    document.querySelector(".zip").value = ""; 
    
    // Nasconde l’icona di successo 
    document.querySelector(".icon-check").style.display = "none"; 
  }
}