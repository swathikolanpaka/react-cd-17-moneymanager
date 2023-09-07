const MoneyDetails = props => {
  const {historyDetails} = props
  const {Title, Amount, Type} = historyDetails

  return (
    <li>
      <p>{Title}</p>
      <p>{Amount}</p>
      <p>{Type}</p>
    </li>
  )
}

export default MoneyDetails
