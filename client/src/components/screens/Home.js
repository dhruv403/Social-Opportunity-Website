import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'
const Home  = ()=>{
    const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
       fetch('/allpost',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           setData(result.posts)
       })
    },[])

    const likePost = (id)=>{
          fetch('/like',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer " + localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId:id
              })
          }).then(res=>res.json())
          .then(result=>{
                   //   console.log(result)
            const newData = data.map(item=>{
                if(item._id===result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
          }).catch(err=>{
              console.log(err)
          })
    }
    const unlikePost = (id)=>{
          fetch('/unlike',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId:id
              })
          }).then(res=>res.json())
          .then(result=>{
            //   console.log(result)
            const newData = data.map(item=>{
                if(item._id===result._id){
                    return result
                }else{
                    return item
                }
            })
            setData(newData)
          }).catch(err=>{
            console.log(err)
        })
    }

    const makeComment = (text,postId)=>{
          fetch('/comment',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId,
                  text
              })
          }).then(res=>res.json())
          .then(result=>{
              console.log(result)
              const newData = data.map(item=>{
                if(item._id===result._id){
                    return result
                }else{
                    return item
                }
             })
            setData(newData)
          }).catch(err=>{
              console.log(err)
          })
    }

    const deletePost = (postid)=>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
    }
   return (
    <>
    {data ?
    <>
    <div className="home">
           {
               data.map(item=>{
                   return(
                       <div className="card home-card #b3e5fc lighten-4" key={item._id} style={{backgroundColor: "#fccc80"}}>
                           <div className="name">
                            <h5 className="post-username  " style={{padding:"15px 15px"}}><Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id :"/profile"  }>{item.postedBy.name}</Link> {item.postedBy._id === state._id 
                            && <i className="material-icons" style={{
                                float:"right",
                                paddingRight: "15px"
                            }} 
                            onClick={()=>deletePost(item._id)}
                            >delete</i>

                            }</h5>
                            </div>
                            <hr/>
                            <div className="center">
                            <div className="card-image1">
                                <img src={item.photo} id="image" alt="card-pic"/>
                            </div>
                            
                           <p className="title1"> <span className="title">Name of the Opportunity:</span> <br/><u>{item.title}</u></p>
                           
                                <p className="title1">Brief Description: <br/> {item.body}</p>    
                                </div>
                                
                                
                              
                                
                                <hr/>
                                
                                <form className="comment" onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,item._id)
                                    e.target[0].value="" 
                                }}>
                                  <input type="text" id="comment" placeholder="Add a Comment" style={{backgroundColor:" #f0a62f"}}/>  
                                </form>
                                <div className="body">
                            <div className="card-content">
                            {item.likes.includes(state._id)
                            ? 
                              <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                              onClick={()=>{unlikePost(item._id)}}                              
                              >
                                Cancel Application
                              </button>
                            : 
                            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                            onClick={()=>{likePost(item._id)}}                             
                            >
                                Apply
                            </button>
                            }&nbsp;&nbsp; 
                                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                                onClick={()=>{
                                    {var cid = "comment";}
                                    {cid+=item._id}                                
                                    document.getElementById(cid).style.display = "block";
                                }}                              
                                >
                                View Comment
                                </button>    
                            <h6>{item.likes.length} Applications , {item.comments.length} Comments</h6>
                            <div id={"comment" + item._id} style={{display:"none"}}>
                                {
                                    item.comments.map(record=>{
                                        return(
                                        <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}: </span> {record.text}</h6>

                                        )
                                    })
                                }
                                </div>  
                           
                            </div>
                            </div> 
                        </div> 
                   )
               })
           }
          
          
       </div>
       {/* <div className="home">
       {
           <div className="card home-card">
              <h4> People You may Know :</h4>
               {
               data.map(item=>{
                   return(
                       <>
                    <h5 className="post-username" style={{padding:"5px"}}><Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id :"/profile"  }>{item.postedBy.name}</Link> {item.postedBy._id === state._id}</h5>
                    <br/>
                        </>
                )
               })
            }
           </div>
           }
       </div> */}
</>
   : <h2>loading...!</h2>}
       
   </>
   )
}


export default Home