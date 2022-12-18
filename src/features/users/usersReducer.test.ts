import {ProfileDataType, UsersType} from "../../api/api";
import {follow, getUsers, unfollow, usersReducer} from "./usersReducer";
import {RequestStatusType} from "../../app/appReducer";


let data: ReturnType<typeof usersReducer>

beforeEach(() => {
  data = {
    items: [
      {
        name: 'alex',
        id: 1,
        uniqueUrlName: null,
        photos: {
          small: null,
          large: null,
        },
        status: 'status',
        followed: false,
      },
      {
        name: 'sofia',
        id: 2,
        uniqueUrlName: null,
        photos: {
          small: null,
          large: null,
        },
        status: 'status sofia',
        followed: false,
      },
      {
        name: 'olga',
        id: 3,
        uniqueUrlName: null,
        photos: {
          small: null,
          large: null,
        },
        status: 'status olga',
        followed: false,
      },
    ],
    totalCount: 155,
    followStatus: [],
    error: null,
    currentUserStatus: null,
    currentUserProfile: {
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
    statusGetUsers: 'idle',
    statusGetCurrentUserProfileData: 'idle'
  }
})

test('get users', () => {
  const initialState = {
    items: [],
    totalCount: 0,
    error: null,
    followStatus: [],
    currentUserStatus: null,
    currentUserProfile: {
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
    statusGetUsers: 'idle' as RequestStatusType,
    statusGetCurrentUserProfileData: 'idle' as RequestStatusType
  }
  const action = getUsers.fulfilled(
    {items: data.items, error: null, totalCount: data.totalCount}, '', {countUsers: 10, page: 1})
  const newState = usersReducer(initialState, action)

  expect(newState.items).toEqual(data.items)
})
test('follow/unfollow', () => {
  const action = follow.fulfilled(3, '', {userId: 3})
  const newState = usersReducer(data, action)
  expect(newState.items[2].followed).toBe(true)

  const action1 = follow.fulfilled(2, '', {userId: 2})
  const newState1 = usersReducer(newState, action1)
  expect(newState1.items[1].followed).toBe(true)

  const action2 = unfollow.fulfilled(2, '', {userId: 2})
  const newState2 = usersReducer(newState1, action2)
  expect(newState2.items[1].followed).toBe(false)
})