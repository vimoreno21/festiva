import React, { useState, useEffect } from "react";

const AudioPlayer = ({ src, isPlaying, shouldLoop }) => {
  const [audio] = useState(new Audio(src));

  useEffect(() => {

    audio.loop = shouldLoop;

    // Play or pause the audio based on the isPlaying prop
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }

  }, [isPlaying, shouldLoop, audio, src]);

  return null;
};

export default AudioPlayer;
