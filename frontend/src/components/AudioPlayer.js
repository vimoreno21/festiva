import React, { useState, useEffect } from "react";

const AudioPlayer = ({ src, isPlaying }) => {
  const [audio] = useState(new Audio(src));
  audio.loop = true;

  useEffect(() => {
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying, audio]);

  return null;
};

export default AudioPlayer;
