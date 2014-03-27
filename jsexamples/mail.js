var from='test@unil.ch';
var to='luc.patiny@epfl.ch';
var title='test';
var content='content';
var options={
		smtpServer:"mail.epfl.ch"
};
var result=Util.sendEmail(from, to, title, content, options);

jexport("result",result);