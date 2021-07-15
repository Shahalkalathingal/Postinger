import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Dropzone from 'react-dropzone'
import { useHistory } from 'react-router-dom'
import url from '../../../serverUrl'
import UserContext from '../../../contexts/UserContext'
import M from 'materialize-css'
import LoadContext from '../../../contexts/LoadContext'
function NewPost() {
    const [PreviewFile, setPreviewFile] = useState(false)

useEffect(() => {
    if(!userData.user){
        return history.push('/login')
    }
}, [])

    const [body, setBody] = useState("")
    const history = useHistory()
    const onDrop = (e) => {
        const file = e.target.files[0]
        previewFile(file)
    }

    const { userData } = useContext(UserContext)
    const { setLoad } = useContext(LoadContext)

   
    const onSubmit = (e) => {
        e.preventDefault()
        if(!userData.user){
            M.toast({html:'Please login',classes:'red'})
            return history.push('/login')
        }
        if (!PreviewFile){
            return M.toast({html:"Please upload a image",classes:'red'})
        }
        UploadImage(PreviewFile)
    }

  


    const UploadImage = async (ImageString) => {
        try {
            
            const token = localStorage.getItem('USER_TOKEN')
            await axios.post(`${url}/post/upload`, { image: ImageString, body }, {
                headers: { 'SHAHAL-USER_TOKEN': token }
            })
            M.toast({ html: "New Post Created", classes: 'green' })

            history.push('/')



        } catch (err) {

            
                M.toast({ html: err.response.data.msg, classes: 'red' })
            
        }
    }


    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewFile(reader.result)
        }
    }
    setLoad(100)
    return (
        <div >
            <blockquote>
                <p>New Post</p>
            </blockquote>
            

            <form onSubmit={onSubmit}>
        

                
                <div className="input-field col s12 l6">

                    <Dropzone
                        multiple={false}
                        maxSize={80000000}>
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white', cursor: 'pointer' }}
                                {...getRootProps()}

                            >
                                <input {...getInputProps()} accept="image/*" onChange={onDrop} />

                                <i style={{fontSize: "40px"}}  className="material-icons">add_a_photo</i>

                            </div>
                        )}
                    </Dropzone>
                </div>

                <br />

                {PreviewFile && (
                    <div className="row">
                        <div className="col s12 m4 l4" style={{ marginLeft: '-1rem' }}>
                            <div className="card">
                                <div className="card-image">
                                    <img src={PreviewFile} className="img-responsive" alt="choosen" />
                                </div>

                            </div>
                        </div>
                    </div>


                )}

                <div className="input-field col s12">
                   <input placeholder="Type your description" value={body} onChange={(e)=>setBody(e.target.value)}/>
                </div>




                <button className="btn waves-effect waves-light" type="submit" name="action">Create
                </button>

            </form>




        </div>

    )
}

export default NewPost
