const seats = document.querySelectorAll(".seat");
const chosenSeats = document.getElementById("chosenSeats");

let i = 0;
let selectedSeats = [];
if(localStorage.getItem("selectedSeat", selectedSeats)){
    selectedSeats = JSON.parse(localStorage.getItem("selectedSeat"))
}
seats.forEach( seat => {
    seat.addEventListener("click", handleClick);
    seat.index = i;
    console.log(seat, i);
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
    chosenSeats.innerHTML = `You've chose ${e.currentTarget.index}`
}

function handleCancel(e){
    e.target.style.backgroundColor= "rgba(255, 255, 255, 0.2)";
    console.log(e.currentTarget.index);
    selectedSeats = selectedSeats.filter(seat => seat !== e.currentTarget.index)
    localStorage.setItem("selectedSeat", JSON.stringify(selectedSeats));
    e.target.removeEventListener("click", handleCancel);
    e.target.addEventListener("click", handleClick);
}

function init(){
    
}

init()