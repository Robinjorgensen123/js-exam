

// Modul för att hantera api anrop! mindre kod i script.js vilket gör det mer lättläst!

export const fetchApiKey = async () => {
  try {
    const response = await fetch(
      "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys",
      {
        method: "POST",
      }
    );

    
    const data = await response.json();
    console.log(data);
    return data.key;  // Returnera API-nyckeln
  } catch (error) {
    console.error("Fel vid hämtning av API-nyckel:", error);
    throw error;  // Kasta vidare felet
  }
};