module.exports.chat = (req, res) => {
	
	let formData = req.body;
	let value = '';

	// Testing if user only typed spaces
	if(req.body.nickname){
		value = req.body.nickname;
		value = value.replace(/\s/g, '');
		
		if(value.length < 3)
			req.body.nickname = value;
	}

	// user name validations
	req.assert('nickname','Nickname must not be empty').notEmpty();
	req.assert('nickname','Nickname must have between 3 and 15 characters').len(3,15);

	let errors = req.validationErrors();

	if(errors){
		res.render("index",{validation : errors});
		return;
	}

	res.render('chat', {formData : formData});
}