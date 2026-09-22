const CHARACTERS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
}

const COLORES = [
  "bg-red-500",
  "bg-red-500",
  "bg-title",
  "bg-title",
  "bg-green-500",
  "bg-green-500"
]

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
const SECURITY = document.querySelectorAll("#security > div")

lengthN.textContent = VALUELENGTH.value

function generatePassword() {
  let uppercase = MAIUSC.checked;
  let lowercase = MINUS.checked;
  let numbers = NUMBER.checked;
  let symbols = SYMBOL.checked;
  let length = VALUELENGTH.value
  let passwordG = ""
  let avaible = `${uppercase ? CHARACTERS.uppercase : ""}${lowercase ? CHARACTERS.lowercase : ""}${numbers ? CHARACTERS.numbers : ""}${symbols ? CHARACTERS.symbols : ""}`

  for (let i = 0; i < length; i++) {
    passwordG = `${passwordG}${avaible[Math.floor(Math.random() * avaible.length)]}`
  }
  PASSWORD.textContent = passwordG
  checkSecurity()
}

function changeLength() {
  lengthN.textContent = VALUELENGTH.value
}

function toggleCopied() {
  COPIEDSVG.forEach(svg => svg.classList.toggle("hidden"))
}

function checkSecurity() {

  let options = {
    uppercase: MAIUSC.checked,
    lowercase: MINUS.checked,
    numbers: NUMBER.checked,
    symbols: SYMBOL.checked,
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

checkSecurity()
generatePassword()

VALUELENGTH.addEventListener("input", () => {
  changeLength()
  generatePassword()
  checkSecurity()
})

GENERATEBTN.addEventListener("click", () => generatePassword())
COPIEDBTN.addEventListener("click", () => {
  navigator.clipboard.writeText(PASSWORD.textContent)
  COPIEDSVG.forEach(svg => svg.classList.toggle("hidden"))
  setTimeout(() => {
    toggleCopied()
  }, 2000)
})
