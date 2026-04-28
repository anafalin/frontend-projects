const API_URL = "./data/data.json";

const getProducts = async () => {
  try {
    const productsResponse = await fetch(API_URL);
    const products = await productsResponse.json();
    return products;
  } catch (error) {
    console.error('Ошибка при получении данных с сервера:', error.message);
    return [];
  }
};

export default getProducts;