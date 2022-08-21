import "./index.css";
import store from "../../store";

import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import { Slider } from "antd";
import Sync from "../Sync";

function Right() {
  const [volume, setVolume] = store.useState("volume");
  return (
    <div className="right-component">
      <div className="sync-status">
        <Sync />
      </div>
      <div className="volume">
        {volume === 0 && <VolumeMuteIcon />}
        {volume >= 5 && <VolumeUpIcon />}
        {volume < 5 && volume > 0 && <VolumeDownIcon />}
        <Slider
          tooltipVisible={false}
          min={0}
          max={10}
          value={volume}
          onChange={(value) => {
            setVolume(value);
          }}
        />
      </div>
    </div>
  );
}

export default Right;
