import React, { useContext, useState } from 'react'
import UserContext from '../../../contexts/UserContext'
import SingleComment from './SingleComment'
import url from '../../../serverUrl'
import axios from 'axios'
import M from 'materialize-css'

function Comments({ postId, refreshFunction, CommentLists }) {
    const { userData } = useContext(UserContext)
    const [Comment, setComment] = useState("")




    const onSubmit = async (e) => {
        e.preventDefault()

        try {

            
                const body = {
                    content: Comment,
                    postId: postId
                }
                const token = localStorage.getItem('USER_TOKEN')

                const SaveComment = await axios.post(`${url}/post/saveComment`, body, {
                    headers: { 'SHAHAL-USER_TOKEN': token }
                })
                M.toast({html:"Comment added",classes:'green'})

                setComment("")
                
                refreshFunction(SaveComment.data.comment)
            

        } catch (error) {
            M.toast({html:error.response.data.msg,classes:'red'})
            console.log(error);
        }



    }




    return (
        <div>
            {userData.user && (
                <form onSubmit={onSubmit}>
                    <div className="input-field col s12">
                        <input type="text" required onChange={(e) => setComment(e.target.value)} value={Comment} placeholder="add a comment" maxLength="150"/>
                    </div>

                  
                    <button type="submit" className="btn waves-effect waves-light" onClick={onSubmit}>Send</button>

                </form>
            )}
            <br />
            {CommentLists.length} Comments
            <br />
            <br />
           
            <ul className="collection">
                {CommentLists && CommentLists.map(comment => (
                    <React.Fragment>

                        <SingleComment  comment={comment} postId={postId} />

                    </React.Fragment>
                ))}

          </ul>
        </div>
    )
}

export default Comments
