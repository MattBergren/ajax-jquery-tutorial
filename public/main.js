
// NEW TODO
$('#new-todo').on('submit', function(e){
    e.preventDefault();

    var formData = $(this).serialize();
    var formAction = $(this).attr('action');

    $.ajax({
        url: formAction,
        data: formData,
        type: 'POST',
        success: function(data){
            $('#todo-list').append(
            `
                <li class="list-group-item">
                    <form class="edit-item-form" action="/todos/${data._id}" method="POST">
                        <div class="form-group">
                            <label for="${data._id}">Item Text</label>
                            <input id="${data._id}" type="text" value="${data.text}" name="todo[text]" class="form-control">
                        </div>
                        <button class="btn btn-primary">Update Item</button>
                    </form>
					<span class="lead">
						${data.text}
					</span>
					<div class="pull-right">
                        <button class="btn btn-sm btn-warning edit-btn">Edit</button>
						<form class="delete-item-form" style="display: inline" method="POST" action="/todos/${data._id}">
							<button type="submit" class="btn btn-sm btn-danger">Delete</button>
						</form>
					</div>
					<div class="clearfix"></div>
				</li>
            `
            );
            $('#new-todo').find('.form-control').val('');
        }
    });
    

});


// UPDATE TODO
$('#todo-list').on('click', '.edit-btn', function(){
    $(this).parent().siblings('.edit-item-form').toggle();
});

// todo-list is selected because its on the page before adding list item
$('#todo-list').on('submit', '.edit-item-form', function(e){
    e.preventDefault();
    var formData = $(this).serialize();
    var formAction = $(this).attr('action');
    var $originalItem = $(this).parent('.list-group-item');
    $.ajax({
        url: formAction,
        data: formData,
        type: 'PUT',
        originalItem: $originalItem,
        success: function(data){
            this.originalItem.html(
                `
                    <form class="edit-item-form" action="/todos/${data._id}" method="POST">
						<div class="form-group">
							<label for="${data._id}">Item Text</label>
							<input id="${data._id}" type="text" value="${data.text}" name="todo[text]" class="form-control">
						</div>
						<button class="btn btn-primary">Update Item</button>
					</form>
					<span class="lead">
						${data.text}
					</span>
					<div class="pull-right">
						<button class="btn btn-sm btn-warning edit-btn">Edit</button>
						<form class="delete-item-form" style="display: inline" method="POST" action="/todos/${data._id}">
							<button type="submit" class="btn btn-sm btn-danger">Delete</button>
						</form>
					</div>
					<div class="clearfix"></div>
                
                `
            );
        }
    });

});

//DELETE TODO
$('#todo-list').on('submit', '.delete-item-form', function(e){
    e.preventDefault();
    var confirmResponse = confirm('are you sure you want to delete?');
    if (confirmResponse) {
        var formAction = $(this).attr('action');
        var $itemToDelete = $(this).closest('.list-group-item');
        $.ajax({
            url: formAction,
            type: 'DELETE',
            itemToDelete: $itemToDelete,
            success: function (data) {
                this.itemToDelete.remove();
            }
        });
    } else {
        this.find('button').blur();
    }
});    

// Search functionality

$('#search').on('input', function (e) {
    e.preventDefault();
    $.ajax({
        url: '/todos?keyword=' + encodeURIComponent(e.target.value),
        type: 'GET',
        success: function (data) {
            $('#todo-list').html('');
            data.forEach(function (todo) {
                $('#todo-list').append(
                    `
				<li class="list-group-item">
					<form action="/todos/${todo._id}" method="POST" class="edit-item-form">
						<div class="form-group">
							<label for="${todo._id}">Item Text</label>
							<input type="text" value="${todo.text}" name="todo[text]" class="form-control" id="${todo._id}">
						</div>
						<button class="btn btn-primary">Update Item</button>
					</form>
					<span class="lead">
						${todo.text}
					</span>
					<div class="pull-right">
						<button class="btn btn-sm btn-warning edit-button">Edit</button>
						<form style="display: inline" method="POST" action="/todos/${todo._id}" class="delete-item-form">
							<button type="submit" class="btn btn-sm btn-danger">Delete</button>
						</form>
					</div>
					<div class="clearfix"></div>
				</li>
				`
                );
            });
        }
    });
});