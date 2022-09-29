import axios from 'axios'
import {useMutation} from '@tanstack/react-query'

import {retryAsyncFunction} from '@blog/shared/utils/promise'

export function useImageUpload(input: FileList[] = []) {
  if (input.length < 1) {
    return null
  }

  const {data, isLoading, isError, mutate} = useMutation(async () => {
    const result = await retryAsyncFunction(() => axios.get('http://localhost:765/image'), 3, 0, 1000)
    return result
  })

  return {data, isLoading, isError, postImages: mutate}
}
