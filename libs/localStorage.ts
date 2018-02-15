import { initialState, State } from '@main/model'

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return initialState
    }
    return JSON.parse(serializedState) as State
  } catch (err) {
    return initialState
  }
}

export const saveState = (state: State) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.error(err)
  }
}
