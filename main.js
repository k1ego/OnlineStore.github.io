let activeTabId = 'goods'

const initialTab = getActiveTab()

initialTab.classList.add('active')

renderTabContentById(activeTabId)

// ---

const goodsInCart = []

const tabWithCounter = document.querySelector('button[data-goods-count]')

const tabs = document.querySelectorAll('button.tab')

addClickListeners(tabs, clickHandler)

// ---

function clickHandler(event) {
    const activeTab = getActiveTab()

    activeTab.classList.remove('active')
    event.target.classList.add('active')

    activeTabId = event.target.dataset.tabId

    removeActiveTabContent()

    renderTabContentById(activeTabId)
}

function addInCartHandler(product) {
    return () => {
        goodsInCart.push(product)
        tabWithCounter.dataset.goodsCount = goodsInCart.length
    }
}

function addClickListeners(elements, callback) {
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i]
        element.addEventListener('click', callback)
    }
}

function createProduct(product) {
    return {
			name: product.name ? product.name : 'Имя неизвестно',
			price: product.price ? product.price : 'Цена неизвестна',
			imgSrc: product.imgSrc ? product.imgSrc : 'sources/images/1.jpg',
		};
}

function getActiveTab() {
    return document.querySelector(`button[data-tab-id="${activeTabId}"]`)
}

function removeActiveTabContent() {
    const activeContent = document.querySelector(
        `[data-active-tab-content="true"]`
    )

    activeContent.remove()
}

function renderTabContentById(tabId) {
    const tabsContainer = document.querySelector('.tabs')
    if (tabId === 'goods') {
        const html = renderGoods()
        tabsContainer.after(html)
    } else {
        const html = renderCart()
        tabsContainer.insertAdjacentHTML('afterend', html)
    }
}

// рендерим товары
function renderGoods() {
    const div = document.createElement('div');
    div.dataset.activeTabContent = 'true';
    div.className = 'product-items';


    for (let i = 0; i < GOODS.length; i++) {
        const product = createProduct(GOODS[i]);
        
        const clickHandler = addInCartHandler(product);

        const button = document.createElement('button');
		button.className = 'button';
		button.textContent = 'В корзину';
		button.addEventListener('click', clickHandler);

        const productBlock = document.createElement('div');
		productBlock.className = 'product-item';
		productBlock.innerHTML = `
            <img src="${product.imgSrc}">
            <div class="product-list">
                <h3>${product.name}</h3>
                <p class="price">${product.price}</p>
            </div>
        `;
		productBlock.querySelector('.product-list').append(button);
        div.append(productBlock);

    }
    return div;
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
