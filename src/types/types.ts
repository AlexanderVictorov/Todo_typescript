export type TStatus = 'active' | 'done' | 'trash' | 'all'

export interface ITodo {
  id: number,
  name: string,
  status: TStatus,
  validity: number,
  overdue: boolean,
}

export interface IAction {
  username: string,
  email: string,
  password: string
}
