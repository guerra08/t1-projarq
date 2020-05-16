import React, { useCallback } from 'react'

import './styles.css'

export default function UploadStudents() {
  //not working
  function handleChange(e) {
    let file = e.target.files[0]
    let fr = new FileReader()
    fr.onload = function () {
      console.log(JSON.parse(this.result))
    }

    fr.readAsText(file)
  }

  return (
    <div>
      <input type="file" name="file" onChange={(e) => handleChange(e)}></input>
      <pre id="fileContents"></pre>
    </div>
  )
}
