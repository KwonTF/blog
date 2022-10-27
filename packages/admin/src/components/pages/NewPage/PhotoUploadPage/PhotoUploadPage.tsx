import React, {FC, useMemo, useState, useCallback} from 'react'
import useStyles from 'isomorphic-style-loader/useStyles'

import {useArticleUpload} from '@blog/admin/src/components/pages/NewPage/hooks'
import {CardInput, usePostArticleMutation} from '@blog/admin/src/__generated__/graphql-types'

import PhotoUpload from './PhotoUpload'
import styles from '../NewPage.scss'

interface Props {
  htmlString: string
}

const PhotoUploadPage: FC<Props> = ({htmlString}) => {
  useStyles(styles)
  const customAreas = useMemo(() => {
    const splitedHtmlItems = htmlString
      .split(new RegExp('(<p>!@#.+#@!</p>)'))
      .map((value) => {
        if (value.startsWith('<p>!@#')) {
          const [, comment] = value.split('#')
          const commentTest = new RegExp('.+')
          if (commentTest.test(comment)) {
            return comment
          }
        }
        return null
      })
      .filter(Boolean)

    return splitedHtmlItems || []
  }, [htmlString])

  const [images, setImages] = useState<FileList[]>(new Array(customAreas.length))
  const {data: uploadedData, isLoading: articleUploadLoading, mutate} = usePostArticleMutation({
    endpoint: 'http://localhost:765/graphql',
    fetchParams: {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  })
  const uploadArticles = useCallback(
    async (uploadedImages: string[][]) => {
      const cards: CardInput[] = []
      for (const items of uploadedImages) {
        const [tempCard] = items
        cards.push({url: tempCard, desc: 'ABC'})
      }
      const input = {
        title: 'Uploaded By Admin',
        body: htmlString,
        author: '630895a992dff0932b3691fa',
        cards
      }
      mutate({input})
    },
    [htmlString, mutate]
  )

  const {postArticle} = useArticleUpload(images, uploadArticles)
  const setMedia = useCallback((input: FileList, index: number) => {
    setImages((items) => {
      const tempItems = items
      tempItems[index] = input
      return tempItems
    })
  }, [])

  return (
    <>
      {customAreas.map((comment, index) => (
        <PhotoUpload key={`${index}_${comment}`} index={index} comment={comment} setMedia={setMedia} />
      ))}

      {!(uploadedData || articleUploadLoading) && <button onClick={() => postArticle()}>글 올리기</button>}
    </>
  )
}

export default PhotoUploadPage
