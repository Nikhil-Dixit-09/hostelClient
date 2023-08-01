import React, { useState } from 'react'
import './Complain_ui.css'
import dropDown from '../../assets/icons8-down-button-48.png'
import tickbox from '../../assets/icons8-tick-box-24.png'
import edit from '../../assets/icons8-edit-24.png'
import { upgradeStatus } from '../../actions/user'
import { useDispatch } from 'react-redux'
import { deleteComplain } from '../../actions/user'
import { useSelector } from 'react-redux'
import ComplainEdit from '../ComplainEdit/ComplainEdit'
import Modal from 'react-modal';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
Modal.setAppElement('#root');
const Complain_ui = (props) => {
    console.log(props.complain);
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    const dispatch = useDispatch();
    let arr = ["NA", "Pending", "In Progress", "Resolved"]
    const [show, setShow] = useState(false);
    const myUser = useSelector((state) => state.user);
    console.log(myUser);
    const handleShow = () => {
        setShow(true);
    }
    const handleNotShow = () => {
        setShow(false);
    }
    const handleResolved = () => {
        console.log(props.complain._id);
        dispatch(deleteComplain(props.complain._id));
    }
    const handleStatus = () => {
        let obj = {};
        obj.complain = props.complain._id;
        dispatch(upgradeStatus(obj));
    }
    return (
        <div className='complain'>
            <div className='short'>
                <div className='short_hostel'>
                    Hostel: {props.complain.hostel}
                </div>
                <div className='short_roomNumber'>
                    Room Number: {props.complain.roomNumber}
                </div>
                <div className='short_status'>
                    Status: {arr[props.complain.status]}
                </div>
                <div className='short_genre'>
                    Genre: {props.complain.genre}
                </div>
                {
                    myUser?.data?.isStudent === true &&
                    <div className='resolved'>
                        <button className='noborder' onClick={openModal}>


                            <div className='resolved'>
                                <div className='margin'>
                                    Edit
                                </div>
                                <div>
                                    <img src={edit} alt="error" />
                                </div>
                            </div>


                        </button>


                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="Complaint Form"
                        >

                            <ComplainEdit existing={props.complain} />

                            <div className='modalCenter'>
                                <button className='closeModal' onClick={closeModal}>close</button>
                            </div>

                        </Modal>
                    </div>
                }
                {
                    myUser?.data?.isStudent === true &&
                    <div>
                        <button className='noborder' onClick={handleResolved}>
                            <div className='resolved'>

                                <div>
                                    Resolved
                                </div>
                                <div>
                                    <img src={tickbox} alt="error" />
                                </div>
                            </div>
                        </button>
                    </div>
                }
                {
                    myUser?.data?.isStudent === false &&
                    <div>
                        <button onClick={handleStatus}>
                            <div className='resolved'>
                                <div>
                                    Upgrade Status
                                </div>
                                <div>
                                    <img src={tickbox} alt="error" />
                                </div>
                            </div>
                        </button>
                    </div>
                }
                <div className='short_drop'>
                    {
                        show === false &&
                        <div className='short_dropDown'>
                            <img className='dropDown' src={dropDown} alt="" onClick={handleShow} />
                        </div>
                    }
                    {
                        show === true &&
                        <div className='short_dropUp'>
                            <img className='rotate dropUp' src={dropDown} alt="" onClick={handleNotShow} />
                        </div>
                    }

                </div>

            </div>

            {
                show &&
                <div className='long'>
                    <div className='long_description'>
                        Description: {props.complain.description}
                    </div>
                    {
                        props.complain.img.length !== 0 &&
                        <div className='long_image'>
                            <img className='longSrc' src={props.complain.img} alt='error' />
                        </div>
                    }

                </div>

            }
        </div>
    )
}

export default Complain_ui
