export interface IAthlete {
  message: [
    {
      id: string,
      name: string,
      sportId: string,
      paralympic: number,
      instagramUrl: string,
      instagramName: string,
      instagramImageUrl: string,
      instagramFollowersCount: number,
      instagramFollowingCount: number,
      instagramPostsCount: number,
      instagramBio: string,
      updatedAt: string,
    }
  ]
}

export interface IMessageAthlete {
  message: {
    id: string,
    name: string,
    sportId: string,
    paralympic: number,
    instagramUrl: string,
    instagramName: string,
    instagramImageUrl: string,
    instagramFollowersCount: number,
    instagramFollowingCount: number,
    instagramPostsCount: number,
    instagramBio: string,
    updatedAt: string,
  }
}