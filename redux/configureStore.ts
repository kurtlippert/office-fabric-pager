import { throttle } from 'lodash'
import { createStore, GenericStoreEnhancer, Reducer } from 'redux'
import { loadState, saveState } from '../libs/localStorage'
import { State } from '../src/model'

const configureStore = (update: Reducer<State>, middlewares?: GenericStoreEnhancer) => {
  const preloadedState: State | undefined = loadState()
  const store =
    createStore<State>(
      update,
      preloadedState || [],
      middlewares,
    )

  store.subscribe(
    throttle(
      () => saveState(store.getState()),
      1000,
    ),
  )

  return store
}

export default configureStore
