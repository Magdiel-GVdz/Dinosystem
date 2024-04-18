import { LocalizationProvider } from "@mui/x-date-pickers";
import AdapterDateFns from "@mui/x-date-pickers/AdapterDateFns";  
import { Muipicker } from "./Muipicker";

export default function DateTime() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      
      <div> 
      <Muipicker />
      </div>
      
    </LocalizationProvider>
  );
}