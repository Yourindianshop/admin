import React, { useContext, useEffect, useState } from "react";
// import "../../stylesheet/EditLandingPage.css"; // Import your CSS file for styling
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {fetchreq, uploadImageAws} from '../../Helper/fetch'
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
function EditLandingPage() {
  const url = process.env.REACT_APP_URL;
  const [curPic,setCurPic]=useState(null);
  const [onchanges,setOnchanges]=useState(true);
  const [cud,setCud]=useState(0);
  const [file,setFile]=useState(null);
  const [run,setRun]=useState(false);
  const {isLogin}=useContext(MyContext);

  const onDelete = (i)=>{
    let dt = curPic;
    dt.splice(i,1);
    setCurPic(dt);
    setOnchanges(false);
    setTimeout(() => {
      setOnchanges(true);
      setCud(cud+1);
    }, 500);
  }
  const moverUp = (i)=>{
    let dt = curPic;
    let temp = dt[i];
    dt[i]=dt[i-1];
    dt[i-1]=temp;
    setCurPic(dt);
    setOnchanges(false);
    setTimeout(() => {
      setOnchanges(true);
      setCud(cud+1);
    }, 500);
  }
  const moverDown = (i)=>{
    let dt = curPic;
    let temp = dt[i];
    dt[i]=dt[i+1];
    dt[i+1]=temp;
    setCurPic(dt);
    setOnchanges(false);
    setTimeout(() => {
      setOnchanges(true);
      setCud(cud+1);
    }, 500);
  }
  const saveChanges = async ()=>{
    const ud = JSON.stringify(curPic);
    console.log(ud);
    const dt = await fetchreq("POST","updateLp",{ud});
    if(dt){
      alert("Saved Successfully");
      setCud(0);
    }else{
      alert("something Went Wrong");
    }
  } 
  const loadphoto = async ()=>{
    const dt = await fetchreq("GET","lp",{});
    if(dt){
      let re = await JSON.parse(dt.result[0].Details);
      setCurPic(re);
    }else{setCud([])}
  }
  const addfile = async (e)=>{
    e.preventDefault();
    if(file?.size /1024 > 1000){
      alert("image size must be less than 1 MB");
    }
    else if(!run){
      setRun(true);
      const url =await uploadImageAws(file.name,file);
      if(url){
        let tmp = JSON.stringify([...curPic,url]);
        setCurPic([...curPic,url]);
        const dt = await fetchreq("POST","updateLp",{ud:tmp});
        dt?alert("Uplaad Successfully"): alert("Something Went Wrong...")
        setFile(null);
      }else{
        alert("something Went Wrong...");
      }
      setRun(false);
    }else{
      alert("please Wait...");
    }
    
  }
 

  const nav = useNavigate();
  useEffect(()=>{
    if(!isLogin){
      nav("/");
    }else{
      loadphoto()
    }
  },[])
  return (
    <div id="dash-pa" className="edit-landing-page-form">
      <h2>
        <span id="blue">Edit </span>
        <span id="org">Landing Page</span>
      </h2>
      <form onSubmit={addfile}>
        <input required  type="file" onChange={(e)=>setFile(e.target.files[0])} />
        <button className="btn-b" type="submit">{run?"Submiting...":"Add Image"}</button>
      </form>
      <div >
        <h1>Current Pictures</h1>
        { cud>0 && <button className="btn btn-b" onClick={saveChanges}>Save Changes</button>}
      </div>
      {onchanges && curPic && curPic.map((p,index)=>{
        return <div style={{marginTop:'20px'}} >
            <h1>{index+1}.</h1>
            <div className="btn-b" style={{padding:'5px',display:'flex',justifyContent:'space-evenly',alignItems:'center'}}>
              <img  width="70%" src={`${url}/${p}`} alt="" />
              <div >
                {index!=0 && <button className="btn btn-g" onClick={()=>moverUp(index)}>Move Up <ArrowUpwardIcon/></button>}
                {index!=curPic.length-1 && <button className="btn btn-g" onClick={()=>moverDown(index)}>Move Down <ArrowDownwardIcon/></button>}
              </div>
            </div>
            <div style={{display:"flex"}}>
              <button className="btn btn-r" onClick={()=>onDelete(index)}>Delete</button>
            </div>
        </div> 
      })}
      {!curPic && <>Loading...</>}
      {curPic && curPic.length==0 &&  <>No data Found</>}
    </div>
  );
}

