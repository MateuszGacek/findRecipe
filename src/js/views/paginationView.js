import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
	_parentElement = document.querySelector('.pagination');

	_addHandlerClick(handle) {
		this._parentElement.addEventListener('click', function (e) {
			const btn = e.target.closest('.btn--inline');
			if (!btn) return;

			const goToPage = +btn.dataset.goto;
			handle(goToPage);
		});
	}

	_generateMarkupBtnNext() {
		return `
		<button data-goto="${
			this._data.page + 1
		}" class="btn--inline pagination__btn--next">
		<span>Page ${this._data.page + 1}</span>
		<svg class="search__icon">
		  <use href="${icons}#icon-arrow-right"></use>
		</svg>
	  </button>
	  `;
	}
	_generateMarkupBtnPrev() {
		return `
		<button data-goto="${
			this._data.page - 1
		}" class="btn--inline pagination__btn--prev">
		<svg class="search__icon">
		  <use href="${icons}#icon-arrow-left"></use>
		</svg>
		<span>Page ${this._data.page - 1}</span>
	  </button>
		`;
	}

	_generateMarkup() {
		const numPages = Math.ceil(
			this._data.result.length / this._data.resultPerPage
		);

		if (this._data.page === 1 && numPages > 1) {
			return this._generateMarkupBtnNext();
		}

		if (this._data.page === numPages && numPages > 1) {
			return this._generateMarkupBtnPrev();
		}
		if (this._data.page < numPages) {
			return this._generateMarkupBtnPrev() + this._generateMarkupBtnNext();
		}

		return ``;
	}
}

export default new PaginationView();
