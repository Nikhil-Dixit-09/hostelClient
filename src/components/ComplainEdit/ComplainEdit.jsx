import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './ComplainEdit.css'
import tick from '../../assets/icons8-tick-30.png'
import { editComplaint } from '../../actions/user';
const ComplainEdit = (props) => {
    const dispatch=useDispatch();
    const [file,setFile]=useState();
    const [genre,setGenre]=useState(props.existing.genre);
    const [img,setImg]=useState(props.existing.img);
    const [hostel,setHostel]=useState(props.existing.hostel);
    const [roomNumber,setRoom]=useState(props.existing.roomNumber);
    const [description,setDescription]=useState(props.existing.description);
    const [edited,setEdited]=useState(false);
    const handleImageEdit=(e)=>{
        const data=new FileReader();
      data.addEventListener('load',()=>{
        setImg(data.result);
      });
      data.readAsDataURL(e.target.files[0]);
    }
    const handleEdit=(e)=>{
        e.preventDefault();
        let formData={};
        formData.file=file;
        formData.genre=genre;
        formData.hostel=hostel;
        formData.roomNumber=roomNumber;
        formData.description=description;
        formData.img=img;
        formData.id=props.existing._id;
        dispatch(editComplaint(formData));
        setEdited(true);
    }
    console.log(props.existing);
  return (
    <div>
        <form className='complain_form' onSubmit={handleEdit}>
        <div className='complain_genre'>

            Work related to:
            <select className='complain_select' value={genre} onChange={(e)=>setGenre(e.target.value)}>
                <option value="Carpentary" className='complain_option'>Carpentary</option>
                <option value="Electricity"className='complain_option'>Electricity</option>
                <option value="Cleaning"className='complain_option'>Cleaning</option>
                <option value="Miscellaneous"className='complain_option'>Miscellaneous</option>
            </select>
        </div>

        <div className='complain_hostel'>
            Hostel:
            <select className='complain_select' value={hostel} onChange={(e)=>setHostel(e.target.value)}>
                <option value="BH-1" className='complain_option'>BH-1</option>
                <option value="BH-2" className='complain_option'>BH-2</option>
                <option value="BH-3" className='complain_option'>BH-3</option>
                <option value="GH-1" className='complain_option'>GH-1</option>
            </select>
        </div>

        <div className='complain_roomNumber'>
            Room Number:
            <input className='complain_input' value={roomNumber} type='text' onChange={(e)=>setRoom(e.target.value)}></input>
        </div>

        <div className='complain_description'>
            Description:
            <textarea id="w3review" rows="4" cols="50" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
        </div>
        <div className='complain_image'>
            Image:
            <input className='complain_photo' type='file'  accept="image/*" onChange={handleImageEdit}></input>
        </div>
        <button className='complain_submit' type='submit'>Edit Complain</button>
        
      </form>
      {
        edited===true&&
        <div className='tick'>
            Edited: 
            <img src={tick} alt="" />
        </div>
      }
    </div>
  )
}

export default ComplainEdit
