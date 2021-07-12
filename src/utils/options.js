export const options = [
	{ value: 'User Email', type: 'string', id: 'userEmail', sql: 'user_email' },
	{
		value: 'Screen Width',
		type: 'number',
		id: 'screenWidth',
		sql: 'screen_width',
	},
	{
		value: 'Screen Height',
		type: 'number',
		id: 'screenHeight',
		sql: 'screen_height',
	},
	{ value: '# of Visits', type: 'number', id: '#ofVisits', sql: 'visits' },
	{ value: 'First Name', type: 'string', id: 'firstName', sql: 'first_name' },
	{ value: 'Last Name', type: 'string', id: 'lastName', sql: 'last_name' },
	{
		value: 'Page Response time (ms)',
		type: 'number',
		id: 'pageResponseTime',
		sql: 'page_response',
	},
	{ value: 'Domain', type: 'string', id: 'domain', sql: 'domain' },
	{ value: 'Page Path', type: 'string', id: 'pagePath', sql: 'path' },
]

//Define number operators
export const numberOperators = [
	{ value: 'equals', id: 'numberEquals' },
	{ value: 'between', id: 'between' },
	{ value: 'greater than', id: 'greaterThan' },
	{ value: 'less than', id: 'lessThan' },
	{ value: 'in list', id: 'numberInList' },
]

//Define string operators
export const stringOperators = [
	{ value: 'equals', id: 'stringEquals' },
	{ value: 'contains', id: 'contains' },
	{ value: 'starts with', id: 'startsWith' },
	{ value: 'in list', id: 'stringInList' },
]
