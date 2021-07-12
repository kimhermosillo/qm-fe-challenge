import './Row.css'
import { useState, useEffect } from 'react'
import { options, numberOperators, stringOperators } from '../utils/options'
// import { FaTimes } from 'react-icons/fa'

//Define row component
const Row = ({
	handleDeleteButton,
	id,
	getSqlStatement,
	removeSqlStatement,
}) => {
	const [option, setOption] = useState(options[0])
	const [operators, setOperators] = useState(() =>
		option.type === 'string' ? stringOperators : numberOperators
	)
	const [operator, setOperator] = useState(operators[0])

	const [queryStatement, setQueryStatement] = useState('')

	const [queryInputs, setQueryInputs] = useState({
		numberEquals: '',
		stringEquals: '',
		numberInList: '',
		stringInList: '',
		contains: '',
		startsWith: '',
		between1: '',
		between2: '',
		greaterThan: '',
		lessThan: '',
	})

	const {
		numberEquals,
		numberInList,
		stringEquals,
		stringInList,
		contains,
		startsWith,
		between1,
		between2,
		greaterThan,
		lessThan,
	} = queryInputs

	const operatorsList = operators.map(({ value, id }) => {
		return <option key={id}>{value}</option>
	})
	const optionsList = options.map(({ value, id }) => {
		return <option key={id}>{value}</option>
	})

	const onInputChange = (input, value) => {
		switch (input) {
			case 'numberEquals':
				setQueryInputs({
					...queryInputs,
					numberEquals: value,
				})
				break
			case 'numberInList':
				setQueryInputs({
					...queryInputs,
					numberInList: value,
				})
				break
			case 'stringEquals':
				setQueryInputs({
					...queryInputs,
					stringEquals: value,
				})
				break
			case 'stringInList':
				setQueryInputs({
					...queryInputs,
					stringInList: value,
				})
				break
			case 'contains':
				setQueryInputs({
					...queryInputs,
					contains: value,
				})
				break
			case 'startsWith':
				setQueryInputs({
					...queryInputs,
					startsWith: value,
				})
				break
			case 'between1':
				setQueryInputs({
					...queryInputs,
					between1: value,
				})
				break
			case 'between2':
				setQueryInputs({
					...queryInputs,
					between2: value,
				})
				break
			case 'greaterThan':
				setQueryInputs({
					...queryInputs,
					greaterThan: value,
				})
				break
			case 'lessThan':
				setQueryInputs({
					...queryInputs,
					lessThan: value,
				})
				break
			default:
				throw new Error(`No case to update input value for input ${input}`)
		}
	}

	const buildQueryStatement = () => {
		const column = option.sql
		switch (operator.id) {
			case 'stringEquals':
				return `${column} = '${stringEquals}'`
			case 'numberEquals':
				return `${column} = ${numberEquals}`
			case 'startsWith':
				return `${column} LIKE '${startsWith}%'`
			case 'contains':
				return `${column} LIKE '%${contains}%'`
			case 'between':
				return `${column} BETWEEN ${between1} AND ${between2}`
			case 'greaterThan':
				return `${column} > ${greaterThan}`
			case 'lessThan':
				return `${column} < ${lessThan}`
			case 'stringInList':
				const stringItems = stringInList
					.split(' ')
					.map((item) => `'${item}'`)
					.toString()
				return `${column} IN (${stringItems})`
			case 'numberInList':
				const numberItems = numberInList
					.split(' ')
					.map((item) => `${item}`)
					.toString()
				return `${column} IN (${numberItems})`
			default:
				throw new Error(
					`Problem building query statement with option ${column}`
				)
		}
	}

	const operatorTemplate = () => {
		const value = operator.value
		switch (value) {
			case 'equals':
				return option.type === 'number' ? (
					<input
						placeholder={0}
						value={numberEquals}
						onChange={(event) =>
							onInputChange('numberEquals', event.target.value)
						}
					/>
				) : (
					<input
						placeholder='website.com'
						value={stringEquals}
						onChange={(event) =>
							onInputChange('stringEquals', event.target.value)
						}
					/>
				)
			case 'between':
				return (
					<>
						<input
							placeholder={0}
							value={between1}
							onChange={(event) =>
								onInputChange('between1', event.target.value)
							}
						/>
						<span className='and'>and</span>
						<input
							placeholder={0}
							value={between2}
							onChange={(event) =>
								onInputChange('between2', event.target.value)
							}
						/>
					</>
				)
			case 'greater than':
				return (
					<input
						placeholder={0}
						value={greaterThan}
						onChange={(event) =>
							onInputChange('greaterThan', event.target.value)
						}
					/>
				)
			case 'less than':
				return (
					<input
						placeholder={0}
						value={lessThan}
						onChange={(event) => onInputChange('lessThan', event.target.value)}
					/>
				)
			case 'in list':
				return option.type === 'number' ? (
					<input
						placeholder={0}
						value={numberInList}
						onChange={(event) =>
							onInputChange('numberInList', event.target.value)
						}
					/>
				) : (
					<input
						placeholder='website.com'
						value={stringInList}
						onChange={(event) =>
							onInputChange('stringInList', event.target.value)
						}
					/>
				)
			case 'contains':
				return (
					<input
						placeholder='website.com'
						value={contains}
						onChange={(event) => onInputChange('contains', event.target.value)}
					/>
				)
			case 'starts with':
				return (
					<input
						placeholder='website.com'
						value={startsWith}
						onChange={(event) =>
							onInputChange('startsWith', event.target.value)
						}
					/>
				)
			default:
				throw new Error(`No case for operator ${operator}`)
		}
	}

	const handleOptionChange = (event) => {
		const selectedValue = event.target.value
		const newOption = options.find((option) => option.value === selectedValue)
		setOption(newOption)
	}

	const handleOperatorChange = (value) => {
		const newOperator = operators.find((operator) => operator.value === value)
		setOperator(newOperator)
	}

	useEffect(() => {
		setOperators(option.type === 'string' ? stringOperators : numberOperators)
	}, [option])

	useEffect(() => {
		setOperator(operators[0])
	}, [operators])

	useEffect(() => {
		setQueryStatement(buildQueryStatement())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [queryInputs, option, operator])

	useEffect(() => {
		getSqlStatement(queryStatement, id)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [queryStatement])

	useEffect(() => {
		return () => {
			removeSqlStatement(id)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className='row'>
			<span className='removeButton' onClick={() => handleDeleteButton(id)}>
				x
			</span>
			<select className='row-options' onChange={handleOptionChange}>
				{optionsList}
			</select>
			{operator.value === 'between' ? <span className='is'>is</span> : ''}
			<select
				className='row-operators'
				onChange={(event) => handleOperatorChange(event.target.value)}
			>
				{operatorsList}
			</select>
			{operatorTemplate()}
		</div>
	)
}

export default Row
