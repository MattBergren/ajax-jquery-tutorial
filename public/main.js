
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
					<span class="lead">
						${data.text}
					</span>
					<div class="pull-right">
						<a href="/todos/${data._id}/edit" class="btn btn-sm btn-warning">Edit</a>
						<form style="display: inline" method="POST" action="/todos/${data._id}">
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
							<label>Item Text</label>
							<input type="text" value="${data.text}" name="todo[text]" class="form-control">
						</div>
						<button class="btn btn-primary">Update Item</button>
					</form>
					<span class="lead">
						${data.text}
					</span>
					<div class="pull-right">
						<button class="btn btn-sm btn-warning edit-btn">Edit</button>
						<form style="display: inline" method="POST" action="/todos/${data._id}">
							<button type="submit" class="btn btn-sm btn-danger">Delete</button>
						</form>
					</div>
					<div class="clearfix"></div>
                
                `
            );
        }
    });

});


// DELETE TODO
// $('form').on('submit', function (e) {
//     e.preventDefault();
//     var formAction = $(this).attr('action');
//     $.ajax({
//         url: formAction,
//         type: 'DELETE',
//         success: function (data) {
//             console.log(data);
//         }
//     });

// });