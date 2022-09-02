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
            <button onclick="getCategory(${element.category_id})" class="fw-semibold item border-0">${element.category_name}</button>
        `
        listContainer.appendChild(li)
    })
}
const getCategory = id =>{
    console.log(id)
}
loadData()