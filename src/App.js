import React, { useState, useEffect } from 'react'
import './App.css'
import Row from './Rows/Row'

const App = () => {
	const [rows, setRows] = useState([])
	const [currentSqlStatement, setCurrentSqlStatement] = useState({})
	const [rowStatements, setRowStatements] = useState({})
	const [statementId, setStatementId] = useState(0)
	const [sqlStatement, setSqlStatement] = useState('')
	const [sqlStatementString, SqlStatementString] = useState('')
	const [currentRowId, setCurrentRowId] = useState(null)

	const newRow = () => {
		return (
			<Row
				key={Math.random() * 1000}
				id={Math.random() * 1000}
				handleDeleteButton={handleDeleteButton}
				getSqlStatement={getSqlStatement}
				removeSqlStatement={removeSqlStatement}
			/>
		)
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => initializeRows(), [])

	const initializeSqlStatements = () => {
		setRowStatements({})
	}

	const initializeRows = () => {
		setRows([newRow()])
	}

	const handleAndButton = () => {
		setRows([...rows, newRow()])
	}

	const handleSearchButton = () => {
		SqlStatementString(sqlStatement)
	}

	const handleDeleteButton = (id) => {
		setCurrentRowId(id)
	}

	useEffect(() => {
		if (rows.length > 1) {
			const filteredRows = rows.filter((row) => row.props.id !== currentRowId)
			setRows([...filteredRows])
		} else {
			initializeRows()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentRowId])

	const getSqlStatement = (value, id) => {
		setCurrentSqlStatement({ id, value })
	}

	useEffect(() => {
		if (currentSqlStatement.id) {
			setRowStatements({
				...rowStatements,
				[currentSqlStatement.id]: currentSqlStatement.value,
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentSqlStatement])

	const removeSqlStatement = (id) => {
		setStatementId(id)
	}

	//Function for adding each sql statement to our sqlStatements object after we receive a new statement
	useEffect(() => {
		if (rowStatements) {
			const rowStatementsArray = Object.values(rowStatements)
			const statement = rowStatementsArray.reduce(
				(finalStatement, rowStatement) => {
					return finalStatement + rowStatement + ' AND '
				},
				''
			)

			const tempStatement = `SELECT * FROM session WHERE ${statement}`
			const finalStatement = tempStatement.substring(
				0,
				tempStatement.length - 4
			)
			setSqlStatement(finalStatement)
		}
	}, [rowStatements])

	useEffect(() => {
		const filteredStatements = { ...rowStatements }
		delete filteredStatements[currentRowId]
		setRowStatements({ ...filteredStatements })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [statementId])

	return (
		<div className='app'>
			<span className='app-header'>Search for Sessions</span>
			{rows}
			<button className='app-buttonAnd' onClick={handleAndButton}>
				And
			</button>
			<span className='app-horizontalLine' />
			<div className='app-buttonContainer'>
				<button className='app-buttonSearch' onClick={handleSearchButton}>
					<span className='app-buttonSearch__icon'>x </span>
					Search
				</button>
				<button
					className='app-buttonReset'
					onClick={() => {
						initializeRows()
						initializeSqlStatements()
					}}
				>
					Reset
				</button>
			</div>
			<div className='app-sql'>
				<span>Your Generated SQL Statement goes here:</span>
				<p>{sqlStatementString}</p>
			</div>
		</div>
	)
}

export default App
