import React, { useState, useMemo, useRef } from "react";
import { ALL_INDIAN_STATES } from "../../data/config";

export function LeaderboardScreen({ leaderboard, player, onOpenStudio }) {
  const [gameFilter, setGameFilter] = useState("eco_murti_maker");
  const [stateFilter, setStateFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all_time");
  const [currentViewRank, setCurrentViewRank] = useState(1);

  const tableWrapRef = useRef(null);

  const filteredList = useMemo(() => {
    let list = [...(leaderboard || [])];

    if (stateFilter !== "all") {
      list = list.filter((item) => item.state === stateFilter);
    }

    const now = Date.now();
    if (timeFilter === "today") {
      list = list.filter((item) => now - item.submittedAt <= 86400000);
    } else if (timeFilter === "this_week") {
      list = list.filter((item) => now - item.submittedAt <= 86400000 * 7);
    } else if (timeFilter === "this_month") {
      list = list.filter((item) => now - item.submittedAt <= 86400000 * 30);
    }

    return list;
  }, [leaderboard, stateFilter, timeFilter]);

  const currentPlayerIdx = useMemo(() => {
    if (!player) return -1;
    return filteredList.findIndex(
      (item) =>
        item.name.toLowerCase() === player.name.toLowerCase() &&
        item.state === player.state
    );
  }, [filteredList, player]);

  const currentPlayerRank = currentPlayerIdx >= 0 ? currentPlayerIdx + 1 : 0;

  const handleTableScroll = () => {
    if (!tableWrapRef.current || filteredList.length <= 1) return;
    const { scrollTop, scrollHeight, clientHeight } = tableWrapRef.current;
    const maxScroll = scrollHeight - clientHeight;
    if (maxScroll <= 0) return;
    const ratio = Math.max(0, Math.min(1, scrollTop / maxScroll));
    const approxRank = Math.min(
      filteredList.length,
      Math.max(1, Math.round(ratio * (filteredList.length - 1) + 1))
    );
    setCurrentViewRank(approxRank);
  };

  const handleSliderChange = (e) => {
    const targetRank = parseInt(e.target.value, 10);
    setCurrentViewRank(targetRank);
    if (!tableWrapRef.current || filteredList.length <= 1) return;

    const row = document.getElementById(`lb-row-${targetRank}`);
    if (row && tableWrapRef.current) {
      const topPos = row.offsetTop - tableWrapRef.current.offsetTop - 45;
      tableWrapRef.current.scrollTo({ top: Math.max(0, topPos), behavior: "smooth" });
    } else {
      const maxScroll = tableWrapRef.current.scrollHeight - tableWrapRef.current.clientHeight;
      const targetScroll = ((targetRank - 1) / (filteredList.length - 1)) * maxScroll;
      tableWrapRef.current.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  const slideHorizontal = (offset) => {
    if (tableWrapRef.current) {
      tableWrapRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const scrollToCurrentPlayer = () => {
    if (currentPlayerRank > 0) {
      setCurrentViewRank(currentPlayerRank);
      const row = document.getElementById(`lb-row-${currentPlayerRank}`);
      if (row && tableWrapRef.current) {
        const topPos = row.offsetTop - tableWrapRef.current.offsetTop - 50;
        tableWrapRef.current.scrollTo({ top: Math.max(0, topPos), behavior: "smooth" });
      }
    }
  };

  return (
    <div className="leaderboard-wrap">
      <div className="lb-header">
        <div>
          <h2 style={{ fontSize: "28px" }}>All-India Leaderboard</h2>
          <p style={{ color: "var(--ink-soft)", fontSize: "14px" }}>
            Rankings of top Eco Murti creators across India
          </p>
        </div>
        <button className="btn btn-primary" onClick={onOpenStudio}>
          🎨 Create Your Murti
        </button>
      </div>

      <div className="lb-filters-row">
        <div className="lb-filter-group">
          <label htmlFor="lbGameSelect">🎮 Game</label>
          <select
            id="lbGameSelect"
            value={gameFilter}
            onChange={(e) => setGameFilter(e.target.value)}
          >
            <option value="eco_murti_maker">Eco Murti Maker</option>
            <option value="all_games">All Games</option>
            <option value="future_games">Future Games</option>
          </select>
        </div>

        <div className="lb-filter-group">
          <label htmlFor="lbStateSelect">📍 State / UT</label>
          <select
            id="lbStateSelect"
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
          >
            <option value="all">All States &amp; UTs</option>
            {ALL_INDIAN_STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="lb-filter-group">
          <label htmlFor="lbTimeSelect">⏱️ Time Period</label>
          <select
            id="lbTimeSelect"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option value="all_time">All Time</option>
            <option value="today">Today</option>
            <option value="this_week">This Week</option>
            <option value="this_month">This Month</option>
          </select>
        </div>
      </div>

      {/* Interactive Leaderboard Slider Controls */}
      {filteredList.length > 0 && (
        <div className="lb-slider-bar">
          <div className="lb-slider-info">
            <span className="lb-slider-title">🎚️ Rank Slider:</span>
            <span className="lb-slider-badge">
              Viewing Rank #{currentViewRank} of {filteredList.length}
            </span>
          </div>

          <div className="lb-slider-range-wrap">
            <span className="lb-slider-edge-label">#1</span>
            <input
              type="range"
              className="lb-range-input"
              min="1"
              max={filteredList.length}
              value={currentViewRank}
              onChange={handleSliderChange}
              aria-label="Slide through leaderboard ranks"
            />
            <span className="lb-slider-edge-label">#{filteredList.length}</span>
          </div>

          <div className="lb-slider-actions">
            {currentPlayerRank > 0 && (
              <button
                className="lb-btn-pill"
                onClick={scrollToCurrentPlayer}
                title="Slide to your rank"
              >
                🎯 My Rank (#{currentPlayerRank})
              </button>
            )}
            <div className="lb-h-slide-buttons">
              <button
                className="lb-slider-btn"
                onClick={() => slideHorizontal(-200)}
                title="Slide table left"
                aria-label="Slide table left"
              >
                ❮
              </button>
              <button
                className="lb-slider-btn"
                onClick={() => slideHorizontal(200)}
                title="Slide table right"
                aria-label="Slide table right"
              >
                ❯
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className="lb-table-wrap"
        ref={tableWrapRef}
        onScroll={handleTableScroll}
      >
        <table className="lb-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player Name</th>
              <th>State</th>
              <th>Celebration Score</th>
              <th>Quiz</th>
              <th>Eco</th>
              <th>Beauty</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  style={{ textAlign: "center", padding: "30px", color: "var(--ink-soft)" }}
                >
                  No records found for the selected filters.
                </td>
              </tr>
            ) : (
              filteredList.map((item, idx) => {
                const rank = idx + 1;
                let rankClass = "rank-other";
                if (rank === 1) rankClass = "rank-1";
                else if (rank === 2) rankClass = "rank-2";
                else if (rank === 3) rankClass = "rank-3";

                const isCurrentPlayer =
                  player &&
                  item.name.toLowerCase() === player.name.toLowerCase() &&
                  item.state === player.state;

                return (
                  <tr
                    key={item.id || `${item.name}-${idx}`}
                    id={`lb-row-${rank}`}
                    style={
                      isCurrentPlayer
                        ? { background: "#fef9c3", fontWeight: 700 }
                        : undefined
                    }
                  >
                    <td>
                      <span className={`lb-rank-badge ${rankClass}`}>
                        {rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : rank}
                      </span>
                    </td>
                    <td>
                      <b>{item.name}</b> {isCurrentPlayer ? "(You)" : ""}
                    </td>
                    <td>📍 {item.state}</td>
                    <td>
                      <b style={{ fontSize: "16px", color: "var(--clay-dark)" }}>
                        {item.finalCelebrationScore}
                      </b>
                    </td>
                    <td>{item.quizScore}</td>
                    <td>
                      <span style={{ color: "var(--leaf)", fontWeight: 700 }}>
                        {item.ecoScore}
                      </span>
                    </td>
                    <td>{item.beautyScore}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

