export interface ISport {
  message: [{
    id: string,
    code: string,
    name: string,
    paralympic: number,
  }]
}

export interface IMessageSport {
  message: {
    id: string,
    code: string,
    name: string,
    paralympic: number,
  }
}