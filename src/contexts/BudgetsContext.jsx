import React, {  useContext, useState} from "react"
import { v4 as uuidv4 } from 'uuid'
import useLocalStorage from "../hooks/UseLocalStorage"

const BudgetsContext = React.createContext()

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export function useBudgets() {
    return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) => {

const [budgets, setBudgets] = useLocalStorage("budgets", [])
const [expenses, setExpenses] = useLocalStorage("expenses", [])

//GET EXPENSES BY BUDGET ID
    function getBudgetExpenses(budgetId) {
        return expenses.filter(expense => expense.budgetId === budgetId)
        }

//ADD EXPENSE
    function addExpense({  description, amount, budgetId }) {

        setExpenses(prevExpenses => {
            // add a new expense with the new name and new id
            return [...prevExpenses, { id: uuidv4(),  description, amount, budgetId }]
        })
    }

// ADD BUDGET
    //function to add a budget
    function addBudget({ name, max }) {
setBudgets(prevBudgets => {
    //check if budget with same name already exists
    if(prevBudgets.find(budget => budget.name === name)){
        //return the current budgets if it exists
        return prevBudgets
    }
//else add a new budget with the new name and new id
    return [...prevBudgets, { id: uuidv4(), name, max }]
})
    }   

// DELETE BUDGET BY ID
    function deleteBudget({id}) {
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id)
        }
    )
    }
// DELETE EXPENSE
    function deleteExpense({id}) {

setExpenses(prevExpenses => {
    //filter out the expense with the given id
    //and return the rest of the expenses
    //this will remove the expense from the state
    //and update the state with the remaining expenses
    return prevExpenses.filter(expense => expense.id !== id)
        })
    }

return (
<BudgetsContext.Provider value={{
    budgets, expenses, getBudgetExpenses, addExpense, addBudget, deleteBudget, deleteExpense, 
    // getBudgetById, getBudgetByName, getExpenseById, getExpenseByName
}}>{children}</BudgetsContext.Provider> 
)
}