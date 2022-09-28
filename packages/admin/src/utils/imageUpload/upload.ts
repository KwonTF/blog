import axios from 'axios'

import {retryAsyncFunction} from '@blog/shared/utils/promise'

export async function uploadImages(images: FileList) {
  for (let index = 0; index < images.length; index++) {
    try {
      await retryAsyncFunction<void>(async () => {
        await axios.post('localhost:765/image', {picture: images.item(index)})
      }, 3)
    } catch (error) {}
  }
}
