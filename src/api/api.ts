import axios from "axios";


const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    "API-KEY": "8ed048a9-5b01-4cf3-8598-4c1e9e24f244"
  }
})

type BaseResponseType<D = {}> = {
  data: D
  messages: []
  fieldsErrors: []
  resultCode: number
}
export type AuthMeDataType = {
  id: number | null
  login: string | null
  email: string | null
}

export const api = {
  authMe(){
    return instance.get<BaseResponseType<AuthMeDataType>>('auth/me')
      .then(res => res.data)
  },
  login(){},
  logout(){
    return instance.delete<{resultCode: number}>('auth/login')
      .then(res => res.data)
  },
}