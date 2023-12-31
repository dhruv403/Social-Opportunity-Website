import React,{useState,useEffect} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'
const CretePost = ()=>{
    const history = useHistory()
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    const [type,setType] = useState("")
    const [location,setLocation] = useState("")
    useEffect(()=>{
       if(url){
        fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                body,
                pic:url,
                type,
                location
            })
        }).then(res=>res.json())
        .then(data=>{
    
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:"Created post Successfully",classes:"#43a047 green darken-1"})
               history.push('/')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    },[url])
  
   const postDetails = ()=>{
       const data = new FormData()
       data.append("file",image)
       data.append("upload_preset","internshipNow")
       data.append("cloud_name","dglqdiry1")
       fetch("https://api.cloudinary.com/v1_1/dglqdiry1/image/upload",{
           method:"post",
           body:data
       })
       .then(res=>res.json())
       .then(data=>{
            console.log(data)
            setUrl(data.url)
       })
       .catch(err=>{
           console.log(err)
       })
       
   }
 

   return(
       <div className="card input-filed" id="gradient"
       style={{
           margin:"30px auto",
           maxWidth:"500px",
           padding:"20px",
           textAlign:"center",
           backgroundColor: "#fccc80"
       }}
       >
           <input 
           type="text"
            placeholder="Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
           <input
            type="text"
             placeholder="Body"
             value={body}
            onChange={(e)=>setBody(e.target.value)}
             />
              <input
            type="text"
             placeholder="Location"
             value={location}
            onChange={(e)=>setLocation(e.target.value)}
             />
              <input
            type="text"
             placeholder="Type/Sector"
             value={type}
            onChange={(e)=>setType(e.target.value)}
             />
           <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
                <span>Uplaod Relavent Image</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={()=>postDetails()}
            
            >
                Create Opportunity
            </button>

       </div>
   )
}


export default CretePost;