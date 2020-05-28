const { PlayFabClient } = require('playfab-sdk');

module.exports = function (context, req) {
	var request = {
		Email: req.body.email,
		Password: req.body.password,
		RequireBothUsernameAndEmail: false,
	};
	PlayFabClient.settings.titleId = '266B3';
	PlayFabClient.RegisterPlayFabUser(request, function (error, result) {
		if (error == null) {
			context.res = { body: result.data };
			context.done();
		} else {
			context.res = { body: error };
			context.done();
		}
	});
};
