import {ProfileDataType} from "../../api/api";
import {getProfileData, profileReducer} from "./profileReducer";


let profileData: {profileData: ProfileDataType } & {status: string | null}

beforeEach(() => {
  profileData = {
    profileData: {
      aboutMe: null,
      contacts: {
        facebook: null,
        website: null,
        vk: null,
        twitter: null,
        instagram: null,
        youtube: null,
        github: null,
        mainLink: null
      },
      lookingForAJob: false,
      lookingForAJobDescription: null,
      fullName: null,
      userId: null,
      photos: {
        small: null,
        large: null
      }
    },
    status: 'asas'
  }
})

test('get profile data', () => {
  const data = profileData
  data.profileData.fullName = 'Alex'
  data.profileData.aboutMe = 'ok'
  const newState = profileReducer(profileData, getProfileData.fulfilled(
    {profileData: data.profileData, userStatus: 'status'}, '', {id: 123}))

  expect(newState.status).toBe('status')
  expect(newState.profileData).toEqual(data.profileData)
})