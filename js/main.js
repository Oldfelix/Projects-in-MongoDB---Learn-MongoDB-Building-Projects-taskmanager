$(document).ready(function(){
	getTasks();
	getCategoryOptions();
	
	
	$('#add_task').on('submit', addTask);
	
	$('body').on('click', '.btn-edit-task', setTask);
});

const apiKey = 'UCYt3JHKKaBLImia_w5xPLXZTQgGZVVp';

function getTasks(){
	$.get('https://api.mlab.com/api/1/databases/jimstaskmanager/collections/tasks?apiKey='+apiKey, function(data){
	var output = '<ul class="list-group">';
		$.each(data, function(key, task){
			output += '<li class="list-group-item">';
			output += task.task_name+'<span class="due_on">[Due on '+task.due_date+']</span'
			if(task.is_urget == "true"){
				output += '<span class="label label-danger">Urgent</span>'
			}
			output += '<div class="pull-right"><a class="btn btn-primary btn-edit-task" data-task-name=""'+task.task_name+'" data-task-id="'+task._id.$oid+'">Edit</a> <a class="btn btn-danger" href="#">Delete</a></div>'
		});
		output += '</ul>';
		$('#tasks').html(output)
	});	
}	

function addTask(e){
	var task_name = $('#task_name').val();
	var category = $('#category').val();
	var due_date = $('#due_date').val();
	var is_urget = $('#is_urget').val();
	
	$.ajax({
		url:'https://api.mlab.com/api/1/databases/jimstaskmanager/collections/tasks?apiKey='+apiKey, 
		data: JSON.stringify({
			"task_name": task_name,
			"category": category,
			"due_date": due_date,
			"is_urget": is_urget
		}),
		type:'POST',
		contentType:'application/json',
		success: function(data){
			window.location.href='index.html';
		},
		error: function(xhr, status, err){
			console.log(err);
		}
	});
	e.preventDefault();
}

function setTask(){
	var task_id = $(this).data('task-id');
	sessionStorage.setItem('current_id', task_id);
	window.location.href='edittask.html';
	return false;
}

function getCategoryOptions(){
	$.get('https://api.mlab.com/api/1/databases/jimstaskmanager/collections/categories?apiKey='+apiKey, function(data){
	var output;
	$.each(data, function(key, category){
		output += '<option value="'+category.category_name+'">'+category.category_name+'</option>';
	});
	output += '</ul>';
	$('#category').append(output)
	});	
}	