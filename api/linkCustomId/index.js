const { PlayFabClient } = require('playfab-sdk');

module.exports = function (context, req) {
	var request = {
		TitleId: '8EA26',
		CustomId: req.body.id,
		ForceLink: true,
		headers: {
			'X-authentication': req.body.session,
		},
	};
	PlayFabClient.settings.titleId = '8EA26';
	PlayFabClient.LinkCustomID(request, function (error, result) {
		if (error == null) {
			context.res = { body: result.data };
			context.done();
		} else {
			context.res = { body: error };
			context.done();
		}
	});
};
