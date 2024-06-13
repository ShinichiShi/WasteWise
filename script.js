const organizations = [
  { name: "NO HUNGRY CHILD", type: "food", lat: 12.915548283849164, lng: 77.57809671209733 },
  { name: "Vara Foundations", type: "food", lat: 12.896483661947967, lng: 77.58218979281666 },
  { name: "Needy Child India Foundation", type: "food", lat: 12.907480369996758, lng: 77.55393648898828 },
  { name: "E-Waste Collection Centr", type: "electronic", lat: 12.914786, lng: 77.586341 },
  { name: "Zolopik", type: "electronic", lat: 12.91549462209462, lng: 77.58726900581297 },
  { name: "Sorian Recyclers Pvt Ltd", type: "electronic", lat: 12.902102474967156, lng: 77.5478495394965 },
  { name: "E-FRIENDLY WASTE RECYCLERS", type: "electronic", lat: 12.946012043510384, lng: 77.52508988125737 },
  { name: "Surabhi Foundation Trust", type: "food", lat: 12.883681974096652, lng: 77.54176516453245 },
  { name: "Child Support Foundation", type: "food", lat: 12.906246236561199, lng: 77.5745299783822 },
  { name: "The Akshayapatra Foundation VK Hill", type: "food", lat: 12.888301102050209, lng: 77.54819105987795 },
  { name: "Little More Love", type: "food", lat: 12.898242366043899, lng: 77.5952112639547 },
  { name: "Vidyaranya", type: "food", lat: 12.983618014894436, lng: 77.6008263071386 },
  { name: "S&S Scrap Dealers & Scrap Buyers", type: "scrap", lat: 12.967927625582236, lng: 77.53995781801031 },
  { name: "HN Scrap Buyer", type: "scrap", lat: 12.904940, lng: 77.635685 },
  { name: "Scraplan - Best Scrap Buyers", type: "scrap", lat: 12.897489258475378, lng: 77.55926839919253 },
  { name: "AIM TRADING COMPANY", type: "scrap", lat: 12.906688201660838, lng: 77.57129994491343 },
  { name: "Scrapzone - Your Door Step Scrap Pickup Service", type: "scrap", lat: 12.91866794871167, lng: 77.5900663943839 }
];

// ###############################################################################################3333
let wasteType;
document.querySelector('.wasteTypeFood').addEventListener('click', () => {
  wasteType = "food"
}
)
document.querySelector('.wasteTypeElectronic').addEventListener('click', () => {
  wasteType = "electronic"
}
)
document.querySelector('.wasteTypeScrap').addEventListener('click', () => {
  wasteType = "scrap"
}
)
document.querySelector('.filter').addEventListener('click', () => {
  findServices()
}
)


// const trialButton = document.querySelector('.trial')
// const detailsDialog = document.querySelector('.detailsDialog');
// const closeDialogButton = document.getElementById('closeDialog');

// trialButton.addEventListener('click', () => {
//   detailsDialog.show();
//   document.addEventListener('click', outsideClickListener);
// });
// function closeDialog() {
//   detailsDialog.close();
//   document.removeEventListener('click', outsideClickListener);
// }
// function outsideClickListener(event) {
//   if (!detailsDialog.contains(event.target) && event.target !== trialButton) {
//     closeDialog();
//   }
// }
// closeDialogButton.addEventListener('click', closeDialog);

// ###############################################################################################3333

function findServices() {
  console.log(wasteType)

  const result = document.querySelector('.results')
  if (!wasteType) {
    alert('Kindly select a waste type');
    return;
  }

  if (navigator.geolocation) {
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
        enquire.className = "enquire"
        const btn = document.createElement('button')
        btn.innerHTML = "Enquire Now"
        enquire.appendChild(btn)

        // Create dialog elements
        const dialog = document.createElement('dialog');
        const details = document.createElement('div');
        details.className = "detailsDialog";
        dialog.appendChild(details);

        // Function to show dialog details
        const showDetails = () => {
          details.innerHTML = `
          <p>Contact: ${org.contact}</p>
          <p>Address: ${org.address}</p>
          <p>Distance: ${distance.toFixed(2)} km</p>
          `;
          details.classList.add('active');

          dialog.showModal();
        };

        // Function to hide dialog
        const hideDialog = () => {
          dialog.close();
        };

        // Event listener to show details when clicking on organization section
        div.addEventListener('click', () => {
          showDetails();
        });

        // Event listener to show details when clicking "Enquire Now" button
        btn.addEventListener('click', (event) => {
          event.stopPropagation(); // Prevent event from bubbling to div's click event
          showDetails();
        });


        div.appendChild(dist)
        div.appendChild(enquire)
        div.appendChild(dialog)
        result.appendChild(div)

        console.log("success")

      });

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
// ###############################################################################################3333
