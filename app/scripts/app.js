$(document).ready(function() {

var listo = [];

$('#newTaskForm').hide();

// Task constructor to be stored in listo
var Task = function(task) {
	this.task = task;
	this.id = 'new';
};
// saves to local storage
var save = function() {
	localStorage.listo = JSON.stringify(listo);
};
// loads the array back into listo from local storage then adds the tasks on the page 
var load = function() {
	listo = JSON.parse(localStorage.listo);

	for (var i = 0; i < listo.length; i++) {
		if (listo[i].id === 'new') {
			$('#newList').append('<a href="#finish" id="item"><li class="list-group-item">' + listo[i].task + '<span class="icon-arrow-right"></span></li></a>');
		} else if (listo[i].id === 'inProgress') {
			$('#currentList').append('<a href="#finish" id="inProgress"><li class="list-group-item">' + listo[i].task + '<span class="icon-box-remove"></span></li></a>');
		} else if (listo[i].id === 'archived') {
			$('#archivedList').append('<a href="#finish" id="archived"><li class="list-group-item">' + listo[i].task + '<span class="icon-remove"></i></span></li></a>');
		}
	}
};

if (localStorage.listo) { 
    load();
}

var addTask = function(task) {
	if (task) {
		task = new Task(task);
		listo.push(task);
		save();

		$('#newItemInput').val('');
		$('#newList').append('<a href="#" class"" id="item"><li class="list-group-item">' + task.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
	}
	$('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
};

var advanceTask = function(task) {
	var modified = task.innerText.trim();
	for (var i = 0; i < listo.length; i++) {
		if (listo[i].task === modified) {
			if (listo[i].id === 'new') {
				listo[i].id = 'inProgress';
			} else if (listo[i].id === 'inProgress') {
				listo[i].id = 'archived';
			} else {
				listo.splice(i, 1);
			}
			save();
			break;
		}
	}
	task.remove();
};
// saves the array list

// listener lists
$('#saveNewItem').on('click', function(e) {
	e.preventDefault();
	var task = $('#newItemInput').val().trim();
	addTask(task);
});

//opens form
$('#newListItem').on('click', function() {
	$('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
});
//closes form
$('#cancel').on('click', function(e) {
	e.preventDefault();
	$('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
});


$(document).on('click', '#item', function(e) {
	e.preventDefault();
	var task = this;
	advanceTask(task);
	this.id = 'inProgress';
	$('#currentList').append(this.outerHTML);
});


$(document).on('click', '#inProgress', function(e) {
	e.preventDefault();
	var task = this;
	task.id = "archived";
	var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
	advanceTask(task);
	$('#archivedList').append(changeIcon);
});


$(document).on('click', '#archived', function(e) {
	e.preventDefault();
	var task = this;
	advanceTask(task);
});



});