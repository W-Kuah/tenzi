export default function Scoreboard(props) {
  const {numOfDice, topScores} = props;
  const scores = topScores[numOfDice];
  const ScoresElems = () => {
    return (
        <div className="scores">
            {scores.map((score, idx) => (
                <div className="scoreGroup" key={idx}>
                    <img className="scoreIcon" src={`src/assets/medals/${idx+1}.png`} alt={`${idx+1}`} />
                    <span>{score}</span>
                </div>
            ))}
        </div>
    )
  }
  return (
    <div className="scoreboard">
        <h3>Scoreboard</h3>
        <label className="scoreType">{numOfDice} Die - Lowest Total Rolls</label>
        <ScoresElems/>
    </div>
  )
}
