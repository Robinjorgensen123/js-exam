document.addEventListener('DOMContentLoaded', () => {
    fetchApiKey();
    createStars()
    moveStars()
    
    
});




let apiKey = ''
let planetData = [] // Array som sparar datan ifrån api med info om planeterna
const planets = document.querySelectorAll('.planet-box section')
const planetModal = document.querySelector('.info-modal')
const modalContent = document.querySelector('.modal-content')
const planetBox = document.querySelector('.planet-box') 
const titleText = document.querySelector('main')
//const sun = document.getElementById('solis')








const fetchApiKey = async () => {
    try {
        const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys',{
            method: 'POST'
        });
        const data = await response.json();
        console.log(data)
        apiKey = data.key
        await fetchplanetData()
        console.log(apiKey)
    } catch (error) {
        console.error('error fetching api key:', error)
        
    }
    
}
  


const fetchplanetData = async () => {
    try {
        const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies', {
            method: 'GET',
            headers: { 'x-zocom': apiKey }
        });
        const data = await response.json();
        
        console.log(data); 
        if (data && Array.isArray(data.bodies)) {
            planetData = data.bodies
            addPlanetEventListeners()
        }
        
    } catch (error) {
        console.log('failed to get data:', error);
    }
}

function createStars() {
    const numberOfStars = 100; // Antal stjärnor
    const container = document.body;

   
    const existingStars = document.querySelectorAll('.stars');
    existingStars.forEach(star => star.remove());

    for (let i = 0; i < numberOfStars; i++) {
        let star = document.createElement('section');
        star.classList.add('stars');

        // Slumpmässig storlek på stjärnorna
        const starSize = Math.random() * 2 + 1 + 'px'; // Slumpa storlek mellan 1px och 3px
        star.style.width = starSize;
        star.style.height = starSize;

        // Slumpa positionen på stjärnorna över hela skärmen
        star.style.top = Math.random() * 95 + 'vh'; // Slumpmässig position från 0% till 100% av viewportens höjd
        star.style.left = Math.random() * 90 + 'vw'; // Slumpmässig position från 0% till 100% av viewportens bredd

        // Slumpmässig animeringstid för blinkande effekt
        star.style.animationDuration = Math.random() * 2 + 1 + 's'; // Slumpmässig animeringstid mellan 1 och 3 sekunder

        container.appendChild(star);
    }
}


        function moveStars () {
            const stars = document.querySelectorAll('.stars')
            setInterval(() => {
                stars.forEach(star => {
                    const randomTop = Math.random() * 100 + 'vh'
                    const randomLeft = Math.random() * 100 + 'vw'
                    star.style.top = randomTop
                    star.style.left = randomLeft
                })
            }, 20000)
        }

        const hideMain = () => {
            const mainElementH1 = document.querySelector('main h1')
            const mainElementP = document.querySelector('main p')
            mainElementH1.style.display = 'none'
            mainElementP.style.display = 'none'
        }

        const showMain = () => {
            const mainElementH1 = document.querySelector('main h1')
            const mainElementP = document.querySelector('main p')
            mainElementH1.style.display = 'flex'
            mainElementP.style.display = 'flex'
            
        }

        const hidePlanets = () => {
            planets.forEach(planet => {
                if (planet.id.toLowerCase() !== 'solis') {
                    planet.style.display = 'none'
                }
            })
        }


       
        const colorSunBlue = () => {
            const sun = document.getElementById('solis')
            if (sun) {
                sun.style.backgroundColor = '#418ed4'
            }
        }
        const sun = document.getElementById('solis')
        if (sun) {
            console.log('Solen hittades i DOM');
        sun.addEventListener('click', () => {
            let planetInfo = planetData.find(data => data.latinName.toLowerCase() === 'solis');
            colorSunBlue()

            planetModal.addEventListener('click', (e) => {
                if (e.target === planetModal) {
                    planetModal.style.display = 'none'
                    planetBox.style.display= 'flex'
                    showMain()
                    showPlanets()

                }

            })

            if (planetInfo) {
                // Uppdatera modalen med solens information
                document.getElementById('planet-title').textContent = planetInfo.name;
                document.getElementById('planet-title-latin').textContent = planetInfo.latinName;
                document.getElementById('planet-desc').textContent = `${planetInfo.desc}`;
                document.getElementById('circumference').textContent = `Circumference: ${planetInfo.circumference} km`;
                document.getElementById('distance').textContent = `Distance from the Sun: ${planetInfo.distance} km`;
                document.getElementById('max-temp').textContent = `Max Temp (Day): ${planetInfo.temp.day}°C`;
                document.getElementById('min-temp').textContent = `Min Temp (Night): ${planetInfo.temp.night}°C`;
                document.getElementById('moons').textContent = `Moons: ${planetInfo.moons}`;
    
                planetModal.style.display = 'block';
                planetBox.style.display = 'none';
            }
        })
       }

        const resetSunColor = () => {
            const sun = document.getElementById('solis')
            if (sun) {
                sun.style.backgroundColor = ''
            }
        }

        const showPlanets = () => {
            planets.forEach(planet => {
                planet.style.display = 'flex'
            })
            resetSunColor()
        }

      

        const addPlanetEventListeners = () => {
            planets.forEach(planet => {
               planet.addEventListener('click', () => {
                const planetId = planet.id.toLowerCase()
                const planetInfo = planetData.find(data => data.latinName.toLowerCase() === planetId)

                        hideMain()
                        hidePlanets()
                        colorSunBlue()
                       

                planetModal.addEventListener('click', (e) => {
                    if (e.target === planetModal) {
                        planetModal.style.display = 'none'
                        planetBox.style.display= 'flex'
                        showMain()
                        showPlanets()

                    }

                    


                })

                if (planetInfo) {
                    document.getElementById('planet-title').textContent = planetInfo.name;
                    document.getElementById('planet-title-latin').textContent = planetInfo.latinName;
                    document.getElementById('planet-desc').textContent = `${planetInfo.desc}`;
                    document.getElementById('circumference').textContent = `Circumference: ${planetInfo.circumference} km`;
                    document.getElementById('distance').textContent = `Distance from the Sun: ${planetInfo.distance} km`;
                    document.getElementById('max-temp').textContent = `Max Temp (Day): ${planetInfo.temp.day}°C`;
                    document.getElementById('min-temp').textContent = `Min Temp (Night): ${planetInfo.temp.night}°C`;
                    document.getElementById('moons').textContent = `Moons: ${planetInfo.moons}`;
                  

                    planetModal.style.display = 'block'
                    planetBox.style.display = 'none'

                } else {
                    alert('The information you are looking for is not available!');
                }
                
            
                })
                 
            })
        }


 
        

   

       
    

    
