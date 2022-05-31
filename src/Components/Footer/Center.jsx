import {
  CaretRightFilled,
  PauseOutlined,
  StepBackwardFilled,
  StepForwardFilled,
} from "@ant-design/icons";
import { Button, Slider } from "antd";
import "./index.css";
import store from "../../store";
import { useEffect, useState } from "react";

function secondsToHms(d) {
  d = Number(d);

  const minutes = Math.floor(d / 60);

  const seconds = Math.floor(d % 60);

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }
  const result = `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
  return result;
}

function Center() {
  const [isPlaying, setIsPlaying] = store.useState("isPlaying");
  const [queue] = store.useState("queue");
  const [trackId] = store.useState("trackId");
  const [playerRef] = store.useState("playerRef");
  const [progress] = store.useState("progress");
  const [currentTime] = store.useState("currentTime");
  const [currentTimeDisplay, setCurrentTimeDisplay] = useState("");

  useEffect(() => {
    setCurrentTimeDisplay(secondsToHms(currentTime));
  }, [currentTime]);

  return (
    <div className='center-component'>
      <div className='top-ctr'>
        <div />
        <Button
          onClick={() => {
            let nextTrackId = trackId - 1;
            if (queue) {
              if (nextTrackId < 0) {
                nextTrackId = queue.length + nextTrackId;
              }
              store.setState("trackId", nextTrackId);
              store.setState("playingTrack", queue[nextTrackId]);
            }
          }}
          shape='circle'
          icon={<StepBackwardFilled />}
        />
        <Button
          shape='circle'
          size='large'
          icon={isPlaying ? <PauseOutlined /> : <CaretRightFilled />}
          onClick={() => setIsPlaying(!isPlaying)}
        />
        <Button
          onClick={() => {
            let nextTrackId = trackId + 1;
            if (queue.length > trackId) {
              store.setState("trackId", nextTrackId);
              store.setState("playingTrack", queue[nextTrackId]);
            }
          }}
          shape='circle'
          icon={<StepForwardFilled />}
        />
        <div />
      </div>
      <div className='btm-ctr'>
        <div className='btm-ctr-i'>
          <div className='time'>{currentTimeDisplay}</div>
          <Slider
            tooltipVisible={false}
            min={0}
            max={100}
            value={progress * 100}
            step={0.1}
            onChange={(value) => {
              playerRef.current.seekTo(value / 100);
            }}
          />
          {playerRef.current && (
            <div className='time'>
              <>{secondsToHms(playerRef.current.getDuration())}</>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Center;
