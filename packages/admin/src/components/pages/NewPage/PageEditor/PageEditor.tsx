import React, {FC, useRef, useState, useEffect, Dispatch, SetStateAction, useCallback} from 'react'
import useStyles from 'isomorphic-style-loader/useStyles'

import styles from '../NewPage.scss'

interface Props {
  setHtmlString: Dispatch<SetStateAction<string>>
  toUploadPage: Dispatch<SetStateAction<boolean>>
}

const PageEditor: FC<Props> = ({setHtmlString, toUploadPage}) => {
  useStyles(styles)

  const editorRef = useRef<any>()
  const [editorLoaded, setEditorLoaded] = useState(false)
  const {CKEditor, DocumentEditor} = editorRef.current || {}

  const handleChange = useCallback(
    (event, editor) => {
      const data = editor?.getData()
      if (!data) return
      setHtmlString(data)
    },
    [setHtmlString]
  )

  const handleReady = useCallback(
    (editor) => {
      const data = editor?.getData()
      if (!data) return
      setHtmlString(data)
    },
    [setHtmlString]
  )

  useEffect(() => {
    editorRef.current = {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      CKEditor: require('@ckeditor/ckeditor5-react')?.CKEditor,
      DocumentEditor: require('ckeditor5-custom-build/build/ckeditor')
    }
    setEditorLoaded(true)
  }, [])

  if (typeof window === 'undefined') {
    return (
      <div>
        <span>Wating SSR...</span>
      </div>
    )
  }

  return <>
  {editorLoaded && <div>
  <CKEditor onReady={handleReady} onChange={handleChange} editor={DocumentEditor} data='<p>~!@#infomation#@! for custom pictures~</p>' />
  <button onClick={()=>toUploadPage(true)}> 사진 올리기</button>
  </div>}
  </>
}

export default PageEditor
