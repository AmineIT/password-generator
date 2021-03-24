import { useState } from 'react'
import {
  Box,
  FormControl,
  InputAdornment,
  Typography,
  TextField,
  IconButton,
  FormControlLabel,
  Checkbox,
  Button,
  Slider,
  ClickAwayListener,
  Tooltip
} from '@material-ui/core'
import { FileCopy } from '@material-ui/icons'

function App() {

  const [password, setPassword] = useState('')
  const [slider, setSlider] = useState(20)
  const [lowerLetters, setLowerLetters] = useState(true)
  const [upperLetters, setUpperLetters] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(true)
  const [textCopied, setTextCopied] = useState(false)

  const getRandomLower = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
  }

  const getRandomUpper = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
  }

  const getRandomNumber = () => {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
  }

  const getRandomSymbol = () => {
    const symbols = "!@#$%^&*(){}/.,<>"
    return symbols[Math.floor(Math.random() * symbols.length)]
  }

  const randomFun = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
  }

  const generatePassword = (slider, lower, upper, number, symbol) => {

    let generatedPassword = ''
    const typesCount = lower + upper + number + symbol
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0])

    if (typesCount === 0) return ''

    for (let i = 0; i < slider; i += typesCount) {
      typesArr.forEach(type => {
        const funcName = Object.keys(type)[0]
        generatedPassword += randomFun[funcName]()
      })
    }

    return generatedPassword.slice(0, slider)
  }

  const handleClick = () => {
    setPassword(generatePassword(slider, lowerLetters, upperLetters, numbers, symbols))
  }

  const copyToClipboard = () => {

    if (!password) return

    setTextCopied(true)

    const textarea = document.createElement('textarea')
    textarea.value = password
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()

  }

  const handleTooltipClose = () => {
    setTextCopied(false)
  }

  return (
    <Box
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100vw"
      height="100vh"
      bgcolor="#1B212C"
    >
      <Box
        padding="24px"
        borderRadius="3px"
        width="30%"
        height="auto"
        bgcolor="#171923"
      >
        <Typography variant="h5" align="center">Password Generator</Typography>

        <FormControl variant="filled" style={{ marginTop: '24px', width: '100%' }}>
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="text"
            color="primary"
            readOnly
            value={password}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <ClickAwayListener onClickAway={handleTooltipClose}>
                    <Tooltip
                      PopperProps={{
                        disablePortal: true,
                      }}
                      onClose={handleTooltipClose}
                      open={textCopied}
                      disableFocusListener
                      disableHoverListener
                      disableTouchListener
                      title="Copied!"
                    >
                      <IconButton onClick={copyToClipboard}>
                        <FileCopy style={{ color: 'white' }} />
                      </IconButton>
                    </Tooltip>
                  </ClickAwayListener>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>

        <Box style={{ marginTop: '24px' }}>
          <Typography id="continuous-slider" gutterBottom>
            Password Length: {slider}
          </Typography>
          <Slider
            value={slider}
            max={50}
            min={6}
            onChange={(e, newValue) => setSlider(newValue)}
            aria-labelledby="continuous-slider" />
        </Box>

        <Box>
          <FormControlLabel
            checked={lowerLetters}
            onChange={() => setLowerLetters(!lowerLetters)}
            control={<Checkbox color="primary" />}
            label="Include lowercase letters"
            labelPlacement="end"
          />
        </Box>

        <Box>
          <FormControlLabel
            checked={upperLetters}
            onChange={() => setUpperLetters(!upperLetters)}
            control={<Checkbox color="primary" />}
            label="Include uppercase letters"
            labelPlacement="end"
          />
        </Box>

        <Box>
          <FormControlLabel
            checked={numbers}
            onChange={() => setNumbers(!numbers)}
            control={<Checkbox color="primary" />}
            label="Include numbers"
            labelPlacement="end"
          />
        </Box>

        <Box>
          <FormControlLabel
            checked={symbols}
            onChange={() => setSymbols(!symbols)}
            control={<Checkbox color="primary" />}
            label="Include symbols"
            labelPlacement="end"
          />
        </Box>

        <Button
          onClick={handleClick}
          variant="contained"
          fullWidth
          style={{ marginTop: '24px' }}>Generate</Button>
      </Box>
    </Box>
  );
}

export default App;
