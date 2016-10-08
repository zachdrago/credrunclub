var db = new PouchDB('runners');


// Build Date & Time ID
var fullDate = new Date();
var month = fullDate.getMonth()+1;
var twoDigitMonth = month+"";if(twoDigitMonth.length==1)	twoDigitMonth="0" +twoDigitMonth;
var twoDigitDate = fullDate.getDate()+"";if(twoDigitDate.length==1)	twoDigitDate="0" +twoDigitDate;
var date = new Date();
var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
var dateCreated = twoDigitDate + "/" + twoDigitMonth + "/" + fullDate.getFullYear() + "|" + time;


// Destroy/Reset Entire DB
function addMiles() {
	$('#lightbox').lightbox_me({
		appearEffect: 'fadeIn',
        centered: false,
        showOverly: true,
        overlayCSS: {background: '#2e3641', opacity: 0.9},
        closeClick: true,
        lightboxSpeed: 'fast',
        modalCSS: {top: '15%'},
    });
	
	// var doc = {
	//   "_id": dateCreated,
	//   "name": "Kyle",
	//   "entries": [
	//     "0",
	//   ]
	// };
	// db.put(doc);
}


// Console Log All Documents In DB
// function showdb() {
	db.allDocs({include_docs: true}, function(err, doc) {
		console.log(doc.rows);
	});
// }


// Show All Documents
// function showDB() {
	db.allDocs({include_docs: true}, function(err, doc) {
		redrawRunners(doc.rows);
		// index();
		//numTodos = doc.total_rows;
	});
// }


// 2) Build DB Items & Add to DOM
function createRunnerListItem(runner) {

	var tr = document.createElement('tr');

    var tdname = document.createElement('td');
    tdname.id = runner._id;
	tdname.className = 'runner';
	tdname.innerHTML = runner.name;

	var tdmiles = document.createElement('td');
    tdmiles.id = runner._id;
	tdmiles.className = 'miles';
	tdmiles.innerHTML = runner.entries;

    tr.appendChild(tdname);
    tr.appendChild(tdmiles);

    return tr;
}

// 1) Build DB Items & Add to DOM
function redrawRunners(runners) {
	var table = document.getElementById('runner-list');
    //table.innerHTML = '';
    runners.forEach(function(runner) {
    	table.appendChild(createRunnerListItem(runner.doc));
    });
}
















// Destroy/Reset Entire DB
function reset() {
	db.destroy(function (err, response) {
		if (err) {
			return console.log(err);
		} else {
			$('.listitem').remove();
			db = new PouchDB('todos');
		}
	});
}