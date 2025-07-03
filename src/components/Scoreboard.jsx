import one from '../assets/medals/1.png';
import two from '../assets/medals/2.png';
import three from '../assets/medals/3.png';
import four from '../assets/medals/4.png';
import five from '../assets/medals/5.png';


export default function Scoreboard(props) {
  const {numOfDice, topScores} = props;
  const scores = topScores[numOfDice];

  const picIdx = {
    0: one,
    1: two,
    2: three,
    3: four,
    4: five,
  }
  const ScoresElems = () => {
    return (
        <div className="scores">
            {scores.map((score, idx) => (
                <div className="scoreGroup" key={idx}>
                    <img className="scoreIcon" src={picIdx[idx]} alt={`${idx+1}`} />
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
