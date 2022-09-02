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
            <button onclick="getNewsCategory(${element.category_id})" class="fw-semibold item border-0">${element.category_name}</button>
        `
        listContainer.appendChild(li)
    })
}
const getNewsCategory = async (id) =>{
    if(id < 10){
        id = '0' + id
    }
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayNewsCategory(data.data)
}

const displayNewsCategory = data =>{
    console.log(data)
}
loadData()