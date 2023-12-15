const delete_btns = document.querySelectorAll('.dlt-btn');
console.log(delete_btns);

delete_btns.forEach((button) => {
	button.addEventListener('click', function () {
		// Get the data-id attribute to identify the item to delete
		const itemId = button.getAttribute('data-id');
		console.log(itemId);
		// Send a delete request to the server
		console.log(`/${itemId}`);
		fetch(`/${itemId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((res) => {
			console.log(res);
			window.location.href = '/';
		});
	});
});
