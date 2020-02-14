import React from 'react'

export default function Currencies({ currencyOptions, selectedCurrency, onChangeCurrency, amount, onChangeAmount }) {
    return (
        <div>
            <input type="number" min="0" className="input" value={amount.toString()} onChange={onChangeAmount} />
            <select value={selectedCurrency} onChange={onChangeCurrency}>
                {
                    currencyOptions.map(option => (
                    <option key={option} value={option.toString()}>{option}</option>
                    ))
                }
            </select>
        </div>
    )
}
