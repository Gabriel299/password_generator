import { CHARACTERS as CH, COLORES, CHECKBOX as CB, ERROR, BTN, COPIEDSVG, VALUELENGTH, LENGTHN, PASSWORD, SECURITY } from "./variables.js";

LENGTHN.textContent = VALUELENGTH.value

/**
 - Restituisce un indice casuale compreso tra 0 e max escluso.
 - Usa crypto.getRandomValues per generare il valore.
 @param {number} max Limite.
 @returns {number} Indice casuale.
 */
function randomIndex(max) {

  const range = 0x100000000; // 2^32
  const limit = range - (range % max);

  const array = new Uint32Array(1);

  let randomValue;

  do {
    crypto.getRandomValues(array);
    randomValue = array[0];
  } while (randomValue >= limit);

  return randomValue % max;
}

/**
  - Genera una password casuale secondo le opzioni selezionate e la lunghezza impostata.
  - Aggiorna la password visualizzata e ricalcola il livello di sicurezza.
  @returns {void}
*/
function generatePassword() {
  let checkObj = {
    uppercase: CB.MAIUSC.checked,
    lowercase: CB.MINUS.checked,
    numbers: CB.NUMBER.checked,
    symbols: CB.SYMBOL.checked
  }
  let length = VALUELENGTH.value
  let passwordG = ""
  let avaible = Object.entries(checkObj)
    .filter(([, checked]) => checked === true)
    .map(([name]) => CH[name]).join("")

  for (let i = 0; i < length; i++) {
    passwordG += avaible[randomIndex(avaible.length)];
  }
  PASSWORD.textContent = passwordG
  checkSecurity()
}

/**
 - Calcola il livello di sicurezza in base alla lunghezza e alle categorie selezionate.
 - Aggiorna le classi CSS delle barre che rappresentano il livello calcolato.
 @returns {void}
 */
function checkSecurity() {

  let options = {
    uppercase: CB.MAIUSC.checked,
    lowercase: CB.MINUS.checked,
    numbers: CB.NUMBER.checked,
    symbols: CB.SYMBOL.checked,
  }

  let securitylength = 0

  // LUNGHEZZA
  const valueLength = Number(VALUELENGTH.value)
  if (valueLength >= 12) securitylength++;
  if (valueLength >= 16) securitylength++;
  if (valueLength >= 20) securitylength++;

  // TIPI
  let numberTrue = (Object.values(options).filter(Boolean).length)
  if (numberTrue >= 2) securitylength++;
  if (numberTrue >= 3) securitylength++;
  if (numberTrue === 4) securitylength++;

  SECURITY.forEach((securityBar) => {
    securityBar.classList.remove(...COLORES)
  })

  let count = Math.max(securitylength, 1)

  for (let i = 0; i < count; i++) {
    SECURITY[i].classList.add(COLORES[i])
  }

}

// STATO INIZIALE
checkSecurity()
generatePassword()

VALUELENGTH.addEventListener("input", () => {
  LENGTHN.textContent = VALUELENGTH.value // cambia la lunghezza visualizzata
  generatePassword()
})

BTN.GENERATEBTN.addEventListener("click", () => generatePassword())
BTN.COPIEDBTN.addEventListener("click", () => {
  navigator.clipboard.writeText(PASSWORD.textContent)
  COPIEDSVG.forEach(svg => svg.classList.toggle("hidden"))

  setTimeout(() => {
    COPIEDSVG.forEach(svg => svg.classList.toggle("hidden"))
  }, 2000);
})

Object.values(CB).forEach((checkbox) => {
  checkbox.addEventListener("change", (event) => {
    const anyChecked = Object.values(CB).some((item) => item.checked);

    // impedisce di de-selezionare tutte le checkbox
    if (!anyChecked) {
      event.currentTarget.checked = true;
      ERROR.classList.remove("hidden")
      return;
    }

    generatePassword();
  });
});