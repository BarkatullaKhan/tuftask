import dayjs from "dayjs";
import "./Dashboard.css";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import useBanner from "../../fetcher";

function Dashboard() {
  // const [bannerData, setBannerData] = useState([]);
  const { data, isLoading, isError } = useBanner();
  const navigate = useNavigate();

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
    }).then((res) => {
      console.log(res);
      if (res.status === 200) {
        navigate("/")
      }
    });
  };
  const [checked, setChecked] = useState(
    isLoading === true
      ? false
      : isError === true
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
        Show Banner? OFF
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
          name="showBanner"
        />{" "}
        ON
        <br />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
        </LocalizationProvider>
        <br />
        <TextField
          id="outlined-multiline-static"
          label="Banner Description"
          name="bannerDescription"
          variant="outlined"
          multiline
          defaultValue={data[0]?.description}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Banner Link"
          variant="outlined"
          name="link"
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
