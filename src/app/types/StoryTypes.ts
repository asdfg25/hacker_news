export interface IComment {
    by: string
    id: number
    kids: number[]
    parent: number
    text: string
    time: number
}

export interface IStory {
    by: string
    descendants: number
    id: number
    score: number
    time: number
    title: string
    url: string
    kids: number[]
  
  }