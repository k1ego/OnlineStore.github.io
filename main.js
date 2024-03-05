let activeTabId = 'goods'

const initialTab = getActiveTab()

initialTab.classList.add('active')

renderTabContentById(activeTabId);

// ---

const tabs = document.querySelectorAll('button.tab')

for (let i = 0; i < tabs.length; i++) {
	const tab = tabs[i]

	tab.addEventListener('click', clickHandler)
}

function clickHandler(event) {
	const activeTab = getActiveTab()

	activeTab.classList.remove('active')
	event.target.classList.add('active')

	activeTabId = event.target.dataset.tabId

	removeActiveTabContent()

	renderTabContentById(activeTabId);
}

function getActiveTab() {
	return document.querySelector(`button[data-tab-id="${activeTabId}"]`)
}

function removeActiveTabContent(){
    const activeContent = document.querySelector(
			`[data-active-tab-content="true"]`
		);

		activeContent.remove();
}


function renderTabContentById(tabId) {
    const tabsContainer = document.querySelector('.tabs')
    let html = '';
	if (tabId === 'goods') {
		html = renderGoods();
	} else {
		html = renderCart();
	}
    tabsContainer.insertAdjacentHTML('afterend', html)
}

// рендерим товары
function renderGoods() {
	return `
    <div data-active-tab-content="true" class="product-items">
        <div class="product-item">
            <img src="sources/images/bmw1.jpg">
            <div class="product-list">
                <h3>BMW m8</h3>
                <p class="price">₽ 300</p>
                <button class="button">В корзину</button>
            </div>
        </div>

        <div class="product-item">
            <img src="sources/images/bmw2.jpg">
            <div class="product-list">
                <h3>BMW m3</h3>
                <p class="price">₽ 150</p>
                <button class="button">В корзину</button>
            </div>
        </div>

        <div class="product-item">
            <img src="sources/images/bmw3.jpg">
            <div class="product-list">
                <h3>BMW m5</h3>
                <p class="price">₽ 260</p>
                <button class="button">В корзину</button>
            </div>
        </div>
    </div>
	`
}

// рендерим корзину
function renderCart() {
	return `
    <div data-active-tab-content="true" class="cart-items">
        <div class="cart-item">
            <div class="cart-item-title">BMW m8</div>
            <div class="cart-item-count">3шт.</div>
            <div class="cart-item-price">₽ 150</div>
        </div>

        <div class="cart-item">
            <div class="cart-item-title">BMW m3</div>
            <div class="cart-item-count">1шт.</div>
            <div class="cart-item-price">₽ 450</div>
        </div>

        <div class="cart-item">
            <div class="cart-item-title">BMW m5</div>
            <div class="cart-item-count">6шт.</div>
            <div class="cart-item-price">₽ 550</div>
        </div>
    </div>
	`
}
