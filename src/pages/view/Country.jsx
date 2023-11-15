import React, { useContext, useEffect, useRef, useState } from 'react';
import "../../stylesheet/Form.css";
import { MyContext } from "../../App";
import {fetchreq} from '../../Helper/fetch'
import { useNavigate } from 'react-router-dom';
const style = {display:'flex',flexDirection:'column',border:'2px solid Orange',padding:'10px',margin:'10px',justifyContent:"space-between"};

function Country() {
    // Define state variables for Name and Price
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [coutries,setCountries]=useState(null);
    const [isAdd,setIsAdd]=useState(false);
    const [Submit,setSubmit]=useState("Submit");
    const [edit,setEdit]=useState(false);
    const [cid,setCid]=useState(null);
    const {isLogin}=useContext(MyContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit("Submiting...")
        // Create an object with the name and price
        const countryData = {
            name,
            price: parseFloat(price), // Parse price as a float
        };
        const dt = await fetchreq("POST","addCountry",countryData);
        if(dt){
            setName('');
            setPrice('');
            alert("Added Successfully")
        }else{
            alert("something Went Wrong...");
        }
        console.log(countryData);
        setSubmit("Submit");
        // Clear the input fields after submission
    }
    const cancelEdit = async ()=>{
        setEdit(false);
        setIsAdd(false);
        setPrice(null);
        setName("");
        setCid(null);
    }
    const loadCountries = async ()=>{
        const dt = await fetchreq("GET","getCounty");
        dt?setCountries(dt.result):setCountries([]);
    }
    const ref = useRef();
    const submitEdit = async (e)=>{
        e.preventDefault();
        setSubmit("Submiting...");
        if(cid){
            if(price!="" && name!=""){
                const countryData = {
                    name,
                    price: parseFloat(price),
                    cid, // Parse price as a float
                };
                const dt = await fetchreq('POST',"editCountry",countryData);
                if(dt){
                    loadCountries();
                    cancelEdit();
                    alert("Edit Completed...");
                }else{
                    alert("Some thing Went Wrong...");
                }
            }else{
                alert("invalid Data");
            }
        }else{
            alert("Try Again");
            cancelEdit();
        }
        setSubmit("Submit");
    }
    const handleEdit =async (c)=>{
        setIsAdd(true);
        setEdit(true);
        setPrice(c.Price);
        setName(c.Name);
        setCid(c.Cno);
        ref.current = document.getElementById("addForm");
        ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        });
    }
    const nav = useNavigate();
    useEffect(()=>{
        if(!isLogin){
            nav("/");
        }else{
            loadCountries();
        }
    },[])
    return (
        <div style={{overflowY:'scroll',height:"100dvh"}}>
            <h1 id="addForm" style={{textAlign:'center'}}>Manage Countries</h1>
            {!edit && <button className='btn btn-b' onClick={()=>setIsAdd(!isAdd)}>{!isAdd?"Add Country":"Hide Form"} </button>}
            {edit && <button className='btn btn-b' onClick={cancelEdit}>Cancel Edit</button>}
            {isAdd && <form  onSubmit={edit?submitEdit:handleSubmit}>
                    {edit ? <p>Edit Mode</p>: <p>Add Country</p> }
                     <input
                        type="text"
                        placeholder='Enter Country Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)} // Update the 'name' state
                    /><br /> 
                    <input
                        type="number"
                        placeholder='Enter Price in dollars'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)} // Update the 'price' state
                    /><br />
                    <button type='submit'>{Submit}</button>
            </form>}
            <h2>Countries</h2>
            {coutries && coutries.length!=0 && coutries.map((c)=>{
                return <div style={style}>
                    <p>Name: {c.Name}</p>
                    <p>Price: {c.Price}</p>
                    <button onClick={()=>handleEdit(c)}>Edit</button>
                </div>
            })}
            {!coutries && <p>Loading...</p> }
            {coutries && coutries.length==0 && <p>No Data Found</p> }
        </div>
    )
}

export default Country;
