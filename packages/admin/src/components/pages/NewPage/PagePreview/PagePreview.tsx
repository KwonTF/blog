import React, {FC, useMemo} from 'react'
import useStyles from 'isomorphic-style-loader/useStyles'

import PhotoCollection from '../PhotoCollection'
import styles from '../NewPage.scss'

interface Props {
  htmlString: string
}

const PagePreview: FC<Props> = ({htmlString}) => {
  useStyles(styles)
  const convertedString = useMemo(() => htmlString.split('<p>!@#</p>'), [htmlString])
  console.log(convertedString)

  if (convertedString.length < 1) {
    return null
  }
  return (
    <>
      {convertedString.map((value, index) => (
        <div key={`paragraph_${value.substr(0, 20)}_${index}`}>
          <div dangerouslySetInnerHTML={{__html: value}} />
          {index !== convertedString.length - 1 && <PhotoCollection />}
        </div>
      ))}
    </>
  )
}

export default PagePreview
