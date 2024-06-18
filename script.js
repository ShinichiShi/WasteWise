
// ###############################################################################################
let wasteType;
document.querySelector('.wasteTypeFood').addEventListener('click', () => {
  wasteType = "food"
  document.querySelector('.wasteTypeScrap').style.backgroundColor="#65CCB8";
  document.querySelector('.wasteTypeElectronic').style.backgroundColor="#65CCB8";
  document.querySelector('.wasteTypeFood').style.backgroundColor="white";}
)
document.querySelector('.wasteTypeElectronic').addEventListener('click', () => {
  wasteType = "electronic"
  document.querySelector('.wasteTypeScrap').style.backgroundColor="#65CCB8";
  document.querySelector('.wasteTypeElectronic').style.backgroundColor="white";
  document.querySelector('.wasteTypeFood').style.backgroundColor="#65CCB8";}
)
document.querySelector('.wasteTypeScrap').addEventListener('click', () => {
  wasteType = "scrap"
  document.querySelector('.wasteTypeScrap').style.backgroundColor="white";
  document.querySelector('.wasteTypeElectronic').style.backgroundColor="#65CCB8";
  document.querySelector('.wasteTypeFood').style.backgroundColor="#65CCB8";
}
)

document.querySelector('.filter').addEventListener('click', () => {
  findServices()
}
)
// ###############################################################################################

const details = document.querySelector('.details')
const hero = document.querySelector('.hero')
const resultSection = document.querySelector('.resultSection')
const loader = document.querySelector('.loading')
const preload = document.querySelector('.pre-load')

let detailsVisible = false
let heroFlag = true

function findServices() {
  console.log(wasteType)
  const result = document.querySelector('.results')
  if (!wasteType) {
    alert('Kindly select a waste type');
    return;
  }

  if (navigator.geolocation) {
    //result banner 
    const banner = document.createElement('div')
    banner.className = "resultBanner"
    banner.innerHTML = `
    <div>Top Results Nearest To Your Area!!</div>`
    if (heroFlag) {
      resultSection.prepend(banner)
      heroFlag = false
    }

    //pre-adjustment
    result.style.height = "70vh"
    result.style.width = "40vw"
    preload.style.height = "70vh"
    preload.style.width = "40vw"

    preload.style.display = "block"
    result.style.display = "none"
    loader.style.display = "block"
    result.innerHTML = ''

    navigator.geolocation.getCurrentPosition(position => {

      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;

      const nearbyOrganizations = organizations.filter(org => org.type === wasteType);
      // Sort organizations by distance
      nearbyOrganizations.sort((org1, org2) => {
        const distance1 = calculateDistance(userLat, userLng, org1.lat, org1.lng);
        const distance2 = calculateDistance(userLat, userLng, org2.lat, org2.lng);
        return distance1 - distance2;
      });


      nearbyOrganizations.forEach(org => {
        const distance = calculateDistance(userLat, userLng, org.lat, org.lng);

        //minor details
        const div = document.createElement('div');
        div.className = 'section'
        const dist = document.createElement('div')
        dist.innerHTML = `${org.name} - ${distance.toFixed(2)} km away`;

        //enquire btn
        const enquire = document.createElement('div')
        const btn = document.createElement('button')
        btn.className = "enquire"
        btn.innerHTML = "Enquire Now"
        enquire.appendChild(btn)

        // Function to show dialog details
        const showDetails = () => {
          details.innerHTML = `
          <div class="ngoImg">
            <img src="${org.img}" alt="image" class="img">
        </div>
        <div class="content">
             <div id="name">
               ${org.name}
             </div>
             <div id="subHeading">
                ${org.desc}
             </div>
             <div class="btns">
                <a href="${org.website}" target="_blank"><button>
                    <img src="./assets/browse.svg" alt="browse">
                    WEBSITE</button>
                </a>
                <a href="${org.direction}" target="_blank">
             <button>
                <img src="./assets/explore.svg" alt="browse">
                DIRECTIONS</button>
                </a>  
             </div> 
            <div id="Address"><b>Address:</b><div>${org.address}</div></div>
            <div id="phone"><b>Contact: </b>${org.ph}</div>
        </div>
           `;
          hero.style.opacity = "0.7"
          details.style.display = "block";
        };

        const hideDetails = () => {
          details.style.display = "none";
          hero.style.opacity = "1";
        };

        div.addEventListener('click', (event) => {
          if (detailsVisible) {
            hideDetails();
          } else {
            showDetails();
          }
          detailsVisible = !detailsVisible;
          event.stopPropagation(); // Prevents the click from propagating to the document
        });

        document.addEventListener('click', (event) => {
          if (detailsVisible && !details.contains(event.target) && event.target !== div) {
            hideDetails();
            detailsVisible = false;
          }
        });

        div.appendChild(dist);
        div.appendChild(enquire);
        div.classList.add('show', 'fade-in');
        result.appendChild(div);
      });

      preload.style.display = "none"
      result.style.display = "block"
      loader.style.display = "none"


    }, () => {
      alert("Kindly Enable Geolocation and try again");
    });
  } else {
    alert("Geolocation is not supported by this browser");
  }
}
// ###############################################################################################3333


function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLng = deg2rad(lng2 - lng1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
// ####################################### fields INPUT ########################################################

document.addEventListener('DOMContentLoaded',  function () {
  const fields = document.querySelectorAll('.fields');

  fields.forEach(function (fields) {

    const input = fields.querySelector('.semInput');
    const dropdown = fields.querySelector('.typeService');
    const placeholder = fields.querySelector('.types');

    fields.addEventListener('click', function () {
      dropdown.style.display = 'block';
    });

    document.addEventListener('click', function (event) {
      if (!fields.contains(event.target)) {
        dropdown.style.display = 'none';
        event.stopPropagation()
      }
    });

    const listItems = dropdown.querySelectorAll('li');
    listItems.forEach(function (item) {
      item.addEventListener('click', function (event) {
        event.stopPropagation()
        const value = item.getAttribute('data-value');
        const text = item.textContent;

        input.value = text;
        dropdown.style.display = 'none';
        placeholder.style.visibility = 'hidden';
      });
    });

    input.addEventListener('focus', function () {
      placeholder.style.visibility = 'hidden';

    });

    input.addEventListener('blur', function () {
      if (input.value === '') {
        placeholder.style.visibility = 'visible';

      }
    });

    input.addEventListener('input', function () {
      placeholder.style.visibility = input.value === '' ? 'visible' : 'hidden';

    });
  });
});

// ##########################################################################################