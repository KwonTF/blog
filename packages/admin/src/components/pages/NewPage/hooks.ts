import {useMutation} from '@tanstack/react-query'

import {uploadImages} from '@blog/admin/src/utils/imageUpload/upload'

export function useArticleUpload(input: FileList[] = [], articleUpload: (files: string[][]) => void) {
  if (input.length < 1) {
    return null
  }

  const {data, isLoading, isError, mutate} = useMutation<string[][]>(
    async () => {
      const uploadResults: string[][] = []
      for (const fileList of input) {
        const fileListResult = await uploadImages(fileList)
        uploadResults.push(fileListResult.data)
      }

      return uploadResults
    },
    {onSuccess: articleUpload}
  )

  return {data, isLoading, isError, postArticle: mutate}
}
