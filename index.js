const seats = document.querySelectorAll(".seat");
const selectedNum = document.getElementById("selectedNum");
const price = document.getElementById("price");
const movieSelect = document.getElementById("movieSelect");

let i = 0;
let selectedSeats = [];
if(localStorage.getItem("selectedSeat", selectedSeats)){
    selectedSeats = JSON.parse(localStorage.getItem("selectedSeat"))
}
seats.forEach( seat => {
    seat.addEventListener("click", handleClick);
    seat.index = i;
    console.log(seat, i);
    selectedSeats.map(saved => {
            if(seat.index === saved){
        seat.style.backgroundColor = "#6FEAF6";
        seat.addEventListener("click", handleCancel);
        
            }
        })
    
    i+=1;
});

function handleClick(e){
    selectedSeats = selectedSeats.filter(seat => seat !== e.currentTarget.index)
    localStorage.setItem("selectedSeat", JSON.stringify(selectedSeats));
    e.target.style.backgroundColor="#6FEAF6"
    selectedSeats.push(e.currentTarget.index);
    localStorage.setItem("selectedSeat", JSON.stringify(selectedSeats));
    e.target.removeEventListener("click", handleClick);
    e.target.addEventListener("click", handleCancel);
    calculate();
}

function handleCancel(e){
    e.target.style.backgroundColor= "rgba(255, 255, 255, 0.2)";
    console.log(e.currentTarget.index);
    selectedSeats = selectedSeats.filter(seat => seat !== e.currentTarget.index)
    localStorage.setItem("selectedSeat", JSON.stringify(selectedSeats));
    e.target.removeEventListener("click", handleCancel);
    e.target.addEventListener("click", handleClick);
    calculate();
}

function handleSelect(e){
    console.log(`selected something:${e.target.value}`);
    console.log(e.target.value);
    localStorage.setItem("selectedMovie", e.target.value);

    const length = JSON.parse(localStorage.getItem("selectedSeat")).length;
    if(e.target.value === "1"){
        price.innerHTML = length * 10;
        localStorage.setItem("moviePrice", 10);
    }
    else if(e.target.value === "2"){
        price.innerHTML = length * 12;
        localStorage.setItem("moviePrice", 12);
    }
    else if(e.target.value === "3"){
        price.innerHTML = length * 8;
        localStorage.setItem("moviePrice", 8);
    }
    else if(e.target.value === "4"){
        price.innerHTML = length * 9;        
        localStorage.setItem("moviePrice", 9);

    }
    
}

function calculate(){
   const length = selectedSeats.length;
   selectedNum.innerHTML = length;
   price.innerHTML = length * (localStorage.getItem("moviePrice") || 10);
   movieSelect.value = localStorage.getItem("selectedMovie") || 1;
}



function init(){
    calculate();
    movieSelect.addEventListener("change", handleSelect);
    
}

init()