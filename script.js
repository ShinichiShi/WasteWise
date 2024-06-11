const organizations = [
    { name: "EcoWaste Solutions", type: "food", lat: 40.7128, lng: -74.0060 },
    { name: "Green Planet Recycling", type: "electronic", lat: 40.7128, lng: -74.0060 },
    { name: "Dry Waste Co.", type: "scrap", lat: 40.7128, lng: -74.0060 },
  ];
  
  let wasteType;
  document.querySelector('.wasteTypeFood').addEventListener('click',() => {
    wasteType = "food"
  }
  ) 
  document.querySelector('.wasteTypeElectronic').addEventListener('click',() => {
    wasteType = "electronic"
  }
  ) 
  document.querySelector('.wasteTypeScrap').addEventListener('click',() => {
    wasteType = "scrap"
  }
  ) 
  document.querySelector('.filter').addEventListener('click',() => {
    findServices()
  }
  )

  function findServices() {
    console.log(wasteType)

    const result = document.querySelector('.results')

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        
        const nearbyOrganizations = organizations.filter(org => org.type === wasteType);
        
        nearbyOrganizations.forEach(org => {
          const distance = calculateDistance(userLat, userLng, org.lat, org.lng);
          
        //   const sections = document.querySelectorAll('.section')
        //   sections.forEach(section=>{
        //     section.classList.remove('section');
        //     console.log("Sds")
        //   })
        
        // const sections = result.querySelectorAll('.section');
        //   sections.forEach(section => {
        //     removeAllClasses(section);
        //   });
       
    

          result.classList.remove('section')
          const div = document.createElement('div');
          div.className='section'
          const details = document.createElement('div')
          details.innerHTML = `${org.name} - ${distance.toFixed(2)} km away`;

          const enquire=document.createElement('div')
          enquire.className="enquire"
          const btn = document.createElement('button')
          btn.innerHTML="Enquire Now"
          enquire.appendChild(btn)

          div.appendChild(details)
          div.appendChild(enquire)
          result.appendChild(div)
          console.log("success")
        });
      });
    } else {
    alert("Kindly Enable Geolocation and try again")
    }
  }

  function removeAllClasses(element) {
    element.className = ''; // Remove all classes from the element
    const children = element.querySelectorAll('*'); // Select all child elements
    children.forEach(child => {
      child.className = ''; // Remove all classes from each child element
    });
  }

  function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLng = deg2rad(lng2 - lng1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180);
  }