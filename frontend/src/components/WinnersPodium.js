import React from "react";

function WinnersPodium({ scores, temp_users, icons }) {
  // Sort temp_users by points in descending order
  const sortedUsers = Object.values(scores).sort((a, b) => b.points - a.points);

  // Separate top 3 winners
  const [firstPlace, secondPlace, thirdPlace, ...otherPlayers] = sortedUsers;

  return (
    <div className="podium-container">
      <div className="winner-message">Congrats winners!!</div>
      <div className="winners-podium">
        {/* Second Place */}
        {secondPlace ? (
          <div>
            <img
              className="player-avatar"
              src={icons[secondPlace.icon]}
              alt="icon"
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
            <div className="player-name">{secondPlace.nickname}</div>
            <div className="podium-item second-place player-points">
              {secondPlace.points}
            </div>
            <div className="player-placement">2nd</div>
          </div>
        ) : (
          <div>
            <div className="podium-item second-place"></div>
            <div className="player-placement">2nd</div>
          </div>
        )}
        {/* First Place */}
        {firstPlace ? (
          <div>
            <img
              className="player-avatar"
              src={icons[firstPlace.icon]}
              alt="icon"
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
            <div className="player-name">{firstPlace.nickname}</div>
            <div className="podium-item first-place player-points">
              {firstPlace.points}
            </div>
            <div className="player-placement">1st</div>
          </div>
        ) : (
          <div>
            <div className="podium-item first-place"></div>
            <div className="player-placement">1st</div>
          </div>
        )}
        {/* Third Place */}
        {thirdPlace ? (
          <div>
            <img
              className="player-avatar"
              src={icons[thirdPlace.icon]}
              alt="icon"
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
            <div className="player-name">{thirdPlace.nickname}</div>
            <div className="podium-item third-place player-points">
              {thirdPlace.points}
            </div>
            <div className="player-placement">3rd</div>
          </div>
        ) : (
          <div>
            <div className="podium-item third-place"></div>
            <div className="player-placement">3rd</div>
          </div>
        )}
      </div>

      {/* Other Players */}
      <div className="not-winners">
        {otherPlayers.map((user, index) => (
          <div key={index}>
            <img
              className="player-avatar"
              src={icons[user.icon]}
              alt="icon"
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
            <div className="player-name">{user.nickname}</div>
            <div className="player-points podium-item">{user.points}</div>
            <div className="player-placement">{index + 4}th</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WinnersPodium;
