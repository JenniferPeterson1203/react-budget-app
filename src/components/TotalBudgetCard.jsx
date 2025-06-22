import {useBudgets } from "../contexts/BudgetsContext"
import BudgeCard from "./BudgetCard.jsx"


export default function TotalBudgetCard() {
    const { expenses, budgets } = useBudgets()
    const amount = expenses.reduce((total, expense) =>
      total + expense.amount
    , 0)

    const max = budgets.reduce((total, budget) =>
      total + budget.max, 0 )

    if(max === 0) return null
  return (
    <BudgeCard
      amount={amount}
      name="Total"
      gray
      max={max}
      hideButtons
    />
  )
}

