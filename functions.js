module.exports = {
	changePage: function(currentPage){
		setTimeout(() => {
			this.setState({
				currentPage: currentPage,
			})
		},25);
	},
	updatePreviousPage: function(previousPage){
		this.setState({
			previousPage: previousPage,
		});
	},
	
}