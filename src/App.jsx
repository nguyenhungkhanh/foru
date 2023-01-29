import { useEffect, useRef, useState } from 'react'
import { db } from './firebase'
import { onValue, ref, set } from "firebase/database";

import Finish from './Finish';

function App() {
  const resultsRef = ref(db, "results");

  const audioPlayer = useRef();
  const [step, setStep] = useState(1);
  const [results, setResults] = useState([]);
  const [isCancel, setIsCancel] = useState(false);

  function handleMouseOver() {
    const noElm = document.getElementById("no");

    if (noElm) {
      noElm.onmouseover = function() {
        const valueX = Math.random() * 300;
        const valueY = Math.random() * 300;

        noElm.style.transform = `translate(${valueX}px, ${valueY}px)`
      }
    }
  }

  useEffect(() => {
    onValue(resultsRef, (snapshot) => {
      setResults(snapshot.val() || [])
    });
  }, [])

  function handleSubmit(result) {
    set(resultsRef, results.concat(result));

    if (!result) {
      setIsCancel(true)
    } else {
      setStep(3)
    }
  }

  if (isCancel) {

  }

  return (
    <div className={`wrapper ${step === 3 ? "is-finish" : ""}`}>
      <audio ref={audioPlayer} controls loop style={{ width: "100%", display: "none" }} id="audio">
        <source src='sound.mp3' type="audio/mp3" />
      </audio>
      {
        isCancel
        ? <h1>Anh cảm ơn {`=)))`}</h1>
        : <>
            {
              step === 3
              ? <Finish />
              : <>
                  <div className='background-content' />
                  <div className='main-content'>
                    {
                      step === 1
                      ? <>
                          <h1>Anh có câu này muốn hỏi, trả lời giúp anh nhé.</h1>
                          <button onClick={() => {
                            document.getElementById("audio").play();
                            setStep(2)}
                          }>
                            OK, chơi luôn
                          </button>
                        </>
                      : null
                    }
                    {
                      step === 2
                      ? <>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}><h1>Cho anh 1 cơ hội em nhé</h1><div className="heart">&#x2665;</div></div>
                          <button onClick={() => handleSubmit(true)} id="yes" style={{ marginRight: "1rem" }}>
                            OK bạn êi
                          </button>
                          <button onClick={() => handleSubmit(false)} id="no" onMouseEnter={handleMouseOver}>
                            {`Không nhé Ngạn :)`}
                          </button>
                        </>
                      : null
                    }
                    <div className='bottom'>
                      <img className='img-u' src='u.png' />
                      <img className='img-cupid' src='cupid.png' />
                    </div>
                  </div>
                </>
            }
          </>
      }

    </div>
  )
}

export default App
