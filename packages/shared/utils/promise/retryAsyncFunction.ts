import {sleep} from './sleep'

export async function retryAsyncFunction<T>(func: () => Promise<T>, tryLimit: number, tryCount?: number, sleepTime?: number): Promise<T> {
  try {
    return await func()
  } catch (e) {
    if (tryCount >= tryLimit) {
      throw e
    }
    if (sleepTime) {
      await sleep(sleepTime)
    }
    return retryAsyncFunction<T>(func, tryLimit, tryCount ? tryCount + 1 : 1, sleepTime)
  }
}
