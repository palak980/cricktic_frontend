import React, { useEffect, useState } from "react";
import axios from "axios";
import '../Styles/socal.css'


function PostForm() {
  const [formData, setFormData] = useState({
    upload_video: "",
    upload_photo: "",
    upload_story: ""
  });
  const [showStepper, setShowStepper] = useState(false);
  const [posts, setPosts] = useState([]);
  const [id, setId] = useState('')
  const [actions, setActions] = useState([]);
  const [comment, setComment] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [socialData, setSocialData] = useState(null);
  const [socialId, setSocialId] = useState('');
  const [error,setError] = useState(' ')
  const [postError,setPostError]=useState(' ')

  useEffect(() => {
    fetchActions();
  }, []);
  useEffect(() => {
    if (socialId) {
      fetchSocialData();
    }
  }, [socialId]);

  const fetchSocialData = () => {
    axios.get(`http://your-api-url/social_media/get_put_patch_delete_socialByID/${socialId}/`)
      .then(response => {
        console.log(response)
        //console.log(response.AxiosError.message)
        setSocialData(response.data);
      })
      .catch(error => {
        console.log(error);
        setError(error.message);
      });
  };

  const updateSocialData = () => {
    const updatedData = { ...socialData, upload_story: 'Updated story' }; // Replace with the updated social data
    axios.put(`http://your-api-url/social_media/get_put_patch_delete_socialByID/${socialId}/`, updatedData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const patchSocialData = () => {
    const updatedData = { upload_story: 'Updated story' }; // Replace with the updated social data
    axios.patch(`http://your-api-url/social_media/get_put_patch_delete_socialByID/${socialId}/`, updatedData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteSocialData = () => {
    axios.delete(`http://your-api-url/social_media/get_put_patch_delete_socialByID/${socialId}/`)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleInputChange = (event) => {
    setSocialId(event.target.value);
    console.log('event.target.value')
  };


  const fetchActions = async () => {
    try {
      const response = await axios.get(
        "https://backend-ekms.onrender.com/social_media/get_post_action/"
      );
      setActions(response.data);
      // Calculate the total number of likes from the fetched actions
      const totalLikes = response.data.reduce(
        (count, action) => count + action.like,
        0
      );
      setLikeCount(totalLikes);
    } catch (error) {
      console.error("Error fetching actions:", error);
    }
  };

  const handleLikeClick = async () => {
    try {
      // Update the like count locally
      setLikeCount(likeCount + 1);

      // Send the like action to the server
      const response = await axios.post(
        "https://backend-ekms.onrender.com/social_media/get_post_action/",
        {
          comment: "comment", // Provide a default value for the comment field
          like: 1
        }
      );

      console.log("Action created:", response.data);
    } catch (error) {
      console.error("Error creating action:", error);
    }
  };



  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the comment to the server
      const response = await axios.post(
        "https://backend-ekms.onrender.com/social_media/get_post_action/",
        {
          comment: comment,
          like: 0
        }
      );

      console.log("Action created:", response.data);

      // Clear the comment input field
      setComment("");

      // Fetch the updated actions after successful submission
      fetchActions();
    } catch (error) {
      console.error("Error creating action:", error);
    }
  };


  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const handlePostBlogClick = () => {
    setShowStepper(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("upload_video", e.target.upload_video.files[0]);
      formData.append("upload_photo", e.target.upload_photo.files[0]);
      formData.append("upload_story", e.target.upload_story.value);

      const response = await axios.post(
        "https://backend-ekms.onrender.com/social_media/get_post_social/",
        formData
      );
      setPostError(response.data.message )
      console.log("Post created:", response.data);
      setId(response.data.id)
      console.log("ID=", response.data.id)
      setFormData({
        upload_video: "",
        upload_photo: "",
        upload_story: ""
      });
      setShowStepper(false);
      // Fetch updated posts after successful submission
      fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "https://backend-ekms.onrender.com/social_media/get_post_social/"
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <div className='container'>
        <div>
          <button className="btn btn-primary my-3" onClick={handleLikeClick}> Like ({likeCount}) </button> <hr />
        </div>
        <div className="">
          <p>Comment</p> <hr />
          {actions.map((action) => (
            <p key={action.id}>{action.comment}</p>
          ))}
          <form onSubmit={handleCommentSubmit} className="d-flex justify-content-center p-5">
            <input className="form-control fs-3" type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write a comment" />
            <button type="submit" className="btn btn-success mx-2">Submit</button>
          </form>
        </div>
      </div>
      <div className="container my-3 p-5">
        {!showStepper ? (<button className="btn btn-info" onClick={handlePostBlogClick}>Post Blog</button>) :
          (
            <form onSubmit={handleSubmit} >
              <input className="form-control my-3" type="file" name="upload_video" onChange={handleChange} required />
              <input className="form-control my-3" type="file" name="upload_photo" onChange={handleChange} required />
              <input className="form-control my-3" type="text" name="upload_story" onChange={handleChange} placeholder="Write Your Story..." required />
              <button type="submit" className="btn btn-success">Submit</button>
              <p className="text-danger">{postError}</p>
            </form>

          )}
        <h2 className="my-3">Social ID: {id}</h2>

        <div class="row justify-content-md-center">
          <div class="col col-lg-2">
            
          </div>
          <div class="col-md-auto">
            <center>
              <p className="text-danger">{error}</p>
            </center>
            <input type="number" className="form-control fs-4" value={socialId} onChange={handleInputChange} />
            <button onClick={fetchSocialData} className="btn btn-warning my-3 btn-lg">Fetch Social Data</button>
          </div>
          <div class="col col-lg-2">
           
          </div>
        </div>




        


        {socialData && (
          <div>
            <h2>Social Data Details</h2>
            <p>Upload Video: {socialData.upload_video}</p>
            <p>Upload Photo: {socialData.upload_photo}</p>
            <p>Upload Story: {socialData.upload_story}</p>
            {/* Add more social data details here */}
            <button onClick={updateSocialData}>Update</button>
            <button onClick={patchSocialData}>Patch</button>
            <button onClick={deleteSocialData}>Delete</button>
          </div>
        )}
      </div></>
  );
}




export default PostForm;
