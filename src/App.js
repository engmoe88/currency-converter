import React, { useState, useEffect } from 'react';
import './App.css';
import Currencies from './components/Currencies';
import DateComponent from './components/DateComponent';

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([""])
  const [date, setDate] = useState("")
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [amount, setAmount] = useState(1)
  const [exchangeRate, setExchangeRate] = useState()
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  let fromAmount, toAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * (exchangeRate)
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  useEffect(() => {
      fetch('https://api.exchangeratesapi.io/latest')
      .then(res => res.json())
      .then(data => {
        const firstOption = Object.keys(data.rates)[0]
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(firstOption)
        setExchangeRate(data.rates[firstOption])
        setDate(data.date)
      })
    }, [])

    useEffect(() => {
      if(fromCurrency && toCurrency) {
        fetch(`https://api.exchangeratesapi.io/latest?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
      }
    }, [fromCurrency, toCurrency])

    function handleFromAmountChange(e) {
      setAmount(e.target.value)
      setAmountInFromCurrency(true)
    }

    function handleToAmountChange(e) {
      setAmount(e.target.value)
      setAmountInFromCurrency(false)
    }
  
  return (
    <>
      <h1>Currency Converter</h1>
      <Currencies 
      currencyOptions={currencyOptions} 
      selectedCurrency={fromCurrency}
      onChangeCurrency={(e) => setFromCurrency(e.target.value)}
      amount={fromAmount}
      onChangeAmount={handleFromAmountChange} />
      <div className="equals">=</div>
      <Currencies 
      currencyOptions={currencyOptions} 
      selectedCurrency={toCurrency}
      onChangeCurrency={(e) => setToCurrency(e.target.value)}
      amount={toAmount}
      onChangeAmount={handleToAmountChange} />
      <DateComponent date={date} />
    </>
  );
}

export default App;
