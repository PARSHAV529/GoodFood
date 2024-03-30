import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddIcon from '@mui/icons-material/Add';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PositionedMenuAdmin from "./PositionedMenuAdmin";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { user } from "../store/userInfo/userSlice";

const addToDatabase = async (formdata) => {


  try {

   
    // console.log(formdata.name);
    const res= await axios.post('https://goodfood-909g.onrender.com/api/add-menuItems',formdata)
        // console.log(res.data)

  } catch (error) {
    console.error(error)
  }



};

const AddItem = forwardRef(function AddItem({ onclick,email }, ref) {
  
  // console.log(email)
  let dialog = useRef();
  let nameRef = useRef();
  let adjectiveRef = useRef();
  let priceRef = useRef();
  let imgref = useRef();
  let [image,setImage]=useState("");
  const [selectedMenu, setSelectedMenu] = useState({});

  useImperativeHandle(ref, () => {
    return {
      open() {
        
        // Reset form fields when dialog is opened
        nameRef.current.value = "";
        adjectiveRef.current.value = "";
        priceRef.current.value = "";
        imgref.current.value = "";
        // Clear file input
         setImage(null)
        // imageRef.current.value = "";
        setSelectedMenu();
        dialog.current.showModal(); // Reset selected menu
      }
    };
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const jsonString = JSON.stringify(selectedMenu);
    const formdata = new FormData();
    formdata.append('name', nameRef.current.value);
    formdata.append('adjective', adjectiveRef.current.value);
    formdata.append('price', priceRef.current.value);
    formdata.append('imageUrl', image[0]);
    formdata.append('category', jsonString);
    formdata.append('provideremail', email);
    console.log(selectedMenu)
    console.log(jsonString)

    

   
    // addToDatabase(formData.name, formData.adjective, formData.price,  selectedMenu, formData.imageUrl)
    await addToDatabase(formdata)
      dialog.current.close();
    
    // console.log(selectedMenu);
    // console.log(formData);
    // Call onSubmit function if provided
    if (onclick) {
      
      onclick(nameRef.current.value);
    }
  };

  return (
    <dialog ref={dialog} className="rounded-md ">
      <Container component="main" maxWidth="xs">
        <Box
          sx={{  
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Add new item
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              inputRef={nameRef}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="adjective"
              label="Adjective"
              type="string"
              id="adjective"
              autoComplete="current-adjective"
              inputRef={adjectiveRef}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="price"
              label="Price"
              type="number"
              id="price"
              autoComplete="current-price"
              inputRef={priceRef}
            />
            <div className="flex items-center justify-between gap-4 ">
              <PositionedMenuAdmin  onSelect={setSelectedMenu} />
              <input
                margin="normal"
                required
                ref={imgref}
                className="w-2/3"
                name="imageUrl"
                type="file"
                id="image"
                autoComplete="current-image"
               onChange={(e)=> setImage(e.target.files)}
              />
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={()=>{
                dialog.current.close()
              }}
              sx={{ mt: 3, mb: 2,backgroundColor: "#AA2B1D"} }
            >
              <AddIcon className="scale-90"/>
              Add
            </Button>
          </Box>
        </Box>
      </Container>
    </dialog>
  );
});

export default AddItem;
