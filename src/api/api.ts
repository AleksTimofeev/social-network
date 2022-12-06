import axios from "axios";


const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    "API-KEY": "8ed048a9-5b01-4cf3-8598-4c1e9e24f244"
  }
})

export const api = {
  authMe(){
    return instance.get<BaseResponseType<AuthMeDataType>>('auth/me')
      .then(res => res.data)
  },
  login(email: string, password: string, rememberMe: boolean){
    return instance.post<BaseResponseType<{id: number}>>('auth/login', {email, password, rememberMe})
      .then(res => res.data)
  },
  logout(){
    return instance.delete<{resultCode: number}>('auth/login')
      .then(res => res.data)
  },
  profileData(userId: number){
    return instance.get<ProfileDataType>(`profile/${userId}`)
      .then(res => res.data)
  }
}

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

export type ProfileDataType = {
  "aboutMe": null | string
  "contacts": {
    "facebook": null | string
    "website": null | string
    "vk": null | string
    "twitter": null | string
    "instagram": null | string
    "youtube": null | string
    "github": null | string
    "mainLink": null | string
  },
  "lookingForAJob": boolean
  "lookingForAJobDescription": null | string
  "fullName": string
  "userId": number
  "photos": {
    "small": null | string
    "large": null | string
  }
}