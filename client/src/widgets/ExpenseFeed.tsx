import React from 'react'

const ExpenseFeed = () => {
    // fetch all expenses for that month, make controller /:month and pass the month in through a Date() variable that has the month
    // make sure the controller has the logic to differentiate between the months

    // display all expenses, pass down data to the IndividualExpense component
    //Input to add expense to the feed, make sure it updates without rerendering the page
    const monthNames = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ]
    
    const date = new Date()
    const monthName = monthNames[date.getMonth()]
    
    console.log(monthName)

  return (
    <div>ExpenseFeed</div>
  )
}

export default ExpenseFeed