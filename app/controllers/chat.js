module.exports.chat = (req, res) => {
	
	let formData = req.body;

	req.assert('nickname','Nickname must not be empty').notEmpty();
	req.assert('nickname','Nickname must have between 3 and 15 characters').len(3,15);

	let errors = req.validationErrors();

	if(errors){
		res.render("index",{validation : errors});
		return;
	}

	res.render('chat', {formData : formData});
}