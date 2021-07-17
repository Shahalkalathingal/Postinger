import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../../contexts/UserContext'
import url from '../../../serverUrl'
import Axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import Like from './Like'
import moment from 'moment'
import LoadContext from '../../../contexts/LoadContext'
function AllPosts() {

    const history = useHistory()

    const { userData } = useContext(UserContext)
    const { setLoad } = useContext(LoadContext)
    const [posts, setposts] = useState(false)

    useEffect(() => {
       
        const getAllPosts = async () => {
            try {
                const allPosts = await Axios.get(`${url}/post/getAll`)
                setposts(allPosts.data)
            } catch (error) {
                console.log(error);
                setposts(false)
            }

        

        }
        


        getAllPosts()

    }, [])





    if (posts) {
        setLoad(100)
       if(posts.length < 1){
           if(userData.user){

               return (
                <React.Fragment>
                <div className="center" style={{ marginTop: "5rem" }}>
                  <h5>No posts found</h5>
                  <br />
                  <Link to="/new" className="btn">
                    Upload
                  </Link>
                </div>
              </React.Fragment>
               )
           }else{
            return (
                <React.Fragment>
                <div className="center" style={{ marginTop: "5rem" }}>
                  <h5>No posts found</h5>
                  <br />
                  <Link to="/login" className="btn">
                    Login and upload
                  </Link>
                </div>
              </React.Fragment>
               )
           }
       }else{
        if (userData.user) {
            return (
                <div >

                    {posts.map(post => (
                        <>
                        {post.user.privacy === 0 && (
                            <div className="card home-card center">
                                <Link to={`/profile/${post.user._id}`}><img className="circle imghome" src={post.user.image} alt="avatar" /><h4 className="a card-text">{post.user.username}</h4></Link>
                                <div className="card-image">
                                    <span><img src={post.file} alt="Postimg" style={{ minHeight: '13rem', maxHeight: '46rem' }} /></span>
                                </div>
                                     <span  className="right"><strong style={{marginLeft:'-8rem'}}>{moment(post.createdAt).fromNow()}</strong></span>
                                <Like post postId={post._id} />
                                <div className="card-content">
                                    <div className="center">
                                        <span>{post.body}</span>
                                    </div>
                                    <br />
                                    <button className="btn waves-effect waves-light" onClick={() => history.push(`/post/${post._id}`)}>View Post</button>
                                </div>
                            </div>
                        )}
                        </>
                    ))}
                </div>
            )
        } else {
            setLoad(100)
            return (
                <div  >

                {posts.map(post => (

                    <>
                    {post.user.privacy === 0 && (

                        <div className="card home-card center">
                            <Link to={`/profile/${post.user._id}`}><img className="imghome" src={post.user.image} alt="avatar" /><h4 className="usernameonheader a">{post.user.username}</h4></Link>
                            <div className="card-image">
                                <span><img src={post.file} alt="Postimg" style={{ minHeight: '13rem', maxHeight: '31rem' }} /></span>
                            </div>
                                 <span style={{marginLeft:'-12rem'}} className="right"><strong>{moment(post.createdAt).fromNow()}</strong></span>
                            <Like post postId={post._id} />
                            <div className="card-content">
                                <div className="center">
                                    <span>{post.body}</span>
                                </div>
                                <br />
                                <button className="btn waves-effect waves-light" onClick={() => history.push(`/post/${post._id}`)}>View Post</button>
                            </div>
                        </div>
                    )}
                    </>
                ))}
            </div>
            )
        }
       }
    } else {
        setLoad(18)
        return (
            <div >
                <div className="hide-on-med-and-down preloader-wrapper big active" style={{ left: "40rem", top: '14rem' }}>

                    <div className="spinner-layer spinner-blue">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div>
                        <div className="gap-patch">
                            <div className="circle"></div>
                        </div>
                        <div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>

                    <div className="spinner-layer spinner-red">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div>
                        <div className="gap-patch">
                            <div className="circle"></div>
                        </div>
                        <div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>

                    <div className="spinner-layer spinner-yellow">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div>
                        <div className="gap-patch">
                            <div className="circle"></div>
                        </div>
                        <div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>

                    <div className="spinner-layer spinner-green">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div>
                        <div className="gap-patch">
                            <div className="circle"></div>
                        </div>
                        <div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>
                </div>

                {/** On Meduim */}
                <div className="hide-on-large-only hide-on-small-only  preloader-wrapper big active" style={{ left: "26.3rem", top: '14rem' }}>

                    <div className="spinner-layer spinner-blue">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div>
                        <div className="gap-patch">
                            <div className="circle"></div>
                        </div>
                        <div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>

                    <div className="spinner-layer spinner-red">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div>
                        <div className="gap-patch">
                            <div className="circle"></div>
                        </div>
                        <div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>

                    <div className="spinner-layer spinner-yellow">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div>
                        <div className="gap-patch">
                            <div className="circle"></div>
                        </div>
                        <div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>

                    <div className="spinner-layer spinner-green">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div>
                        <div className="gap-patch">
                            <div className="circle"></div>
                        </div>
                        <div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>
                </div>


                {/** On Small */}
                <div className="hide-on-med-and-up preloader-wrapper big active" style={{ left: "9.1rem", top: "14rem" }}>

                    <div className="spinner-layer spinner-blue">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div>
                        <div className="gap-patch">
                            <div className="circle"></div>
                        </div>
                        <div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>

                    <div className="spinner-layer spinner-red">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div>
                        <div className="gap-patch">
                            <div className="circle"></div>
                        </div>
                        <div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>

                    <div className="spinner-layer spinner-yellow">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div>
                        <div className="gap-patch">
                            <div className="circle"></div>
                        </div>
                        <div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>

                    <div className="spinner-layer spinner-green">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div>
                        <div className="gap-patch">
                            <div className="circle"></div>
                        </div>
                        <div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }


}

export default AllPosts
