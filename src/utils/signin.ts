export const signin = async (
  email: string,
  password: string,
  rememberMe: boolean
) => {
  try {
    const response = await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    // Vérifier si la réponse est OK avant de parser le JSON
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status} ${response.statusText}`);
    }

    // Vérifier si la réponse contient du JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("La réponse n'est pas au format JSON");
    }

    const data = await response.json();

    if (rememberMe) {
      localStorage.setItem("token", data.body.token);
    } else {
      localStorage.removeItem("token");
    }

    return data; // Retourner les données pour utilisation ultérieure
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    throw error; // Re-lancer l'erreur pour que l'appelant puisse la gérer
  }
};
