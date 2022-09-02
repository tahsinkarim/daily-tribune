const loadData = async () =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url)
    const data = await res.json()
    displayCategories(data.data.news_category)
}

const displayCategories = data =>{
    const listContainer = document.getElementById('list-container')
    data.forEach(element =>{
        const li = document.createElement('li')
        li.innerHTML = `
            <button onclick="getNewsCategory(${element.category_id}, '${element.category_name}')" class="fw-semibold item border-0">${element.category_name}</button>
        `
        listContainer.appendChild(li)
    })
}
const getNewsCategory = async (id , name) =>{
    if(id < 10){
        id = '0' + id
    }
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayNewsCategory(data.data, name)
}

const displayNewsCategory = (data, name) =>{
    const newsItemsCount = document.getElementById('news-items-count')
    if (data.length === 0){
        newsItemsCount.innerText = `No news found for category ${name}`
    } else {
        newsItemsCount.innerText = `${data.length} items found for category ${name}`
    }
}
getNewsCategory(01, 'Breaking News')
loadData()