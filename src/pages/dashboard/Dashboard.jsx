// import DateTimePicker from "../../components/datepicket/DateTimePicker";
import dayjs from "dayjs";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import "./Dashboard.css";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Switch from "@mui/material/Switch";
import useSWR from "swr";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import useBanner from "../../fetcher";

// const fetcher = (...args) => fetch(...args).then((res) => res.json());
// const useBanner = () => {
//   // const response = await fetch(`http://localhost:8080/bannerData`);
//   const { data, error, isLoading } = useSWR(
//     process.env.REACT_APP_API_BANNER_DATA,
//     fetcher
//   );

//   return {
//     data: data,
//     isLoading,
//     isError: error,
//   };
// };
function Dashboard() {
  // const [bannerData, setBannerData] = useState([]);
  const { data, isLoading, isError } = useBanner();

  const saveData = (event) => {
    event.preventDefault();
    fetch(process.env.REACT_APP_API_SAVE_DATA, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        showTill: event.target.endTime.value,
        description: event.target.bannerDescription.value,
        showBanner: event.target.showBanner.checked,
        link: event.target.link.value,
      }),
    });
  };
  const [checked, setChecked] = useState(
    isLoading === true
      ? false
      : isError == true
      ? false
      : data[0]?.showBanner === 1
      ? true
      : false
  );
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }
  if (isError) {
    return <div>Error while loading</div>;
  }
  return (
    <div className="_dashboardControlsContainer">
    
      <h3>Set Values for Banner</h3>
      <form className="_controlForm" onSubmit={saveData}>
        Show Banner? ON
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
          name="showBanner"
        />{" "}
        OFF
        <br />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {/* <label htmlFor="">Select the time</label> */}
          {/* <h2>Select time</h2> */}
          <DateTimePicker
            label="Banner visible till "
            name="endTime"
            defaultValue={dayjs(new Date(data[0]?.showTill))}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
          />
          {/* <MobileDateTimePicker defaultValue={dayjs(Date.now())} /> */}
        </LocalizationProvider>
        <br />
        <TextField
          id="outlined-multiline-static"
          label="Banner Description"
          name="bannerDescription"
          variant="outlined"
          multiline
          //   rows={4}
          defaultValue={data[0]?.description}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Banner Link"
          variant="outlined"
          name="link"
          // multiline
          defaultValue={data[0]?.link}
        />
        <br />
        <div className="_buttonContainer">
          <Button variant="contained" type="submit">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Dashboard;
