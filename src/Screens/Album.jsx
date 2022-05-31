import { Avatar, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../index.css";

import ytch from "yt-channel-info";

function Album() {
  const { id } = useParams();

  const [data, setData] = useState([]);
  //  const [avatars, setAvatars] = useState([]);

  const getData = async () => {
    const res = await fetch(
      `https://cors-woof.herokuapp.com/https://woof-ytm.herokuapp.com/api/get/album/${id}`
    );
    const data = await res.json();
    setData(data);
    console.log(data);
    return data;
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getChannelInfo = async (id) => {
    const payload = {
      channelId: id, // Required
      channelIdType: 0,
    };

    ytch
      .getChannelInfo(payload)
      .then((response) => {
        if (!response.alertMessage) {
          console.log(response);
        } else {
          console.log("Channel could not be found.");
          // throw response.alertMessage
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className='album-head'>
        {data && data.thumbnails && (
          <img class='album-cover' alt='cover' src={data.thumbnails[3].url} />
        )}
        <>
          <div className='album-info'>
            <Typography.Title className='title' level={1}>
              {data && data.name}
            </Typography.Title>
            <div className='album-sub'>
              <Typography.Text className='artists-name-album'>
                {data && data.artists && (
                  <>
                    <Avatar.Group size='small'>
                      {data.artists.map((artist) => (
                        <>
                          <p>{getChannelInfo(artist.artistId)}</p>
                          <Avatar
                            key={artist.id}
                            src={getChannelInfo(
                              artist.artistId.authorThumbnails[0].url
                            )}
                            alt={artist.name}
                          />
                        </>
                      ))}
                    </Avatar.Group>

                    {data.artists.map((artist) => artist.name).join(", ")}
                  </>
                )}
                {data && data.year && ` - ${data.year}`}
              </Typography.Text>
            </div>
          </div>
        </>
      </div>
    </>
  );
}

export default Album;
