import { Typography } from "antd";

function Playlist() {
  return (
    <>
      <div
        style={{
          textAlign: "center",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography.Title level={1}>Work In Progress</Typography.Title>
        <Typography.Paragraph>
          This feature is still under development. Check in later! Meanwhile,
          maybe consider{" "}
          <a href='https://www.buymeacoffee.com/acutewoof'>supporting me</a> to
          make more FOSS apps?
        </Typography.Paragraph>
      </div>
    </>
  );
}

export default Playlist;
