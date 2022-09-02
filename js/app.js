const loadData = async () =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url)
    const data = await res.json()
    return displayCategories(data.data.news_category)
}

const displayCategories = data =>{
    const listContainer = document.getElementById('list-container')
    data.forEach(element =>{
        const li = document.createElement('li')
        li.innerHTML = `
            <button onclick="getNewsCategory(${element.category_id}, '${element.category_name}')" class="btn my-1 fw-semibold item border-0">${element.category_name}</button>
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
    return displayNewsCategory(data.data, name)
}

const displayNewsCategory = (data, name) =>{
    const newsItemsCount = document.getElementById('news-items-count')
    if (data.length === 0){
        newsItemsCount.innerText = `No news found for category ${name}`
    } else {
        newsItemsCount.innerText = `${data.length} items found for category ${name}`
    }
    
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    data.forEach(element =>{
        const div = document.createElement('div');
        div.classList.add('card', 'my-4', 'rounded-3');
        div.innerHTML = `
        <div class="row g-0 p-3">
              <div class="col-md-4 image-container">
                <img src="${element.thumbnail_url}" class="img-fluid rounded-0" alt="..." />
              </div>
              <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title fw-bold">${element.title}</h5>
                        <p class="card-text mt-4">${truncate(element.details)}</p>
                        <div class="card-text d-flex justify-content-between align-items-center">
                            <div class="blog-info-container d-flex align-items-center">
                                <div>
                                    <p class="mb-0 fw-semibold">${checkName(element.author.name)}</p>
                                </div>
                            </div>
                            <div class="fw-bold">
                                <p class="mb-0">${element.total_view === null ? "Not Available" : element.total_view}</p>
                            </div>
                            <button onclick="displayDetails('${element._id}')" class="btn btn-primary">Details</button>
                        </div>
                    </div>
              </div>
        </div>
        `
        cardContainer.appendChild(div)

    })
    
}

const checkName = input => input === 'system' | input === null ? "No author available" : input ;
const truncate = input => input.length > 5 ? `${input.substring(0, 400)}...` : input;

const displayDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/news/${id}`
    const res = await fetch(url)
    const data = await res.json()
    console.log(data.data[0])
}

getNewsCategory(08, 'All News')
loadData()