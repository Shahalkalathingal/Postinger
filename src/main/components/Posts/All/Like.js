import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../../contexts/UserContext'
import url from '../../../serverUrl'
import M from 'materialize-css'
import LoadContext from '../../../contexts/LoadContext'
function Like(props) {
    const history = useHistory()

    const { userData } = useContext(UserContext)
    const { setLoad } = useContext(LoadContext)
    const [likes, setLikes] = useState(0)
    const [likeAction, setlikeAction] = useState(null)

    let reqBody = {}


    if (props.post) {
        reqBody = {
            postId: props.postId
        }
    } else {
        reqBody = {
            commentId: props.commentId
        }
    }


    






    useEffect(() => {
        const getLikes = async () => {
            try {
                setLoad(0)
                const GetLikes = await axios.post(`${url}/likes/getLikes`, reqBody)
                
                // Check if already liked or not
                
                
                GetLikes.data.likes.map(like => {
                    if (like.userId === userData.user._id) {
                        return setlikeAction(true)
                    }
                })
                

                
                
                //likes count
                
                setLikes(GetLikes.data.likes.length)
                setLoad(100)
                
            } catch (error) {
                console.error(error);
            }

        }
        getLikes()
    },[])


    const onLike = async () => {
        if (likeAction) {
            try {
                await axios.post(`${url}/likes/unLike`, reqBody, {
                    headers: { 'SHAHAL-USER_TOKEN': localStorage.getItem('USER_TOKEN') }
                })

                setLikes(likes - 1)
                setlikeAction(false)

            } catch (error) {

               if(error.response.data.msg){
                   return setlikeAction(true)
               }


            }
        } else {
            try {
                await axios.post(`${url}/likes/upLike`, reqBody, {
                    headers: { 'SHAHAL-USER_TOKEN': localStorage.getItem('USER_TOKEN') }
                })
                setLikes(likes + 1)
                setlikeAction(true)


            } catch (error) {
                console.log(error);
            }



        }
    }

    if (userData.user) {


        return (
            <div>
            <span><i
                onClick={onLike}
                className="material-icons left"
                style={{ color: "red", cursor: 'pointer' }}
            >{likeAction ? <>favorite</> : <>favorite_border</>}</i><span className="left" style={{marginLeft:'-.7rem'}}>{likes}</span></span><br />
               
            </div>
        )

    } else {
        return (
            <div>
            <i
                onClick={()=>M.toast({html:'Please login',classes:'red'}) && history.push('/login')}
                className="material-icons left"
                style={{ color: "red", cursor: 'pointer' }}
            >{likeAction ? <>favorite</> : <>favorite_border</>}</i><span className="left" style={{marginLeft:'-.7rem'}}>{likes}</span><br />
               
            </div>
        )

    }

}

export default Like
