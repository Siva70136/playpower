import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { LuLogOut } from "react-icons/lu";
import { ToastContainer, toast } from 'react-toastify';
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import './index.css'

const Home = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [marks, setMarks] = useState('');
  const [id, setId] = useState('');
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate('');

  const url = `https://playpower-m3kw.onrender.com/assignments`;
  const token = Cookies.get("token");


  useEffect(() => {
    if (token === undefined || token === null) {
      navigate('/login');
    } else {
      getData();
    }

  }, [])

  const add = async (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'token': token,
      },
      body: JSON.stringify({
        title,
        description: desc,
        marks
      })
    }

    try {
      const res = await fetch(url, options);

      if (res.ok) {
        const data = await res.json();
        //console.log(data);
        setTitle("");
        setDesc("");
        setMarks("");
        toast.success(`${data.msg}`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        getData();

      }

    }
    catch {
      console.log("Error");
    }
  }

  const getData = async () => {
    const options = {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        'token': token,
      },
    }

    try {
      const res = await fetch(url, options);
      if (res.ok) {
        const data = await res.json();
        //console.log(data);
        setAssignments(data);
      }
    }
    catch {
      console.log("error");
    }
  }

  const remove = async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        'Content-Type': "application/json",
        'token': token,
      }
    }
    //console.log(options);
    try {
      const res = await fetch(`${url}\\${id}`, options);
      if (res.ok) {
        const data = await res.json();
        toast.success(`${data.msg}`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        getData();
      }
    }
    catch {
      console.log("error");
    }
  }
  const update = async (item) => {

    const options = {
      method: "PUT",
      headers: {
        'Content-Type': "application/json",
        'token': token,
      },
      body: JSON.stringify(item)
    }
    //console.log(options);
    try {
      const res = await fetch(`${url}\\${item.id}`, options);
      if (res.ok) {
        const data = await res.json();
        setTitle('');
        setDesc('');
        setMarks('');
        toast.success(`${data.msg}`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        getData();
      }
      else {
        const data = await res.json();
        toast.error(`${data.msg}`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
    catch {
      console.log("error");
    }
  }

  const onEdit = (each) => {
    //console.log(todo);
    setId(each.id);
    setTitle(each.title);
    setMarks(each.marks);
    setDesc(each.description);
  }
  const onUpdate = () => {
    update({
      id,
      title,
      marks,
      description: desc,
    })
  }

  const logout = () => {
    Cookies.remove('token');
    navigate('/login');
  }

  return (
    <div className="home-container">
      <div className="create-task-heading">
        <h1 className="task-heading">Create Assignment</h1>
        <LuLogOut className='delete-icon logout' onClick={logout} />
      </div>
      <input type="text" id="todoUserInput" className="user-input" value={title} placeholder="Title" onChange={(e) => { setTitle(e.target.value) }} />
      <input type="textarea" className="user-input" value={desc} placeholder="Description" onChange={(e) => { setDesc(e.target.value) }} />
      <input type="text" className="user-input" value={marks} placeholder="Marks" onChange={(e) => { setMarks(e.target.value) }} />
      <div>
        <button className="button1" id="addTodoButton" onClick={add}>Add</button>
        <button className="button1 update" onClick={onUpdate}>Update</button>

      </div>
      <div className='assignment-container'>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Marks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              assignments.map((each, index) => (
                <tr key={each.id}>
                  <td><span className="val">{index + 1}</span></td>
                  <td><span className="val-title">{each.title}</span></td>
                  <td><span className="val-desc">{each.description}</span></td>
                  <td><span className="val">{each.marks}</span></td>
                  <td className='delete-icon-container'>       
                      <MdOutlineEdit className='delete-icon edit' onClick={() => { onEdit(each) }} />
                      <MdDeleteOutline className='delete-icon del' onClick={() => { remove(each.id) }} />
                    
                  </td>
                </tr>
              ))

            }
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>

  );
}

export default Home;
