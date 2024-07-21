import { Box } from "@chakra-ui/react";
import { TranslateSQL } from "./components/TranslateSQL";

function App() {
  return (
    <Box
      width={"100vw"}
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <TranslateSQL />
    </Box>
  );
}

export default App;
