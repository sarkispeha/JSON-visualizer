var test_JSON = {
	meta: {
		_id : 123,
		createdTS: '12:12:12',
		updatedTS: '01:01:01',
		status: 'active',
		appspaces: {
			dataspaceid_1 : 1,
			dataspaceid_2: 2,
		}
	},
	data : {
		artist: 'joe',
		title: 'his statue',
		year: 2014,
		id: 32
	},
	appspace: {
		traily:{
				userXYZ:{
					session: 1,
					visit: true,
					rating: 5
			},
				userABC:{
					rating: 4,
					visit: true,
					rating: 3
			}
		},
		App2:{},
		App3:{},
		App4:{}
	}
}

module.exports = test_JSON;