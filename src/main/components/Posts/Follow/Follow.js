import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../../contexts/UserContext'
import url from '../../../serverUrl'
import M from 'materialize-css'
function Follow({ userTo, userFrom ,showInProfile,profile}) {

    const [followers, setfollowers] = useState(0)
    const [followed, setFollowed] = useState(false)
    const history = useHistory()
    const { userData } = useContext(UserContext)

    useEffect(() => {

        const GetFollowers = async () => {
            try {
                const getCount = await axios.post(`${url}/follow/count`, { userTo: userTo })
                    setfollowers(getCount.data.followers.length)
                    const followed = await axios.post(`${url}/follow/followed`, { userTo, userFrom: userFrom })
                    setFollowed(followed.data.followed)
                
            } catch (error) {
                console.log(error);
            }

        }
        GetFollowers()
    }, [])

    const onFollow = async () => {
    
        if(userData.user._id !== userTo){
            if (followed) {
                

            
                const unfollow = await axios.post(`${url}/follow/unFollow`, { userTo }, {
                    headers: { 'SHAHAL-USER_TOKEN': localStorage.getItem('USER_TOKEN') }
                })
    
                if (unfollow.data.success) {
                    setFollowed(false)
                    setfollowers(followers - 1)
                }
    
    
            } else {
    
                const follow = await axios.post(`${url}/follow/follow`, { userTo }, {
                    headers: { 'SHAHAL-USER_TOKEN': localStorage.getItem('USER_TOKEN') }
                })
    
                if (follow.data.success) {
                    setFollowed(true)
                    setfollowers(followers + 1)
    
                }
                
    
            }
        }else{
            return M.toast({html:"Shahal, This profile is yours you can't follow yourself",classes:'red'})
        }
        }
        if(showInProfile){
            return(
                <React.Fragment>
                    {followers} Followers
                </React.Fragment>
            )
        }
        if (userData.user) {
            return (
                <div>
                    {profile ?
                    <>
                    {userTo === userData.user._id 
                    ? <>This is you</>
                :
                    <button onClick={onFollow} className={followed ? 'btn red waves-effect waves-light' : "btn waves-effect waves-light"}>
                    {followed ? 'Followed' : 'Follow'}
                </button>
                }
                </>
                :

                    <button onClick={onFollow} className={followed ? 'btn red waves-effect waves-light' : "btn waves-effect waves-light"}>
                        {followers} {followed ? 'Followed' : 'Follow'}
                    </button>
                }
                </div>
            )
        } else {
            return (
                <div>
                    {profile ?

                    <button onClick={()=>history.push('/login')} className={followed ? 'btn red waves-effect waves-light' : "btn waves-effect waves-light"}>
                    {followed ? 'Followed' : 'Follow'}
                </button>
                :

                    <button onClick={()=>history.push('/login')} className={followed ? 'btn red waves-effect waves-light' : "btn waves-effect waves-light"}>
                        {followers} {followed ? 'Followed' : 'Follow'}
                    </button>
                }
                </div>
            )
        }
    

    

}

export default Follow
