const API_URL = "books.json";

export async function fetchBooks() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Lỗi mạng");
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteBookApi(id) {
  console.log(`Đã gọi DELETE cho ID: ${id}`);
}
