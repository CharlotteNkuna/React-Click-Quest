import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import Header from './components/Header';
import Footer from './components/Footer';
import Shop from './components/Shop';
import { useState, useEffect} from 'react';
import GameArea from './components/GameArea';

function App() {
  
const [coins, setCoins]= useState(0); //lets a component store and use data
const [coinsPerClick, setCoinsPerClick] = useState(1); //scoring
const [upgradeCost, setUpgradeCost]= useState(10); // for incrreasing difficulity
const [achievement, setAchievement] = useState("");
const [message, setMessage]= useState("");

const level = coinsPerClick;
const teleportMode = coinsPerClick >=5;
//fetch everything from database
useEffect(()=>{ //use effect to fetch data from API
  const saveData = JSON.parse(localStorage.getItem("clickQuest")) //geter method

if (saveData){
  setCoins(saveData.coins || 0);
  setCoinsPerClick(saveData.coinsPerClick || 1); 
  setUpgradeCost(saveData.upgradeCost || 10);

}
},
[]) //empty array loads once - why because its a getter method
//end of useeffect
//make sure our app can save

useEffect(()=>{
  localStorage.setItem("clickQuest", // setter
  JSON.stringify({coins, coinsPerClick, upgradeCost})
  );
},
[coins, coinsPerClick, upgradeCost]); // array, loads everytime  data or value are updated
//

//user feedback
useEffect(()=> {
if (coins >= 500) setAchievement("🏆 click Guru")
  else if (coins >= 100) setAchievement("🌟 Rising Star")
else if (coins >= 10) setAchievement("🎉 Getting Started")

}, [coins]
)
//challenges and difficulty
useEffect(()=>{
if (level==3){
  setMessage("⚡️ Evasive mode Unlocked: Coins are dodgy!");
  setTimeout(()=> setMessage(""), 4000);
}
}, [level])

useEffect(() => {
  if (teleportMode){
    setMessage("Teleport mode Unlocked: Coin Disappears")
    setTimeout(()=> setMessage(""), 4000);
  }
}, [teleportMode]);

const handleClick = () => setCoins((prev) => prev + coinsPerClick);
  const handleUpgrade = () => {
    if (coins >= upgradeCost) {
      setCoins((prev) => prev - upgradeCost);
      setCoinsPerClick((prev) => prev + 1);
      setUpgradeCost((prev) => Math.floor(prev * 1.5));
    }
  };

  const handleReset = () => {
    setCoins(0);
    setCoinsPerClick(1);
    setUpgradeCost(10);
    setAchievement("");
    setMessage("");
    localStorage.removeItem("clickQuestData");
  };


  return (
    <>
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-dark text-white p-4 position-relative">
      <Header coins={coins} coinsPerClick={coinsPerClick} />

      {achievement && (
        <div className="position-absolute top-0 end-0 bg-success text-white px-3 py-2 rounded shadow m-3">
          {achievement}
        </div>
      )}
      {message && (
        <div className="position-absolute top-25 end-0 bg-warning text-dark px-3 py-2 rounded shadow m-3">
          {message}
        </div>
      )}

      <GameArea onClick={handleClick} isEvasive={level >= 3} teleportMode={teleportMode} />
      <Shop coins={coins} upgradeCost={upgradeCost} onUpgrade={handleUpgrade} />
      <Footer onReset={handleReset} />
    </div>
    
    </>
  )
}

export default App
