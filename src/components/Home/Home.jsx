import axios from "axios";
import React, { useEffect, useState } from "react";
import useGlobalContext from "../../Context/ContextData";
import $ from 'jquery'; 
import 'bootstrap';
function Home() {
  const { loginUser } = useGlobalContext();

  const token = localStorage.getItem("userToken");
  if (loginUser) {
    var userID = loginUser._id;
  }
  const [allNotes, setAllNotes] = useState([]);
  const [closeModal, setCloseModal] = useState(false);

  const [note, setNote] = useState({ title: "", desc: "", userID, token });
  const [idNote, seIdtNote] = useState('');

  async function fetchAllNotes() {
    const { data } = await axios.get('https://route-egypt-api.herokuapp.com/getUserNotes', {
      headers: {
        token,
         userID
      }
    })
    console.log(allNotes)
    setAllNotes(data.Notes)
  }
  async function getNote({ target }) {
  
    setNote( { ...note ,[target.name] : target.value});
  }
  async function AddNoteForm(e) {
    e.preventDefault();
    const { data } = await axios.post('https://route-egypt-api.herokuapp.com/addNote', note);
    if (data.message === "success") {
      
      fetchAllNotes();
      setCloseModal(true)
    }
  
  }
  function getID(userID){
    seIdtNote(userID)
  }
  async function deleteNote() {
    const { data } = await axios.delete('https://route-egypt-api.herokuapp.com/deleteNote',{
      data: {idNote, token}
    });
    if(data.message==='deleted'){
      //  $("#delete").modal("hide");

      fetchAllNotes();
      // setAllNotes(data)

    }

  }
  useEffect(() => {
    fetchAllNotes();
 
  }, []);
  return (
    <>
      {loginUser && (
        <>
          <div className="container text-white text-center">
            <div className="row">
              <div className="col-md-12 m-auto text-end">
              <button
                  type="button"
                  className='add p-2 btn'
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <i className="fas fa-plus-circle"></i> Add New
                </button>
              </div>
            </div>

            <div className="mt-3 mb-1">
              <h2>Welcome {loginUser.first_name} </h2>
              <p>What is your main focus for today?</p>
            </div>
           {!closeModal?<>
            <div
              id="exampleModal"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
              className={'modal fade'}
            >
              <form onSubmit={AddNoteForm} >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel"></h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <input
                        placeholder="Type Title"
                        name="title"
                        className="form-control"
                        type="text"
                        onChange={getNote}
                      />
                      <textarea
                        className="form-control my-2"
                        placeholder="Type your note"
                        name="desc"
                        id=""
                        cols="30"
                        rows="10"
                        onChange={getNote}
                      ></textarea>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="submit" className="btn btn-info">
                        <i className="fas fa-plus-circle"></i> Add Note
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
           </>:''}



          </div>





          <div className="container">
            <div className="row">
              <div className="col-md-4 my-4">
                {/* */}
                {allNotes &&
                  allNotes.map((note) => (
                    <>
                      <div className="note p-4" key={note._id}>
                        <h3 className="float-left">{note.title}</h3>
                        <i className="btn">
                          <i className="fas fa-edit float-right edit"></i>
                        </i>
                        <i  data-bs-toggle="modal" data-bs-target="#delete" type="button" className="btn" onClick={()=>getID(note._id)}>
                          {" "}
                          <i className="fas fa-trash-alt float-right px-3 del"></i>
                        </i>
                        <span className="clearfix"></span>
                        <p>{note.desc}</p>
                      </div>
                    </>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
          <div className="modal fade" id="delete" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Warning!!</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
Are you want to delete this note?      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={()=>deleteNote(idNote)}>delete</button>
      </div>
    </div>
  </div>
</div>


    </>
  );
}

export default Home;
