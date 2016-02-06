var entries = [];

var temp = '';
$("button").on('click', function() {
 	var val = $(this).text();


  if (!isNaN(val) || val === '.') {
    temp += val;
    $("#result").val(temp.substring(0,10));
    

  } else if (val === 'AC') {
    entries = [];
    temp = '';
    $("#result").val('')

  } else if (val === 'CE') {
    temp = '';
    $("#result").val('')

  } else if (val === 'x') {
    entries.push(temp);
    entries.push('*');
    temp = '';

  } else if (val === '÷') {
    entries.push(temp);
    entries.push('/');
    temp = '';

  } else if (val === '=') {
  	entries.push(temp);
    var Total = eval(entries.join('').substring(0, 10))
    $("#result").val(Total);
		entries = [];
    temp = '';

  } else {
    entries.push(temp);
    entries.push(val);
    temp = '';
  }
});