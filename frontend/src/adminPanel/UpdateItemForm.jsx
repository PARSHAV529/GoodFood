import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddIcon from '@mui/icons-material/Add';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { GrUpdate } from "react-icons/gr";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import axios from "axios";

const addToDatabase = async (formdata) => {


  try {

    
    console.log(formdata.name);
    const res= await axios.post('https://goodfood-909g.onrender.com/api/add-menuItems',formdata)
        console.log(res.data)

  } catch (error) {
    console.error(error)
  }



};


const UpdateItem = forwardRef(function UpdateItem({ onclick }, ref) {
    const [defcat,setdefcat]=useState("")
  let dialog = useRef();
  let nameRef = useRef();
  let adjectiveRef = useRef();
  let priceRef = useRef();
  let [image,setImage]=useState("");
  let [nameToUpdate,setnameToUpdate]=useState("");
  const [selectedMenu, setSelectedMenu] = useState({});


  
const handleUpdate = async (formdata) => {
    try {
      const response = await axios.put(`https://goodfood-909g.onrender.com/api/update-menuItem/${nameToUpdate}`, {
        name: nameRef.current.value,
        adjective: adjectiveRef.current.value,
        price: priceRef.current.value,
        // imageUrl is excluded here
      });
      if (response.status === 200) {
        // Handle success
        console.log('Menu item updated successfully');
      } else {
        // Handle error
        console.error('Failed to update menu item');
      }
    } catch (error) {
      console.error('Error updating menu item:', error);
    }
  };

  useImperativeHandle(ref, () => {
    return {
      open(product) {
        dialog.current.showModal();
        // Reset form fields when dialog is opened
        nameRef.current.value = product.name;
        adjectiveRef.current.value = product.adjective;
        priceRef.current.value = product.price;
        // Clear file input
        setImage(product.imageUrl)
        setnameToUpdate(product.name)
        // imageRef.current.value = "";
        let cat = product.category.name
        console.log(cat)
        setdefcat(cat)
        console.log(defcat)

        setSelectedMenu(product.category.name); // Reset selected menu
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
    // formdata.append('imageUrl', image[0]);
    // formdata.append('category', jsonString);
    console.log(selectedMenu)
    console.log(jsonString)

    
  



   
    await handleUpdate(formdata)
      dialog.current.close();
  
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
            Update item
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
              {/* <PositionedMenuAdmin onSelect={setSelectedMenu} defcategory={defcat} /> */}
              {/* <input
                margin="normal"
                required
                className="w-2/3"
                name="imageUrl"
                type="file"
                id="image"
                autoComplete="current-image"
               onChange={(e)=> setImage(e.target.files)}
              /> */}
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
              <GrUpdate className="scale-90 mr-2"/>
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </dialog>
  );
});

export default UpdateItem;
