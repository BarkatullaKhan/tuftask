import { Link } from "react-router-dom";
import "./Banner.css";
import Countdown from "react-countdown";
import useBanner from "../fetcher";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Banner() {
  const { data, isLoading, isError } = useBanner();
  const handleCountdownCompletes = () => {
    document.getElementById("banner").innerHTML =
      "<h2 style={{margin: '20px'}}>Offer ended</h2>";
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
  const targetDate = data?.length > 0 ? new Date(data[0].showTill) : Date.now();
  const renderer = ({ days, hours, minutes, seconds }) => (
    <div>
      <p>
        Offer ends in : {days}d:{hours}h:{minutes}m:{seconds}s
      </p>
    </div>
  );
  return (
    <div id="banner">
      {data[0]?.showBanner ? (
        <Link to={data[0]?.link}>
          <div className="_bannerContainer">
            <img
              src={"/images/banner.jpg"}
              alt="Banner"
              className="_bannerImage"
            />
            <div className="_bannerTexts">
              <h3>{data[0]?.description}</h3>

              <div>
                <Countdown
                  onComplete={handleCountdownCompletes}
                  date={targetDate}
                  renderer={renderer}
                />
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <h3>You have opted for not to show banner</h3>
      )}
    </div>
  );
}

export default Banner;
