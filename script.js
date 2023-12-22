const playButton = document.getElementsByClassName("play")[0];
        const lapButton = document.getElementsByClassName("lap")[0];
        const resetButton = document.getElementsByClassName("reset")[0];
        const clearButton = document.getElementsByClassName("lap-clear-button")[0];
        const minute = document.getElementsByClassName("minutes")[0];
        const second = document.getElementsByClassName("seconds")[0];
        const centiSecond = document.getElementsByClassName("miliseconds")[0];
        const laps = document.getElementsByClassName("laps")[0];
        const bg = document.getElementsByClassName("outerbox")[0];

        let isPlay = false
        let secondsCounter = 0;
        let min;
        let seconds;
        let centiSec;
        let centiCounter = 0;
        let minCounter = 0;
        let lapItem = 0;
        let isReset = false;

        const toggleButton = () => 
        {
              lapButton.classList.remove("hidden");
              resetButton.classList.remove("hidden");
        }


        const play = () => 
        {   
            if (!isPlay &&  !isReset)
            {
                playButton.innerHTML = 'Pause';
                bg.classList.add("animation-bg");
                min = setInterval (() =>
                 {
                     minute.innerHTML = `${++minCounter} :`;
                 }, 60*1000);
                
                seconds = setInterval (() =>
                 {
                     if(secondsCounter === 60)
                     {
                        setCounter = 0;
                     }
                
                     second.innerHTML = `&nbsp;${++secondsCounter} :`;
                 }, 1000);
                
                 centiSec = setInterval (() =>
                 {
                      if (centiCounter === 100)
                      {
                        centiCounter = 0; 
                      }

                       centiSecond.innerHTML = `&nbsp;${++centiCounter}`;
                 }, 10);
                  
                isPlay = true;
                isReset = true;
            }

            else
            {
                playButton.innerHTML = 'Play';
                clearInterval(min);
                clearInterval(seconds);
                clearInterval(centiSec);
                isPlay = false;
                isReset = false;
                bg.classList.remove("animation-bg");
            }

            toggleButton();
        }

        const reset = () =>
        {   
            isReset = true;
            play();
            lapButton.classList.add("hidden");
            resetButton.classList.add("hidden");
            second.innerHTML = '&nbsp;0 :'
            centiSecond.innerHTML = '&nbsp;0';
            minute.innerHTML = '0 :';
        }


        const lap = () =>
        {
            const li = document.createElement("li");
            const number = document.createElement("span");
            const timeStamp = document.createElement("span");

            li.setAttribute("class", "lap-item");
            number.setAttribute("class","numberoflaps");
            timeStamp.setAttribute("class","time-stamp");
            
            number.innerHTML = `#${++lapItem} `;
            timeStamp.innerHTML = `${minCounter} : ${secondsCounter} : ${centiCounter}`;
            
            li.append(number, timeStamp);
            laps.append(li);

            clearButton.classList.remove("hidden");
        }
        
        const clearAll = () =>
        {
            laps.innerHTML = '';
            laps.append(clearButton);
            clearButton.classList.add("hidden");
            lapItem = 0;
        }


        playButton.addEventListener("click",play);
        resetButton.addEventListener("click",reset);
        lapButton.addEventListener("click",lap);
        clearButton.addEventListener("click",clearAll);