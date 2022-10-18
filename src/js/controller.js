import 'core-js/stable';
import { async } from 'regenerator-runtime';
import { modalCloseSec } from './config.js';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';

if (module.hot) {
	module.hot.accept();
}

const controlRecipes = async function (e) {
	try {
		const id = window.location.hash.slice(1);
		if (!id) return;
		recipeView.renderSpinner();

		resultView.render(model.getSerachResultPage());
		await model.loadRecipe(id);

		recipeView.render(model.state.recipe);
		bookmarksView.update(model.state.bookmarks);
	} catch (err) {
		recipeView.renderError();
	}
};

const controlSearchResult = async function () {
	try {
		const query = searchView.getQuery();
		if (!query) return;
		resultView.renderSpinner();
		await model.loadSearchResults(query);
		searchView.clearInput();
		resultView.render(model.getSerachResultPage());
		paginationView.render(model.state.search);
	} catch (err) {
		console.log(err);
	}
};

const controlPagination = function (goToPage) {
	resultView.render(model.getSerachResultPage(goToPage));
	paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
	model.updateServings(newServings);

	// recipeView.render(model.state.recipe);
	recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
	if (!model.state.recipe.bookmarked) {
		model.addBookmark(model.state.recipe);
	} else {
		model.removeBookmark(model.state.recipe.id);
	}
	recipeView.update(model.state.recipe);

	bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
	bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
	try {
		await model.uploadRecipe(newRecipe);

		recipeView.render(model.state.recipe);
		addRecipeView.renderMessage();

		window.history.pushState(null, '', `#${model.state.recipe.id}`);

		setTimeout(function () {
			addRecipeView.toggleWindow();
		}, modalCloseSec);
	} catch (err) {
		console.log(err);
		addRecipeView.renderError(err.message);
	}
};

const init = function () {
	recipeView.addHandlerRender(controlRecipes);
	recipeView.addHandlerUpdateServings(controlServings);
	recipeView.addHandlerAddBookmark(controlAddBookmark);
	searchView.addHandlerSearch(controlSearchResult);
	paginationView._addHandlerClick(controlPagination);
	bookmarksView.addHandlerRender(controlBookmarks);
	addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();

const clearBookmarks = function () {
	localStorage.clear('bookmarks');
};
