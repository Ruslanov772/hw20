document.addEventListener('DOMContentLoaded', () => {
    const arr = document.querySelector('.wrapper');
    const prev = document.querySelector('#prev')
    const next = document.querySelector('#next')
    let count = 0;
    let limit = 5;


    const renderData = coins => {
        console.log(coins);
        coins.forEach(coinItem => {
            const arc = document.createElement('article');
            arc.className = 'coins';
            arc.innerHTML = `
                <img src="${coinItem['icon']}" alt="">
                    <div class="coins__name">
                        <h5>${coinItem['name']}</h5>
                        <p>${ (coinItem['priceBtc']).toFixed(3)} ${coinItem['symbol']} · $ ${Math.round(coinItem['price'])}</p>
                    </div>
                 <div class="coin__price">$ ${Math.round(coinItem['volume'] / 1000000000)}</div>
            `;
            arr.append(arc)
        })
    }

    const getData = async () => {
        try {
            const resp = await fetch(
                `https://api.coinstats.app/public/v1/coins?skip=${count}&limit=${limit}`
        )
            const data = await resp.json()
            const { coins } = data
            renderData(coins)
        } catch (e) {
            console.log(`Ошибка - ${e}`)
        }
    }
    getData()

    prev.addEventListener('click', () => {
        if (count !== 0) {
            count -= limit
            getData()
        }
    })

    next.addEventListener('click', () => {
        count += limit
        getData()
    })

})