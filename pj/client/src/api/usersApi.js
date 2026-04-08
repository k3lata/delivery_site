import { API_URL } from "../config";

export async function uploadAvatar(file, token) {
  const formData = new FormData();
  formData.append("avatar", file);

  const response = await fetch(`${API_URL}/users/avatar`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Ошибка загрузки аватара");
  }

  return data;
}