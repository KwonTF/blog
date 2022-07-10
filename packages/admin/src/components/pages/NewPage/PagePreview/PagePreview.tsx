import React, {FC, useMemo} from 'react'
import useStyles from 'isomorphic-style-loader/useStyles'

import styles from '../NewPage.scss'
import PhotoCollection from '../PhotoCollection'

interface Props {
  htmlString: string
}

const PagePreview: FC<Props> = ({htmlString}) => {
  useStyles(styles)
  const convertedString = useMemo(() => htmlString?.split(new RegExp('(<p>!@#.+#@!</p>)')), [htmlString])

  if (htmlString?.length < 1) {
    return null
  }

  return (
    <>
      {convertedString.map((value, index) => {
        if (value.startsWith('<p>!@#')) {
          const [, mongoDocId] = value.split('#')
          const mongoIdTest = new RegExp('.+')
          if (mongoIdTest.test(mongoDocId)) {
            return <PhotoCollection collectionId={mongoDocId} key={`photoCollection_${mongoDocId}`} />
          }
          return null
        }

        return (
          <div key={`paragraph_${value.substr(0, 20)}_${index}`}>
            <div dangerouslySetInnerHTML={{__html: value}} />
          </div>
        )
      })}
    </>
  )
}

export default PagePreview
