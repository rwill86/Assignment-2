module.exports = function(app, formidable){
	 app.post('/api/upload', (req, res) => {
		 var form = new formidable.IncomingForm({uploadDir: './userimages'});
		 form.keepExtenions = true;
		 
		 form.on('error', function(err){
			 if(err){
			     throw err;
			 }
			 res.send({
				 result:'failed',
				 data:{},
				 numberOfImages:0,
				 message:'Cannot upload images. Error is :' + err
			 });
		 });
		 
		 form.on('fileBegin', function(name, file){
			 file.path = form.uploadDir + '/' + file.name;
		 });
		 
		 form.on('file', function(field, file){
			 res.send({
				 result:'OK',
				 data:{'filename':file.name, 'size':file.size},
				 numberOfImages:1,
				 message:'upload successful' 
			 });
		 });
		 form.parse(req);
	 });
}
