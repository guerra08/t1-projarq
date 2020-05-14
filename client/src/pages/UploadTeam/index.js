import React from 'react'

export default function UploadTeam() {
  //not working
  function handleChange(e) {
    let file = e.target.files[0]
    // console.log(files[0])
  }

  return (
    <div>
      <input type="file" name="file" onChange={(e) => handleChange(e)}></input>
    </div>
  )
}
