import axios from "axios"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"

const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
}

export const adminLogin = async (credentials) => {
  const { data } = await axios.post(
    `${API_BASE}/auth-admin/sign-in`,
    credentials,
    config
  )
  return data
}
