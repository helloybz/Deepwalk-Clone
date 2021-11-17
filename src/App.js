
import { Box } from "@mui/material";
import { Header, Body } from "./components";


function App() {
  return (
    <div>
      <Header />
      <Box sx={{ marginTop: "6rem" }}>
        <Body />
      </Box>
    </div>
  );
}

export default App;
