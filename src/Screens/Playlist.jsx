import { Divider, List, Typography } from "antd";
import "../index.css";

function Playlist() {
  return (
    <>
      <div style={{ overflow: "auto" }} className='album-list'>
        <div className='album-head'>
          {/*
          image here.
          class album-cover
          alt cover
          */}
          <>
            <div className='album-info'>
              <Typography.Title className='title' level={1}>
                {/* data */}
              </Typography.Title>
              <Typography.Text
                style={{
                  margin: 0,
                }}
                className='artists-name-album'
              >
                {/* 
                  track count
                */}
              </Typography.Text>
            </div>

            {
              // track list
            }
            <div>
              <Divider
                style={{
                  margin: "1% 2.5%",
                }}
              />
              <List
                style={{
                  height: "fit-content",
                  margintop: "1rem",
                  overflow: "none",
                  padding: "1% 2.5%",
                }}
                // dataSource={data}
                itemLayout='horizontal'
                // renderItem={(item) => (
                //  <Dropdown
                //     trigger={["contextMenu"]}
                //     overlay={
                //       <Menu>
                //         <Menu.Item
                //           icon={
                //             <PlayCircleFilled
                //               onClick={() => {
                //                 playFromAlbum(data.songs, item, index);
                //               }}
                //             />
                //           }
                //         >
                //           Play
                //         </Menu.Item>
                //         <Menu.Item
                //           onClick={() => {
                //             queueFromAlbum(data.songs, item);
                //           }}
                //           icon={<PlusOutlined />}
                //         >
                //           Add To Queue
                //         </Menu.Item>
                //       </Menu>
                //     }
                //   >
                //     <List.Item
                //       className='search-item'
                //       onClick={() => {
                //         playFromAlbum(data.songs, item, index);
                //       }}
                //       actions={[
                //         <Button
                //           shape='circle'
                //           icon={<PlayArrowSharp />}
                //           type='text'
                //           onClick={() => {
                //             playFromAlbum(data.songs, item, index);
                //           }}
                //         />,
                //       ]}
                //     >
                //       <List.Item.Meta
                //         avatar={
                //           <Avatar
                //             style={{
                //               height: 60,
                //               width: 60,
                //             }}
                //             shape='square'
                //             src={item.thumbnails[0].url}
                //           />
                //         }
                //         title={item.name}
                //         description={item.artists
                //           .map((artist) => artist.name)
                //           .join(", ")}
                //       />
                //     </List.Item>
                //   </Dropdown>
                // )}
              ></List>
            </div>
          </>
        </div>
      </div>
    </>
  );
}

export default Playlist;