export default EditLandingPage;
// {/* <form onSubmit={handleSubmitSliderPosters}>
//       {/* Slider Posters Information */}
//       <div className="form-group">
//         <label>Slider Posters Images:</label>
//         <ul>
//           {landingPageInfo.sliderPostersImgFiles.map((imageFile, index) => (
//             <li key={index}>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) =>
//                   handleUpdateImageSliderPosters(index, e.target.files[0])
//                 }
//               />
//               {/* <button
//                 type="button"
//                 className="btn btn-o"
//                 onClick={() => handleRemoveImageSliderPosters(index)}
//               >
//                 Remove
//               </button> */}
//             </li>
//           ))}
//         </ul>
//         {/* {landingPageInfo.sliderPostersImgFiles.length < 5 && (
//           <button
//             type="button"
//             className="btn btn-o"
//             onClick={handleAddImageSliderPosters}
//           >
//             Add Image
//           </button>
//         )} */}
//       </div>

//       {/* Submit Button for Slider Posters */}
//       <div className="form-group">
//         <button className="btn btn-b" type="submit">
//           Save Slider Posters
//         </button>
//       </div>
//     </form> */}
// // State variables to store form data
// const [landingPageInfo, setLandingPageInfo] = useState({
//   sliderPostersImgFiles: [],
//   brands: [],
// });

// // Handle form submissions for slider posters
// const handleSubmitSliderPosters = (e) => {
//   e.preventDefault();
//   // Process and send slider posters form data to the server or admin
//   // ...
// };

// // Handle adding an image file to the slider posters list
// const handleAddImageSliderPosters = () => {
//   const updatedImageFiles = [...landingPageInfo.sliderPostersImgFiles, null];
//   setLandingPageInfo({
//     ...landingPageInfo,
//     sliderPostersImgFiles: updatedImageFiles,
//   });
// };

// // Handle updating an image file in the slider posters list
// const handleUpdateImageSliderPosters = (index, file) => {
//   const updatedImageFiles = [...landingPageInfo.sliderPostersImgFiles];
//   updatedImageFiles[index] = file;
//   setLandingPageInfo({
//     ...landingPageInfo,
//     sliderPostersImgFiles: updatedImageFiles,
//   });
// };

// // Handle removing an image file from the slider posters list
// const handleRemoveImageSliderPosters = (index) => {
//   const updatedImageFiles = [...landingPageInfo.sliderPostersImgFiles];
//   updatedImageFiles.splice(index, 1);
//   setLandingPageInfo({
//     ...landingPageInfo,
//     sliderPostersImgFiles: updatedImageFiles,
//   });
// };

// // Handle form submissions for brands
// const handleSubmitBrands = (e) => {
//   e.preventDefault();
//   // Process and send brands form data to the server or admin
//   // ...
// };

// // Handle adding a brand to the list
// const handleAddBrand = () => {
//   const updatedBrands = [
//     ...landingPageInfo.brands,
//     { brandLogoImg: "", brandName: "", hyperlink: "" },
//   ];
//   setLandingPageInfo({ ...landingPageInfo, brands: updatedBrands });
// };

// // Handle updating a brand in the list
// const handleUpdateBrand = (index, field, value) => {
//   const updatedBrands = [...landingPageInfo.brands];
//   updatedBrands[index][field] = value;
//   setLandingPageInfo({ ...landingPageInfo, brands: updatedBrands });
// };

// // Handle removing a brand from the list
// const handleRemoveBrand = (index) => {
//   const updatedBrands = [...landingPageInfo.brands];
//   updatedBrands.splice(index, 1);
//   setLandingPageInfo({ ...landingPageInfo, brands: updatedBrands });
// };