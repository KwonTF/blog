import axios from 'axios'

import {retryAsyncFunction} from '@blog/shared/utils/promise'

export async function uploadImages(images: FileList) {
  const body = new FormData()
  for (let index = 0; index < images.length; index++) {
    const file = images.item(index)
    body.append('files', file)
  }
  return retryAsyncFunction<void>(async () => axios.post('http://localhost:765/image', body), 3)
}
