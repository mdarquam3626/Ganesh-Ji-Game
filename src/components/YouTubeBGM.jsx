import React, { useEffect, useRef } from "react";

export function YouTubeBGM({ soundEnabled }) {
  const playerRef = useRef(null);
  const containerId = "ytBgAudioHolder";
  const videoId = "BHhQGRbLg_k";
  const startTime = 7;
  const targetVolume = 30;

  useEffect(() => {
    let trackerInterval;

    const setupPlayer = () => {
      if (playerRef.current) return;
      if (!window.YT || !window.YT.Player) return;

      try {
        const savedTime = parseFloat(sessionStorage.getItem("bg_music_time") || "0");
        const initialStart = savedTime && savedTime >= 7 ? savedTime : startTime;

        playerRef.current = new window.YT.Player(containerId, {
          height: "1",
          width: "1",
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            loop: 1,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            start: Math.floor(initialStart),
            playlist: videoId,
            playsinline: 1,
            enablejsapi: 1,
            origin: window.location.origin || window.location.href
          },
          events: {
            onReady: (e) => {
              try {
                e.target.setVolume(targetVolume);
                if (soundEnabled) {
                  e.target.playVideo();
                } else {
                  e.target.pauseVideo();
                }
              } catch (err) {
                console.warn("YouTube play error:", err);
              }

              trackerInterval = setInterval(() => {
                if (playerRef.current && typeof playerRef.current.getCurrentTime === "function") {
                  try {
                    const t = playerRef.current.getCurrentTime();
                    if (t && t > 0) {
                      sessionStorage.setItem("bg_music_time", t.toFixed(1));
                    }
                  } catch {
                    // Ignore tracking error
                  }
                }
              }, 1000);
            },
            onStateChange: (e) => {
              // 0 = YT.PlayerState.ENDED
              if (e.data === 0) {
                if (playerRef.current && typeof playerRef.current.seekTo === "function") {
                  playerRef.current.seekTo(startTime, true);
                  playerRef.current.playVideo();
                }
              }
            }
          }
        });
      } catch (err) {
        console.warn("YT init error", err);
      }
    };

    if (window.YT && window.YT.Player) {
      setupPlayer();
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prevCallback === "function") prevCallback();
        setupPlayer();
      };
    }

    return () => {
      if (trackerInterval) clearInterval(trackerInterval);
    };
  }, []);

  // Update volume & play/pause state dynamically
  useEffect(() => {
    if (!playerRef.current || typeof playerRef.current.setVolume !== "function") return;
    try {
      if (soundEnabled) {
        playerRef.current.setVolume(targetVolume);
        const state = typeof playerRef.current.getPlayerState === "function" ? playerRef.current.getPlayerState() : -1;
        if (state !== 1) {
          playerRef.current.playVideo();
        }
      } else {
        playerRef.current.pauseVideo();
      }
    } catch {
      // Ignore audio resume restrictions
    }
  }, [soundEnabled]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
        width: "1px",
        height: "1px",
        overflow: "hidden",
        opacity: 0.01,
        pointerEvents: "none",
        zIndex: -1
      }}
      aria-hidden="true"
    >
      <div id={containerId} />
    </div>
  );
}
