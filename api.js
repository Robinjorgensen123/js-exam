

// Modul för att hantera api anrop! mindre kod i script.js vilket gör det mer lättläst!
// också lättare för felsökning
export const fetchApiKey = async () => {
  try {
    const response = await fetch(
      "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys",
      {
        method: "POST",
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    
    const data = await response.json().catch((error) => {
      throw new error('error at JSON-PARSING' + error)
    });
    console.log(data);

    if (!data.key) {
      throw new error('Api-key missing')
    }
    return data.key;  // Returnera API-nyckeln
  } catch (error) {
    console.error("Fel vid hämtning av API-nyckel:", error);
    throw error;  // Kasta vidare felet
  }
};