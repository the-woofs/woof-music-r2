import store from "../store";

import {
  CaretRightFilled,
  PauseOutlined,
  StepBackwardFilled,
  StepForwardFilled,
} from "@ant-design/icons";
import { Button, Slider, Typography } from "antd";
import "../index.css";
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
    <div
      style={{
        width: "80vw",
      }}
      className='center-component-i'
    >
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

function Status() {
  const [track] = store.useState("playingTrack");

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: "75vh",
          width: "100vw",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateRows: "auto auto",
            placeContent: "center",
            placeItems: "center",
            gap: "16px",
            height: "65vh",
            width: "100vw",
          }}
        >
          {track.thumbnails && (
            <div className='meta'>
              <img
                alt='cover'
                src={track.thumbnails[track.thumbnails.length - 1].url}
                style={{ width: "60vw" }}
              />
              <div className='meta-i'>
                <Typography.Title level={3}>
                  {track.name && track.name}
                </Typography.Title>
                <Typography.Paragraph>
                  {track.artists && track.artists.map((a) => a.name)}
                </Typography.Paragraph>
              </div>
            </div>
          )}
          <Center />
        </div>
      </div>
    </>
  );
}

export default Status;
