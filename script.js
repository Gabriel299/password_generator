const CHARACTERS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
}

const MAIUSC = document.querySelector("#maiusc")
const MINUS = document.querySelector("#minusc")
const NUMBER = document.querySelector("#numbers")
const SYMBOL = document.querySelector("#symbols")
const VALUELENGTH = document.querySelector("#length")
let lengthN = document.querySelector("#lengthN")
const PASSWORD = document.querySelector("#password")
const GENERATEBTN = document.querySelector("#generatePassword")
const COPIEDBTN = document.querySelector("#copied")
const COPIEDSVG = document.querySelectorAll("#copied svg")

const OPTIONS = {
  uppercase: MAIUSC.checked,
  lowercase: MINUS.checked,
  numbers: NUMBER.checked,
  symbols: SYMBOL.checked,
};

lengthN.textContent = VALUELENGTH.value

function generatePassword() {
  let length = VALUELENGTH.value
  let passwordG = ""
  let avaible = `${OPTIONS.uppercase ? CHARACTERS.uppercase : ""}${OPTIONS.lowercase ? CHARACTERS.lowercase : ""}${OPTIONS.numbers ? CHARACTERS.numbers : ""}${OPTIONS.symbols ? CHARACTERS.symbols : ""}`

  for (let i = 0; i < length; i++) {
    passwordG = `${passwordG}${avaible[Math.floor(Math.random() * avaible.length)]}`
  }
  PASSWORD.textContent = passwordG
}

function changeLength() {
  lengthN.textContent = VALUELENGTH.value
}

generatePassword()

VALUELENGTH.addEventListener("input", () => changeLength())
VALUELENGTH.addEventListener("input", () => generatePassword())
GENERATEBTN.addEventListener("click", () => generatePassword())
COPIEDBTN.addEventListener("click", () => {
  navigator.clipboard.writeText(PASSWORD.textContent)
  COPIEDSVG.forEach(svg => svg.classList.toggle("hidden")
  )
})
