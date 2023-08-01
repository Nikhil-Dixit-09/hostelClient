import React from 'react'
import './Home.css'
import Appbar from '../Appbar/Appbar'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { verify } from '../../actions/auth'
import { getUser } from '../../actions/user'
import { getComplaints } from '../../actions/user'
import { getComplaintsFilter } from '../../actions/user'
import Complaint from '../Complaint/Complaint'
import Swal from 'sweetalert2'
import Complainui from '../Complain_ui/Complain_ui'
import ReactDOM from 'react-dom';
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
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  console.log(user);
  const [filter, setFilter] = useState({
    all: true,
    carpentary: false,
    miscellaneous: false,
    electricity: false,
    cleaning: false,
    pending: false,
    inProgress: false,
    resolved: false,
    bh1: false,
    bh2: false,
    bh3: false,
    gh1: false,
    gf: false,
    ff: false,
    sf: false,
    tf: false
  });

  const myUser = useSelector((state) => state.user);
  console.log(myUser);

  console.log(user?.token);
  useEffect(() => {
    if (user !== null) {
      dispatch(getUser(user?.result?.email));
    }
  }, [user]);
  const [show, setShow] = useState(0);
  useEffect(() => {
    if (user === null) {
      navigate('/auth');
    }
  }, [user]);


  const handleClick = () => {
    console.log('hii');
    dispatch(verify(user));
    setShow(1);

    Swal.fire(
      'Email sent',
      'Email sent successfully!!',
      'success'
    );

  }
  const reload = useSelector((state) => state.reload);
  useEffect(() => {
    if (reload === 1) {
      dispatch(getComplaintsFilter(filter));
    }
  }, [reload]);
  console.log(reload);
  useEffect(() => {
    if (user != null) {
      dispatch(getComplaints(user?.result?.email));
    }
  }, [user]);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  useEffect(() => {
    dispatch(getComplaints(user?.result?.email));
  }, [])
  let complaints = useSelector((state) => state.complain);
  console.log(complaints);

  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    dispatch(getComplaintsFilter(filter));
  }, [filter]);
  return (
    <div>
      <Appbar />
      {/* (!myUser?.data?.isVerified && myUser !== null && myUser?.data?.isStudent === true) */}
      {/* {
        (myUser !== null && myUser?.data?.isStudent === true) &&
        <div className='verify'>
          <div className='verifyBlock'>
            <div className='verifyText'>Please verify your email</div>
            <div className='verifyButtonContainer'>
              <button className='verifyButton' onClick={handleClick}>Verify</button>
            </div>
          </div>
          {
            show === 1 &&
            <div className='verifyReload'>
              reload after verification
            </div>
          }
        </div>
      } */}
      {
        ((myUser !== null) || myUser?.data?.isStudent === false) &&
        <div className='homeContainer'>
          <div className='categories'>
            Filters
            <div className='tag'>
              <div className='tagWord'>
                All
              </div>
              
              <input className='tagCheckbox' type="checkbox" defaultChecked onChange={(e) => setFilter({ ...filter, all: !filter.all })} />
            </div>
            <div className='genre'>

              <div className='tag'>
                <div className='tagWord'>
                Carpentary
                </div>
                
                <input className='tagCheckbox' type="checkbox" onChange={(e) => setFilter({ ...filter, carpentary: !filter.carpentary })} />
              </div>
              <div className='tag'>
                <div className='tagWord'>
                Electricity
                </div>
                
                <input className='tagCheckbox' type="checkbox" onChange={(e) => setFilter({ ...filter, electricity: !filter.electricity })} />
              </div>
              <div className='tag'>
                <div className='tagWord'>
                  Cleaning
                </div>
                
                <input className='tagCheckbox' type="checkbox" onChange={(e) => setFilter({ ...filter, cleaning: !filter.cleaning })} />
              </div>
              <div className='tag'>
                <div className='tagWord'>
                Miscellaneous
                </div>
                
                <input className='tagCheckbox' type="checkbox" onChange={(e) => setFilter({ ...filter, miscellaneous: !filter.miscellaneous })} />
              </div>
            </div>
            <div className='status'>
              <div className='tag'>
                <div className='tagWord'>
                Pending
                </div>
               
                <input className='tagCheckbox' type="checkbox" onChange={(e) => setFilter({ ...filter, pending: !filter.pending })} />
              </div>
              <div className='tag'>
                <div className='tagWord'>
                In Progress
                </div>
                
                <input className='tagCheckbox' type="checkbox" onChange={(e) => setFilter({ ...filter, inProgress: !filter.inProgress })} />
              </div>
              <div className='tag'>
                <div className='tagWord'>
                Resolved
                </div>
                
                <input className='tagCheckbox' type="checkbox" onChange={(e) => setFilter({ ...filter, resolved: !filter.resolved })} />
              </div>
            </div>
            {
              myUser?.data?.isStudent === false &&
              <div className='hostel'>
                <div className='tag'>
                  <div className='tagWord'>
                  BH-1
                  </div>
                  
                  <input className='tagCheckbox' type="checkbox" onChange={(e) => setFilter({ ...filter, bh1: !filter.bh1 })} />
                </div>
                <div className='tag'>
                <div className='tagWord'>
                  BH-2
                  </div>
                  <input className='tagCheckbox' type="checkbox" onChange={(e) => setFilter({ ...filter, bh2: !filter.bh2 })} />
                </div>
                <div className='tag'>
                <div className='tagWord'>
                  BH-3
                  </div>
                  
                  <input className='tagCheckbox' type="checkbox" onChange={(e) => setFilter({ ...filter, bh3: !filter.bh3 })} />
                </div>
                <div className='tag'>
                <div className='tagWord'>
                  GH-1
                  </div>
                  <input className='tagCheckbox' type="checkbox" onChange={(e) => setFilter({ ...filter, gh1: !filter.gh1 })} />
                </div>
              </div>
            }
            {
              myUser?.data?.isStudent === false &&
              <div className='floor'>
                <div className='tag'>
                  <div className='tagWord'>
                  Ground Floor
                  </div>
                  
                  <input className='tagCheckbox' type="checkbox" onChange={(e) => setFilter({ ...filter, gf: !filter.gf })} />
                </div>
                <div className='tag'>
                  <div className='tagWord'>
                  First Floor
                  </div>
                  <input className='tagCheckbox' type="checkbox" onChange={(e) => setFilter({ ...filter, ff: !filter.ff })} />
                </div>
                <div className='tag'>
                  <div className='tagWord'>
                  Second Floor
                  </div>
                  
                  <input className='tagCheckbox' type="checkbox" onChange={(e) => setFilter({ ...filter, sf: !filter.sf })} />
                </div>
                <div className='tag'>
                  <div className='tagWord'>
                  Third Floor
                  </div>
                  
                  <input className='tagCheckbox' type="checkbox" onChange={(e) => setFilter({ ...filter, tf: !filter.tf })} />
                </div>
              </div>
            }



          </div>
          <div className='right'>
            <div className='headingOfComplaints'>
              {
                myUser?.data?.isStudent === true &&
                <div>Your Complains</div>
              }
              {
                myUser?.data?.isStudent === false &&
                <div>Complains</div>
              }
            </div>
            <div>
              {

                myUser?.data?.isStudent === true &&
                <div>
                  <button className='openModal' onClick={openModal}>Add Complaint</button>
                  <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Complaint Form"
                  >
                    <Complaint />


                    <div className='modalCenter'>
                      <button className='closeModal' onClick={closeModal}>close</button>
                    </div>

                  </Modal>
                </div>

              }

              <div className='complaints_container'>
                {
                  complaints.map(function (complain, index) {
                    return <Complainui complain={complain} />;
                  })
                }
              </div>


            </div>
          </div>
        </div>
      }








    </div>
  )
}

export default Home