import React from "react";
import "./App.css";
import { useEffect, useRef, useState } from "react";

import toPX from "to-px";
import Draggable from "react-draggable";

const PAGE_HEIGHT = toPX("100vh");
const PAGE_WIDTH = toPX("100vw");

function useMountEffect(effect) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useEffect(effect, []);
}

function Button({ text, onClick }) {
  return (
    <div className="pixel" onClick={() => onClick()}>
      <p>{text}</p>
    </div>
  );
}

function Window(props) {
  const [closed, setClosed] = useState(false);

  const { title, actions, message, media, key, hidden } = props;

  const colors = ["#f4a61a", "#e93940", "#0170b5", "#79bd3f"];

  const ref = useRef(null);

  const [posX, setPosX] = useState(0);

  const [color] = useState(colors[Math.floor(Math.random() * colors.length)]);
  const color2 = colors[Math.floor(Math.random() * colors.length)];

  useEffect(() => {
    setPosX(Math.random() * (PAGE_WIDTH - ref.current?.clientWidth));
  }, [ref.current?.clientWidth]);

  const [posY, setPosY] = useState(0);

  useEffect(() => {
    setPosY(Math.random() * (PAGE_HEIGHT - ref.current?.clientHeight));
  }, [ref.current?.clientWidth]);

  const [zIndex, setZIndex] = useState(10);

  return closed ? null : (
    <Draggable
      onMouseDown={() => setZIndex(Date.now() - 1665313953561)}
      key={key}
    >
      <div
        className="Window"
        onClick={() => setZIndex(Date.now() - 1665313953561)}
        ref={ref}
        style={{
          position: "absolute",
          height: hidden ? 0 : "auto",
          overflow: "hidden",
          top: posY,
          left: posX,
          backgroundColor: color,
          display: "flex",
          flexDirection: "column",
          padding: "4px 8px",
          zIndex,
          boxShadow:
            `${Math.random() > 0.5 ? "-" : ""}${Math.round(Math.random() * 5) + 2
            }px ${Math.random() > 0.5 ? "-" : ""}${Math.round(Math.random() * 5) + 2
            }px ` + color2,
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ fontSize: 50 }}>{title}</div>
          <div style={{ marginLeft: "auto" }}>
            <Button text="X" onClick={() => setClosed(true)} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            padding: "16px 32px",
            fontSize: 35,
            maxWidth: 500,
            textAlign: "center",
          }}
        >
          <div>{media}</div>
          <div>{message}</div>
        </div>
        {actions && (
          <div style={{ marginLeft: "auto" }}>
            {actions.map((action) => (
              <Button
                key={action}
                text={action}
                onClick={() => setClosed(true)}
                style={{ marginLeft: 4 }}
              />
            ))}
          </div>
        )}
      </div>
    </Draggable>
  );
}

function App() {
  const coreWindows = [
    <Window
      key={0}
      message="Are you free on Saturday 22nd October at 7:30pm?"
      actions={["YES", "OKAY"]}
    />,
    <Window
      key={1}
      title={"CONGRATULATIONS"}
      message={`YOU are the ${1000000 + Math.round(Math.random() * 1000000)
        }th person invited to this PARTY`}
      actions={["CLAIM YOUR PRIZE(S)"]}
    />,
    <Window
      key={2}
      title={"Local parties in your area"}
      message={`We found ONE good party in London (UK). Located at Flat 8 35 Hawley Road`}
      actions={["I AM INTERESTED"]}
    />,
  ];
  const extraWindows = [
    <Window
      key={4}
      title={"YOU NEED FLASH FOR THIS PARTY"}
      message={`Click here to install ADOBE FlASH`}
      actions={["INSTALL", "DOWNLOAD"]}
    />,
    <Window
      key={5}
      title={"WARNING"}
      message={`Your computer may be infected with a nasty party virus!! To remove it RSVP to tech support ASAP`}
      actions={["CALL NOW"]}
    />,
    <Window
      key={7}
      title={"Doctors HATE him"}
      message={`One weird trick to a big party in 2 weeks`}
      actions={["TELL ME THE TRICK"]}
    />,
  ];

  const [windows] = useState(coreWindows.reverse());

  const [showVideo, setShowVideo] = useState(false);

  const [moreWindows, setMoreWindows] = useState([]);

  const videoRef = useRef();

  const ref = useRef();

  useMountEffect(() => {
    const addWindow = () => {
      if (!document.hasFocus()) return;
      setShowVideo(true);
      if (videoRef.current) {
        videoRef.current.play();
      }

      const randomWindow =
        Math.random() > 0.5
          ? coreWindows[Math.floor(Math.random() * coreWindows.length)]
          : extraWindows[Math.floor(Math.random() * extraWindows.length)];
      setMoreWindows([...moreWindows, randomWindow]);
    };
    setInterval(() => addWindow(), 5000);
    if (videoRef.current) {
      videoRef.current.play();
    }
  });

  return (
    <div className="App" style={{ height: "100vh", width: "100vw" }} ref={ref}>
      <Window
        hidden={!showVideo}
        key={6}
        media={
          <video width="320" height="240" ref={videoRef}>
            <source src="/sb.mp4" type="video/mp4" />
          </video>
        }
      />
      {windows}
      {moreWindows}
    </div>
  );
}

export default App;
