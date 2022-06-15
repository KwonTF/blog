import React, {forwardRef, MutableRefObject} from 'react'

interface Props {
  multiple?: boolean
  video?: boolean
}

function MediaUploader({multiple, video}: Props, inputRef: MutableRefObject<HTMLInputElement>) {
  const accept = `image/*${video ? `, video/*` : ''}`
  return (
    <div style={{display: 'none'}}>
      <input ref={inputRef} type='file' accept={accept} multiple={multiple} />
    </div>
  )
}

export default forwardRef(MediaUploader)
