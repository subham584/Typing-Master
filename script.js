const paragraphs = [
    "The sun is a star located at the center of our solar system. It is the largest and most massive object in the solar system, accounting for about 99.86% of the total mass. The sun provides light and heat to the Earth, and its gravitational pull helps to keep the planets in their orbits.",
    "The Earth is the third planet from the sun and the fifth largest planet in the solar system. It has one natural satellite, the moon, which is the largest relative to its host planet in the solar system. Earth is the only known planet to have liquid water on its surface, and is home to a diverse range of life forms.",
    "The moon is the Earth's only natural satellite. It was formed about 4.5 billion years ago, shortly after the formation of the solar system. The moon has a significant effect on the Earth, as its gravitational pull causes tides and affects the rotation of the planet. It is also the location of the first human landing in 1969 by astronauts of the Apollo 11 mission.",
    "The Mars is the fourth planet from the sun and is commonly referred to as the Red Planet. It is the second closest planet to Earth, and is often studied by scientists for the possibility of supporting life. Mars has a thin atmosphere, and its surface is covered with a layer of iron oxide, giving it a reddish appearance.",
    "The Jupiter is the fifth planet from the sun and is the largest planet in the solar system. It is a gas giant, meaning that it is primarily composed of hydrogen and helium. Jupiter has a strong magnetic field and a large number of moons, including the four largest, known as the Galilean moons."
]

const pg = document.getElementById('pg');
const userinput = document.querySelector('.textinput');
const resetbtn = document.querySelector('.containerin button');
const totaltime = document.querySelector('.time .txt2');
const totalwpm = document.querySelector('.wpm .txt2');
const totalmistake = document.querySelector('.mistake .txt2');
const totalcpm = document.querySelector('.cpm .txt2');
let timer;
let maxTime = 120;
let timeRemaining = maxTime;
let charIndex = 0;
let mistakes = 0;
let isTyping = 0;

const setparagraph = () => {
    const randIndex = Math.floor(Math.random() * paragraphs.length)
    pg.innerText = "";
    paragraphs[randIndex].split("").forEach(char => {
        // console.log(char);
        pg.innerHTML += `<span>${char}</span>`
    })

    pg.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener("keydown", () => userinput.focus())
    pg.addEventListener("click", () => userinput.focus())

    totalmistake.innerText = 0;
    totalcpm.innerText = 0;
    totalwpm.innerText = 0;
    totaltime.innerText = timeRemaining;
}



const startTyping = () => {
    let characters = pg.querySelectorAll('span');
    // console.log(characters);
    let typedChar = userinput.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeRemaining > 0) {
        if (!isTyping) {
            // 0 or false
            timer = setInterval(startTimer, 1000);
            isTyping = true;
        }

        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("incorrect", "correct");
            }
        }
        else {
            if (characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");

            }
            else {
                characters[charIndex].classList.add("incorrect");
                mistakes++;
            }
            charIndex++;
        }

        characters.forEach(char => {
            char.classList.remove("active");
        })
        characters[charIndex].classList.add("active");

        // WPM is calculated by dividing the number of characters typed correctly (charIndex - mistakes) by 5 (the average number of characters per word) and dividing that result by the time it took to type those words (maxTime - timeRemaining), and then multiplying the result by 60 to convert to minutes.

        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeRemaining) * 60)
        wpm = wpm < 0 || !wpm || wpm == Infinity ? 0 : wpm;
        totalwpm.innerText = wpm;
        totalmistake.innerText = mistakes;
        totalcpm.innerText = charIndex - mistakes;
    }

    else{
        clearInterval(timer);
        isTyping = false;
    }
}
const startTimer = () => {
    if(timeRemaining >0){
        timeRemaining--;
        totaltime.innerText = timeRemaining;
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeRemaining) * 60)
        totalwpm.innerHTMl = wpm;
    }
    else{
        clearInterval(timer);
        isTyping = false;
    }
 }
const resetGame = () => {
    setparagraph();
    clearInterval(timer)
    timeRemaining = maxTime;
    charIndex = 0;
    mistakes = 0;
    isTyping = 0;
    userinput.value = "";
    totaltime.innerText = timeRemaining;
    totalwpm.innerText = 0;
    totalmistake.innerText = 0;
    totalcpm.innerText = 0;
}

setparagraph();
resetbtn.addEventListener('click', resetGame);
userinput.addEventListener('input', startTyping);