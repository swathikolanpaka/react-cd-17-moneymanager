import './index.css'

const MoneyDetails = props => {
  const {historyDetails, deleteHistoryDetails} = props
  const {Title, Amount, selectOptionType, id} = historyDetails

  const deleteDetails = () => {
    deleteHistoryDetails(id)
  }

  return (
    <li>
      <div className="history">
        <p>{Title}</p>
        <p>{Amount}</p>
        <p>{selectOptionType}</p>
        <button type="button" data-testid="delete" onClick={deleteDetails}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default MoneyDetails
