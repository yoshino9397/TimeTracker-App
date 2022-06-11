import "./featured.scss";
import "./progressBar.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";

const Featured = () => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Time</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={82} text={"82%"} strokeWidth={5} />
        </div>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">CLOCKED HOURS</div>
            <div className="itemResult">
              <div className="resultAmount">0:00:00</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">BILLABLE HOURS</div>
            <div className="itemResult">
              <div className="resultAmount">0:00:00</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">AMOUNT</div>
            <div className="itemResult">
              <div className="resultAmount">0:00:00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
