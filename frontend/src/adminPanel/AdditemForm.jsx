import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddIcon from '@mui/icons-material/Add';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PositionedMenuAdmin from "./PositionedMenuAdmin";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import axios from "axios";

const addToDatabase = async (formdata) => {
 
//   const menu ={
//     name: name,
//     adjective: adj,
//     price: price,
//     category: category, 
//     imageUrl: "https://example.com/cheeseburger.jpg"
// }

  try {

    // const res = await fetch(`http://localhost:8080/api/add-menuItems`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formdata)

    // })
    console.log(formdata.name);
    const res= await axios.post('https://goodfood-909g.onrender.com/api/add-menuItems',formdata)
        console.log(res.data)

  } catch (error) {
    console.error(error)
  }



};

const AddItem = forwardRef(function AddItem({ onclick }, ref) {
  let dialog = useRef();
  let nameRef = useRef();
  let adjectiveRef = useRef();
  let priceRef = useRef();
  let [image,setImage]=useState("");
  const [selectedMenu, setSelectedMenu] = useState({});

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
        // Reset form fields when dialog is opened
        nameRef.current.value = "";
        adjectiveRef.current.value = "";
        priceRef.current.value = "";
        // Clear file input
        setImage("")
        // imageRef.current.value = "";
        setSelectedMenu({}); // Reset selected menu
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
    console.log(selectedMenu)
    console.log(jsonString)

    
  


    // const formData = {
    //   name: nameRef.current.value,
    //   adjective: adjectiveRef.current.value,
    //   price: priceRef.current.value,
    //   category:selectedMenu,
    //   imageUrl:""
    // };

   
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
              <PositionedMenuAdmin onSelect={setSelectedMenu} />
              <input
                margin="normal"
                required
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
