import React, {FC, useRef, useState, useEffect, Dispatch, SetStateAction, useCallback} from 'react'
import useStyles from 'isomorphic-style-loader/useStyles'

import styles from '../NewPage.scss'

interface Props {
  setHtmlString: Dispatch<SetStateAction<string>>
}

const PageEditor: FC<Props> = ({setHtmlString}) => {
  useStyles(styles)

  const editorRef = useRef<any>()
  const [editorLoaded, setEditorLoaded] = useState(false)
  const {CKEditor, DocumentEditor} = editorRef.current || {}

  const handleChange = useCallback((event, editor) => {
    const data = editor?.getData()
    if (!data) return
    setHtmlString(data)
  }, [])

  const handleReady = useCallback((editor) => {
    const data = editor?.getData()
    if (!data) return
    setHtmlString(data)
  }, [])

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

  return editorLoaded && <CKEditor onReady={handleReady} onChange={handleChange} editor={DocumentEditor} data='<p>Hello From CKEDITOR</p>' />
}

export default PageEditor
