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
    incomeAmt: 0,
    expenseAmt: 0,
    Title: '',
    Amount: '',
    selectOption: 'INCOME',
  }

  addHistoryDetails = event => {
    event.preventDefault()

    const {Title, Amount, selectOption} = this.state

    // const selectType =
    const newHistory = {
      id: uuidv4(),
      Title,
      Amount,
      selectOptionType: selectOption === 'INCOME' ? 'Income' : 'Expenses',
      selectOption,
    }

    // console.log(newHistory)

    //  console.log(newHistory.selectOptionType)

    if (selectOption === 'EXPENSES') {
      this.setState(prevExpBal => ({
        expenseAmt: prevExpBal.expenseAmt + parseInt(Amount),
      }))
    } else {
      this.setState(prevIncomeBal => ({
        incomeAmt: prevIncomeBal.incomeAmt + parseInt(Amount),
      }))
    }

    this.setState(prevHistory => ({
      historyDetails: [...prevHistory.historyDetails, newHistory],
      Title: '',
      Amount: '',
    }))

    // console.log(historyDetails)
  }

  addTitle = event => {
    this.setState({Title: event.target.value})
  }

  addAmt = event => {
    this.setState({Amount: event.target.value})
  }

  selectOptionType = event => {
    this.setState({selectOption: event.target.value})
  }

  deleteHistoryDetails = id => {
    const {Amount, incomeAmt, expenseAmt} = this.state

    console.log(Amount)
    console.log(incomeAmt)

    const {historyDetails} = this.state
    const remainingHistory = historyDetails.filter(
      eachHistory => eachHistory.id !== id,
    )

    this.setState(prevExpBal => ({
      expenseAmt: prevExpBal.expenseAmt - parseInt(expenseAmt),
    }))

    this.setState({historyDetails: remainingHistory})
  }

  render() {
    const {
      historyDetails,

      incomeAmt,
      expenseAmt,
      Title,
      Amount,
    } = this.state

    const balanceAmt = incomeAmt - expenseAmt
    // console.log(historyDetails)

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
            <form onSubmit={this.addHistoryDetails}>
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
                <select id="selectType" onChange={this.selectOptionType}>
                  {transactionTypeOptions.map(eachOption => (
                    <option
                      key={eachOption.optionId}
                      value={eachOption.optionId}
                    >
                      {eachOption.displayText}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit">Add</button>
            </form>
          </div>

          <div className="history-container">
            <h1>History</h1>
            <div className="history-details">
              <p className="p">Title</p>
              <p className="p">Amount</p>
              <p className="p">Type</p>
            </div>

            <div>
              <ul>
                {historyDetails.map(eachHistoryDetails => (
                  <MoneyDetails
                    historyDetails={eachHistoryDetails}
                    key={eachHistoryDetails.id}
                    deleteHistoryDetails={this.deleteHistoryDetails}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
