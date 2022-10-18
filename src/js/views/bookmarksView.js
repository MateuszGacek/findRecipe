import View from './View.js';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
	_parentElement = document.querySelector('.bookmarks__list');
	_errorMassage = `No bookmarks yet :)`;
	_message = 'Success msg';

	_generateMarkup() {
		return this._data.map(this._generateMarkupPreview).join('');
	}

	addHandlerRender(handler) {
		window.addEventListener('load', handler);
	}

	_generateMarkupPreview(result) {
		const id = window.location.hash.slice(1);

		return `
        <li class="preview">
            <a class="preview__link ${
							result.id === id ? 'preview__link--active' : ''
						}" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="${result.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
              </div>
			  <div class="preview__user-generated ${result.key ? '' : 'hidden'}">
			  <svg>
				<use href="${icons}#icon-user"></use>
			  </svg>
			  </div>
            </a>
          </li>
        `;
	}
}

export default new BookmarksView();
