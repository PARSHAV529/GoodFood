import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios';
import AdminHome from './AdminHome'
import {
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  Container,

} from "@mui/material";
import { useSelector } from 'react-redux';
import { user } from '../store/userInfo/userSlice';

const addToDatabase = async (newcategory,email) => {
  // Create a new user instance
  let data = {
    name: newcategory,
    provideremail:email
  }

  try {

    const res = await fetch(`https://goodfood-909g.onrender.com/api/add-categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
      

    })

  } catch (error) {
    console.error(error)
  }



};
const deleteCategory = async (name) => {
  try {
    await axios.delete(`https://goodfood-909g.onrender.com/api/delete-categories/${name}`);
    // setDeletedCategory(name); 
  } catch (error) {
    console.error('Error deleting category:', error);
  }
};



const editCategoryName = async (id, newName) => {
  try {
    
    await axios.put(`https://goodfood-909g.onrender.com/api/edit-categories/${id}`, { name: newName });
    setEditedCategory(id); // Trigger useEffect to refetch categories
  } catch (error) {
    console.error('Error updating category name:', error);
  }
};


export const CategoriesAdmin = () => {
  const userinfo = useSelector(user)
  console.log(userinfo.email)

  const [inputVal, setInputVal] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdited, setIsEdited] = useState(false);
  const [editedId, setEditedId] = useState(null);
  const [fetch, setFetch] = useState("")
  const [isLoading, setIsLoading] = useState(true)

 

  useEffect(() => {
     const  fetchCategories = async () => {
      try {
        const response = await axios.get(`https://goodfood-909g.onrender.com/api/categories?provideremail=${userinfo.email}`); // Assuming your backend server is running on the same host
        setTodos(response.data);
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();

  }, [fetch]);

  useEffect(() => {
    setFetch("")
    // setIsLoading(false)
  
  }, [todos])

  
  
  





  const onChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleClick = () => {
    if (!isEdited) {
      // setIsLoading(true)

      addToDatabase(inputVal,userinfo.email);
      setFetch("added");
    } else {
      // addToDatabase(inputVal);
      editCategoryName(editedId,inputVal);
      setFetch("edited");
    }
    // setFetch("");
    setInputVal("");
    setIsEdited(false);
  };



  const onDelete = (name) => {
    // const newTodos = todos.filter((todo) => todo.id !== id);
    // setTodos(newTodos);
    deleteCategory(name)
    setFetch("deleted")
    // setIsLoading(true)


  };

  const handleDone = (id) => {
    const updated = todos.map((todo) => {
      if (todo.id === id) {
        todo.isDone = !todo.isDone;
      }
      return todo;
    });
    setTodos(updated);
  };

  const handleEdit = (name,id) => {
    // const newTodos = todos.filter((todo) => todo._id !== id);
    // const editVal = todos.find((todo) => {todo._id === id });
    
   
    // console.log(editVal);

    setEditedId(id);
    setIsEdited(true);
  
    setInputVal(name);
    console.log(name);
    console.log(id);
    editCategoryName(editedId,inputVal);
    // setTodos(newTodos);
    // setIsLoading(true)
    
  };
  return (
    <>
      <AdminHome tab='categories' />{
     
isLoading ?  <div className="loader " />:
      <Container component="main" className='text-center w-[70%] '>
        <TextField
          variant="outlined"
          onChange={onChange}
          label="add new category"
          value={inputVal}
          className='w-[55%] mb-30 !border-[#AA2B1D]'
        />
        <Button
          size="large"
          variant={isEdited ? "outlined" : "contained"}


          style={{ backgroundColor: '#AA2B1D', color: 'white' }}

          onClick={handleClick}
          className='h-[3.438rem] w-[15%] mb-30'
          disabled={inputVal ? false : true}
        >
          {isEdited ? "Edit Category" : "Add Category"}
        </Button>
        <List>
          {todos.map((category) => {
            return (
              <>
                <ListItem divider="bool" className='!w-[70%] mx-auto flex my-2 border border-gray-300'>

                  <Typography
                    className='w-full'
                    style={{ color: todos.isDone ? "green" : "" }}
                    key={category._id}
                  >
                    {category.name}
                  </Typography>
                  <div className='!w-[100%] gap-5 flex justify-end'>
                    <Button
                      onClick={() => handleEdit(category.name,category._id)}
                      variant="contained"
                      className='ml-10'
                      style={{ backgroundColor: "#4caf50" }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => onDelete(category.name)}
                      color="error"
                      variant="contained"
                      className='ml-10'
                    >
                      delete
                    </Button>
                  </div>
                </ListItem>
              </>
            );
          })}
        </List>
      </Container>
}
    </>
  )
}
