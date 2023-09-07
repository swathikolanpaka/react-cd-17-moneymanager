import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import MoneyDetails from '../MoneyDetails'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    historyDetails: [],
    balanceAmt: 0,
    incomeAmt: 0,
    expenseAmt: 0,
    Title: '',
    Amount: '',
    selectOption: '',
  }

  addHistoryDetails = event => {
    event.preventDefault()

    const {Title, Amount, balanceAmt, selectOption} = this.state
    console.log(selectOption)
    if (selectOption === 'Income') {
      this.setState(prevBal => ({
        balanceAmt: prevBal.balanceAmt + 1000,
      }))
    }

    const newHistory = {id: uuidv4(), Title, Amount, selectOption}

    this.setState(prevHistory => ({
      historyDetails: [...prevHistory.historyDetails, newHistory],
    }))
    console.log(newHistory)
  }

  addTitle = event => {
    this.setState({Title: event.target.value})
  }

  addAmt = event => {
    this.setState({Amount: event.target.value})
  }

  selectOption = event => {
    this.setState({selectOption: event.target.value})
  }

  render() {
    const {
      historyDetails,
      balanceAmt,
      incomeAmt,
      expenseAmt,
      Title,
      Amount,
    } = this.state

    return (
      <div className="bg-container">
        <div className="profile-details">
          <h1>Hi,Richard</h1>
          <p>
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>

        <div className="amt-details">
          <div className="bal">
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
              alt="balance"
            />
            <div>
              <p>Your Balance</p>

              <p data-testid="balanceAmount">Rs {balanceAmt}</p>
            </div>
          </div>
          <div className="income">
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
              alt="income"
            />
            <div>
              <p>Your Income</p>
              <p data-testid="incomeAmount">Rs {incomeAmt}</p>
            </div>
          </div>

          <div className="expense">
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
              alt="expenses"
            />
            <div>
              <p>Your Expenses</p>
              <p data-testid="expensesAmount">Rs {expenseAmt}</p>
            </div>
          </div>
        </div>

        <div className="transaction-history-container">
          <div className="transaction-details">
            <h1>Add Transaction</h1>
            <from onSubmit={this.addHistoryDetails}>
              <div className="title">
                <label htmlFor="title">TITLE</label>
                <br />
                <input
                  type="text"
                  value={Title}
                  id="title"
                  onChange={this.addTitle}
                />
              </div>

              <div className="amt">
                <label htmlFor="amount">AMOUNT</label>
                <br />
                <input
                  type="text"
                  value={Amount}
                  id="amount"
                  onChange={this.addAmt}
                />
              </div>

              <div className="type">
                <label htmlFor="selectType">TYPE</label>
                <br />
                <select id="selectType" onChange={this.selectOption}>
                  {transactionTypeOptions.map(eachOption => (
                    <option value={eachOption.optionId}>
                      {eachOption.displayText}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit">Add</button>
            </from>
          </div>

          <div className="history-container">
            <h1>History</h1>
            <div className="history-details">
              <p className="p">Title</p>
              <p className="p">Amount</p>
              <p className="p">Type</p>
            </div>
            <ul className="history-details">
              {historyDetails.map(eachHistoryDetails => (
                <MoneyDetails
                  historyDetails={eachHistoryDetails}
                  key={eachHistoryDetails.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
