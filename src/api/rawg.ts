//header
//api
const rawgToken = import.meta.env.VITE_RAWG_TOKEN;

export const RAWG_CONFIG = {
  BASE_URL: `https://api.rawg.io/api`,
  headers: {
    accept: "application/json",
    authorization: `Bearer ${import.meta.env.VITE_RAWG_TOKEN}`,
  },
};

export const RAWG_API = async () => {
  try {
    const response = await fetch(
      `${RAWG_CONFIG.BASE_URL}/platforms/15?key=${rawgToken}`,
      {
        headers: RAWG_CONFIG.headers,
      },
    );

    if (!response.ok) {
      throw new Error("Error");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Cannot Catch Response!");
  }
};
