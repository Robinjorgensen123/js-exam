// denna modul hanterar och skapar stjärnorna, hålls utanför script.js för att göra koden lättare
// att läsa, samt enklare att återanvända koden om man skulle vilja det.
// 



export const createStars = () => {
    const numberOfStars = 100;
    const container = document.body;
  
    document.querySelectorAll('.stars').forEach(star => star.remove());
  
    Array.from({ length: numberOfStars }).forEach(() => {
      const star = document.createElement("section");
      star.classList.add("stars");
  
      const starSize = `${Math.random() * 2 + 1}px`;
      star.style.width = starSize;
      star.style.height = starSize;
  
      star.style.top = `${Math.random() * 95}vh`;
      star.style.left = `${Math.random() * 95}vw`;
  
      star.style.animationDuration = `${Math.random() * 2 + 1}s`;
  
      container.appendChild(star);
    });
  };
  
  export const moveStars = () => {
    const stars = document.querySelectorAll(".stars");
    setInterval(() => {
      stars.forEach(star => {
        star.style.top = `${Math.random() * 95}vh`;
        star.style.left = `${Math.random() * 95}vw`;
      });
    }, 5000);
  };