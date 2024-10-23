import axios from 'axios';
import { Button, Nav, Navbar, NavbarBrand, NavItem, Table } from 'react-bootstrap';

import { useEffect, useState } from 'react';
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { CiFilter } from "react-icons/ci";
import { IoIosArrowRoundDown } from "react-icons/io";
import { VscQuestion } from "react-icons/vsc";
import { IoSearchOutline } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { FiArrowLeft } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";
import { IoReload } from "react-icons/io5";
import { TiPlus } from "react-icons/ti";
import Modal from 'react-bootstrap/Modal';

const Employee = () => {
  const [state, setState] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [memberToEdit,setMemberToEdit] = useState(null)
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [page, setPage] = useState(1)
  const [name, setName] = useState('');
  const [namelast, setNamelast] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhoto, setNewPhoto] = useState(null);


  //delete
  const handleShowModal = (id) => {
    setMemberToDelete(id);
    setShowModal(true);
  };

  //edit
  const handleShowModal1 = (emp) => {
    setMemberToEdit(emp);
    setName(emp.name);
    setNamelast(emp.namelast);
    setEmail(emp.email);
    setPhoto(emp.people);
    setShowModal1(true);
  };
  
  const handleCloseModal = () => setShowModal(false);
  const handleCloseModal1 =() => setShowModal1(false);
  const handleCloseCreateModal = () => {
    setNewName('');
    setNewLastName('');
    setNewEmail('');
    setNewPhoto(null);
    setShowCreateModal(false);
  };

  //show detail
  const handleRowClick = (person) => {
    setSelectedPerson(person);
  };






  useEffect(() => {

    const FetchData = async () => {
      try {
        const a = await axios.get('http://localhost:4000/api/v1')
        setState(a.data);
        console.log(a.data)

      }
      catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    FetchData();
  }, [])

  //delete
  const handleDelete = async (memberToDelete) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/${memberToDelete}`);
      setState(state.filter(person => person.id !== memberToDelete));
      setShowModal(false);
    } catch (error) {
      if (error.response) {
        console.error('Error deleting member:', error.response.data);
      } else {
        console.error('Error deleting member:', error.message);
      }
    }
  };
//edit
  const handleEdit = async () => {
    const updatedData = {
      name,
      namelast,
      email,
      people: photo
    };
    try {
      await axios.put(`http://localhost:4000/api/v1/${memberToEdit.id}`, updatedData);
      setState(state.map(person => (person.id === memberToEdit.id ? { ...person,...updatedData } : person)));
      setShowModal1(false);
    } catch (error) {
      console.error('Error updating member:', error);
    }
  };

  //ceate
  const handleCreate = async () => {
    const newEmployee = {
      name: newName,
      namelast: newLastName,
      email: newEmail,
      people: newPhoto
    };
    try {
      const response = await axios.post('http://localhost:4000/api/v1', newEmployee);
      setState([...state, response.data]);
      handleCloseCreateModal();
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };


//search
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  let filteredItems = state.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //pagination
  const totalPages = Math.ceil(filteredItems.length / 10);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  //filemanager
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  console.log(state)
  return (
    <>
      <Navbar>
        <NavbarBrand>Team members </NavbarBrand>
        <Nav className='w-50'>
          <NavItem className='border border-1 rounded-pill px-1 ' style={{ color: "darkViolet" }}>{state.length} users</NavItem>

        </Nav>
        <Nav >
          <NavItem className='mx-2 '><input type="text" placeholder='search' value={searchQuery} onChange={handleSearchChange} /><IoSearchOutline style={{ transform: "translateX(-120%)" }} /></NavItem>
          <NavItem className='mx-2'><CiFilter size="30" /></NavItem>
          <NavItem className='mx-2'><Button style={{ backgroundColor: "darkViolet" }} onClick={() => setShowCreateModal(true)}>+ Add Member</Button></NavItem>

        </Nav>
      </Navbar>
      <Table >
        <thead>
          <tr>
            <th >Name    <IoIosArrowRoundDown /></th>
            <th >Status <IoIosArrowRoundDown /></th>
            <th  >Role <VscQuestion className='text-secondary' /></th>
            <th >Email.Id</th>
            <th >Teams</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            filteredItems.slice(page * 10 - 10, page * 10).map((emp) => {
              return (

                <tr className='' key={emp.id} onClick={() => handleRowClick(emp)}>
                  <td style={{ verticalAlign: "center" }} >
                    <div className='d-flex'>
                      <img className='border rounded-5 ' src={'https://cdn2.iconfinder.com/data/icons/office-and-business-round-set-1/64/6-1024.png'} alt="img" height="45" width="45" />
                      <div className='d-flex flex-column'>
                        <small>{"  " + emp.name + " " }</small>
                        <small className='text-secondary'>{"@" + emp.name}</small>
                      </div>
                    </div>
                  </td>
                  <td style={{ verticalAlign: "center" }} >
                    <small className='border rounded-2 px-1'><GoDotFill color="#56C137" /> {emp.status}</small>
                  </td>
                  <td className='text-secondary' style={{ verticalAlign: "center" }} >
                    <small>{emp.role}</small>
                  </td>
                  <td className='text-secondary' style={{ verticalAlign: "center" }} >
                    <small>{emp.email}</small>
                  </td>
                  <td style={{ verticalAlign: "center" }} >
                    <div className='d-flex'>
                      <small className=' rounded-pill px-1 mx-1  ' style={{ color: "#724CCA", backgroundColor: "#F9F5FF", borderColor: "#EAD9FE", borderStyle: "solid", borderWidth: "2px" }} >Design</small>
                      <small className=' rounded-pill px-1 mx-1  ' style={{ color: "#326FD8", backgroundColor: "#EFF8FF", borderColor: "#C1E4FF", borderStyle: "solid", borderWidth: "2px" }}>Product</small>
                      <small className=' rounded-pill px-1 mx-1 ' style={{ color: "#3538CD", backgroundColor: "#EEF4FF", borderColor: "#D1DEFE", borderStyle: "solid", borderWidth: "2px" }}>Marketing</small>
                      <small className=' rounded-pill px-1 mx-1 ' style={{ color: "#344054", backgroundColor: "#F9FAFB", borderColor: "#EEF0F3", borderStyle: "solid", borderWidth: "2px" }}>+4</small>
                    </div>
                  </td>
                  <td style={{ verticalAlign: "center" }} >
                    <RiDeleteBinLine style={{ cursor: "pointer" }} className='mx-2 text-secondary' size="20" onClick={(e) => { e.stopPropagation(); handleShowModal(emp.id); }} />
                    <FiEdit2 style={{ cursor: "pointer" }} className="mx-2 text-secondary" size="20"  onClick={(e) => { e.stopPropagation(); handleShowModal1(emp); }}/></td>
                </tr>


              )
            })
          }

        </tbody>
      </Table>
      {/* Paginatuon */}
      <div className='w-100' style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <span
          style={{ cursor: "pointer" }}
          onClick={() => handlePageChange(page - 1)}
          className='border border-2 rounded-3 p-2'
        >
          <FiArrowLeft /> Previous
        </span>
        <span>
          {
            [...Array(totalPages)].map((_, i) => (
              <span
                key={i}
                style={{ cursor: "pointer", fontWeight: i + 1 === page ? "bold" : "" }}
                onClick={() => handlePageChange(i + 1)}
                className='mx-3'
              >
                {i + 1}
              </span>
            ))
          }
        </span>
        <span
          style={{ cursor: "pointer" }}
          onClick={() => handlePageChange(page + 1)}
          className='border border-2 rounded-3 p-2 px-3'
        >
          Next <FiArrowRight />
        </span>
      </div>
{/* 
          Show detail */}
      <Modal show={selectedPerson !== null} onHide={() => setSelectedPerson(null)} centered>
        <Modal.Header style={{ background: '#2A5B7E' }} closeButton>
          {selectedPerson && (
            <div className='d-flex flex-row justify-content-between align-items-start w-100'>
              <img
                src={selectedPerson.people || 'https://via.placeholder.com/150'}
                alt={selectedPerson.name}
                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '100%' }}
              />
              <section className='text-white px-4 py-2 rounded' style={{ flex: 1 }}>
                <p className='fw-bold mb-1'>{selectedPerson.name}</p>
                <section className='d-flex flex-row justify-content-between'>
                  <div className=' text-white px-2 py-1 rounded' style={{ flex: 0 }}>
                    <div className="text-white" style={{ fontSize: '0.7rem' }}>@{selectedPerson.name.split(' ')[0].toLowerCase()}</div>
                    <p className='mb-0'>User</p>
                  </div>
                  <div style={{ borderLeft: '2px solid black', height: '46px' }}></div>

                  <div className=' text-white px-2 py-1 rounded' style={{ flex: 1 }}>
                    <p className='mb-0'>Developer</p>
                    <p className='mb-0'>Role</p>
                  </div>
                </section>
              </section>
            </div>
          )}
        </Modal.Header>
        <Modal.Body>
          {selectedPerson && (
            <div>
              <p><strong>Date of Birth:</strong> {selectedPerson.birthdate || 'N/A'}</p>
              <p><strong>Nationality:</strong> {selectedPerson.nationality || 'N/A'}</p>
              <p><strong>Contact:</strong> {selectedPerson.contact || 'N/A'}</p>
              <p><strong>Email Address:</strong> {selectedPerson.email || 'N/A'}</p>
              <p><strong>Work Email Address:</strong> {selectedPerson.email || 'N/A'}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedPerson(null)}>
            Close
          </Button>
        </Modal.Footer>
        </Modal>
        {/* delete modal */}
      
      <Modal size='lg' show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body >
          <h5 className='fw-bold'>Delete Member Details</h5>
          <p>
            Are you sure you want to delete this Member details? This maction cannot be undone.
          </p>
          <Button className='' onClick={() => handleDelete(memberToDelete)} nhiy style={{ backgroundColor: "darkViolet" }}>Delete</Button>
        </Modal.Body>

      </Modal>

      {/* edit modal */}
      <Modal size='lg' show={showModal1} onHide={handleCloseModal1} centered>
        <Modal.Body>
          <h1>Edit Profile</h1>
          <span className='d-flex justify-content-center'>
          {photo && <img className="mx-auto" src={photo} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%' }} />}
          </span>
          <form>
          <div className='d-flex justify-content-center'>
          <div className='mb-3 m-2 fw-bold'>
              
              <button
                type="button"
                id='photo'
                // onChange={handleFileChange}
                
                className='form-control'
              >{<IoReload size='20'/> }  <b>Change Photo</b></button>
             
            </div>
            <div  className='mb-3 m-2 fw-bold'>
              <button type='button' id='photo'  className='form-control'><RiDeleteBinLine size='20'/> <b>Remove Photo</b></button>
            </div>
            </div>
            <div className='d-flex justify-content-center '>
            <div className='mb-3 mx-2 '>
              <label htmlFor='name' className='form-label fw-bold'>First Name</label>
              <input
                type="text"
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='form-control '
                placeholder='Name'
                style={{width:"350px",height:"45px",borderBottom:"1px solid black",borderRadius:"0"}}
              />
            </div>
          
            <div className='mb-3 mx-2 '>
              <label htmlFor='namelast' className='form-label fw-bold'>LastName</label>
              <input
                type="text"
                id='namelast'
                value={namelast}
                onChange={(e) => setNamelast(e.target.value)}
                className='form-control'
                placeholder='LastName'
                style={{width:"350px",height:"45px",borderBottom:"1px solid black",borderRadius:"0"}}
              />
            </div></div>
            <div className='d-flex justify-content-center '>
            <div className='mb-3 mx-2'>
              <label htmlFor='email' className='form-label fw-bold'>Email</label>
              <input
                type="email"
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='form-control'
                placeholder='Email'
                style={{width:"350px",height:"45px",borderBottom:"1px solid black",borderRadius:"0"}}
              />
            </div>
            <div className="mb-3 mx-2">
            <label htmlFor='role' className='form-label fw-bold'>Role</label>
              <input
                type="role"
                id='role'
                value={'Developer'}
               
                className='form-control'
                placeholder='Role'
                style={{width:"350px",height:"45px",borderBottom:"1px solid black",borderRadius:"0"}}
              />
            </div>
            </div>
            <div className='d-flex justify-content-end mx-3 mt-5 mb-2'>
          <Button  style={{backgroundColor:"white",color:"black" ,fontWeight:"bold",borderColor:"black"}}onClick={() => setShowModal1(false)}>Cancel</Button>
          <Button className='mx-2 px-3' onClick={handleEdit}  style={{ backgroundColor: "darkViolet",borderColor:"darkViolet",fontWeight:"bold" }}>Edit</Button>
          </div> </form>
        </Modal.Body>
      </Modal>

      {/* Create modal */}
      <Modal size='lg' show={showCreateModal} onHide={handleCloseCreateModal} centered>
        <Modal.Body>
          <h1>Add Member</h1>

          
          <span className='d-flex justify-content-center'>
          {newPhoto && <img src={newPhoto} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%' }} />}</span>
          <form>
          <div className='d-flex justify-content-center'>
            <div className='mb-3 m-2 fw-bold'>
             
              <button
                type="button"
                id='photo'
                onChange={(e) => handleFileChange(e, setNewPhoto)}
                className='form-control'
              ><TiPlus size='20'/>  <b>Add Photo</b></button>
              
            </div>
            <div  className='mb-3 m-2 fw-bold'>
              <button type='button' id='photo'  className='form-control'><RiDeleteBinLine size='20'/> <b>Remove Photo</b></button>
            </div>
            </div>
            <div className='d-flex justify-content-center '>
            <div className='mb-3 mx-2'>
              <label htmlFor='name' className='form-label'>First Name</label>
              <input
                type="text"
                id='name'
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className='form-control'
                placeholder='First Name'
                style={{width:"350px",height:"45px",borderBottom:"1px solid black",borderRadius:"0"}}
              />
            </div>
            <div className='mb-3 mx-2'>
              <label htmlFor='lastName' className='form-label'>Last Name</label>
              <input
                type="text"
                id='lastName'
                value={newLastName}
                onChange={(e) => setNewLastName(e.target.value)}
                className='form-control'
                placeholder='Last Name'
                style={{width:"350px",height:"45px",borderBottom:"1px solid black",borderRadius:"0"}}
              />
            </div></div>
            <div className='d-flex justify-content-center '>
            <div className='mb-3 mx-2'>
              <label htmlFor='email' className='form-label'>Email</label>
              <input
                type="email"
                id='email'
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className='form-control'
                placeholder='Email'
                style={{width:"350px",height:"45px",borderBottom:"1px solid black",borderRadius:"0"}}
              />
            </div>
            <div className="mb-3 mx-2">
            <label htmlFor='role' className='form-label fw-bold'>Role</label>
              <input
                type="role"
                id='role'
                value={'Developer'}
               
                className='form-control'
                placeholder='Role'
                style={{width:"350px",height:"45px",borderBottom:"1px solid black",borderRadius:"0"}}
              />
            </div>
            </div>
            <div className='d-flex justify-content-end mx-3 mt-5 mb-2'>
            <Button style={{backgroundColor:"white",color:"black" ,fontWeight:"bold",borderColor:"black"}} onClick={handleCloseCreateModal}>Cancel</Button>
            <Button  className='mx-2 px-3' onClick={handleCreate} style={{ backgroundColor: "darkViolet",borderColor:"darkViolet",fontWeight:"bold" }}>Create</Button>
          </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}
export default Employee;