import React, {FC, useRef, Dispatch, SetStateAction} from 'react'
import {Editor} from '@tinymce/tinymce-react'
import useStyles from 'isomorphic-style-loader/useStyles'

import {useDotEnvContext} from '@blog/admin/src/components/contexts/DotEnvContext'

import styles from '../NewPage.scss'

interface Props {
  setHtmlString: Dispatch<SetStateAction<string>>
  toUploadPage: Dispatch<SetStateAction<boolean>>
}

const PageEditor: FC<Props> = ({setHtmlString, toUploadPage}) => {
  useStyles(styles)
  const editorRef = useRef<any>()
  const {tiny_mcp} = useDotEnvContext()

  return (
    <div>
      <Editor
        apiKey={tiny_mcp}
        onInit={(evt, editor) => (editorRef.current = editor)}
        onChange={(evt, editor) => setHtmlString(editor.getContent())}
        initialValue='<p>~!@#infomation#@! for custom pictures~</p>'
        init={{
          height: 500,
          language: 'ko_KR',
          plugins: [
            'lists',
            'advlist',
            'autolink',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'code',
            'codesample',
            'searchreplace',
            'visualblocks',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'help',
            'wordcount'
          ],
          toolbar:
            'undo redo | casechange blocks | bold italic backcolor forecolor | ' +
            'alignleft aligncenter alignright alignjustify | ' +
            'bullist numlist outdent indent | removeformat | codesample table help'
        }}
      />
      <button onClick={() => toUploadPage(true)}> 사진 올리기</button>
    </div>
  )
}

export default PageEditor
