import axios from "axios"

/* Funzione per l'ordinamento delle date */

export function reverseDate(date) {
    const newDate = new Date (date)
    
    const giorno = String(newDate.getDate()).padStart(2, '0');
    const mese = String(newDate.getMonth() + 1).padStart(2, '0');
    const anno = String(newDate.getFullYear())
    
    const fullDate = `${giorno}-${mese}-${anno}`;
    return fullDate
} 

/* Funzione gestione campi Login quando sono errati */

export function loginDataError() {
    const input = document.querySelectorAll(".loginInput");
    console.log(input)
    input.forEach((el) => {
        el.classList.add("border-red-500")
        el.classList.add("bg-red-50")
    })
}

/* Funzione per fare il fetch delle entry ad ogni aggiuna o modifica */

export async function fetchData(setType, typeData) {
    const res = await axios.get("http://localhost:8020/");
    setType(res.data[typeData]);
}