import React, {FC, useRef, useState, useEffect} from 'react'
import useStyles from 'isomorphic-style-loader/useStyles'

import styles from './NewPage.scss'

const NewPage: FC = () => {
  useStyles(styles)

  const editorRef = useRef<any>()
  const [editorLoaded, setEditorLoaded] = useState(false)
  const {CKEditor, DocumentEditor} = editorRef.current || {}

  useEffect(() => {
    editorRef.current = {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      CKEditor: require('@ckeditor/ckeditor5-react')?.CKEditor,
      DocumentEditor: require('ckeditor5-custom-build/build/ckeditor')
    }
    setEditorLoaded(true)
  }, [])

  if (typeof window === 'undefined') {
    return null
  }

  return editorLoaded && <CKEditor editor={DocumentEditor} data='<p>Hello From CKEDITOR</p>' />
}

export default NewPage
