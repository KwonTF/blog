import {useMutation} from '@tanstack/react-query'

import {uploadImages} from '@blog/admin/src/utils/imageUpload/upload'

export function useImageUpload(input: FileList[] = []) {
  if (input.length < 1) {
    return null
  }

  const {data, isLoading, isError, mutate} = useMutation(async () => {
    const uploadResults = []
    for (const fileList of input) {
      const fileListResult = await uploadImages(fileList)
      uploadResults.push(fileListResult)
    }

    return uploadResults
  })

  return {data, isLoading, isError, postImages: mutate}
}
