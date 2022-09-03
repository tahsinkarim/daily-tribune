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
            <button onclick="getNewsCategory(${element.category_id}, '${element.category_name}')" class="btn my-1 fw-semibold item border-0">
                ${element.category_name}
            </button>
        `
        listContainer.appendChild(li)
    })
}
const getNewsCategory = async (id , name) =>{
    toggleSpinner(true)
    if(id < 10){
        id = '0' + id
    }
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    const res = await fetch(url)
    const data = await res.json()
    
    return displayNews(data.data, name)
}

const displayNews = (data, name) =>{
    
    const newsItemsCount = document.getElementById('news-items-count')
    const noNews= document.getElementById('no-news')
    if (data.length === 0){
        newsItemsCount.innerText = `No news found for category ${name}`
        noNews.classList.remove('d-none')
        toggleSpinner(false)
    } else {
        newsItemsCount.innerText = `${data.length} items found for category ${name}`
        noNews.classList.add('d-none')
    }
    
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    const sortedArray = data.sort((a,b) => (a.total_view < b.total_view) ? 1 : -1)
    
    sortedArray.forEach(element =>{
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
                        <div class="card-text d-flex flex-column flex-md-row justify-content-between align-items-center">
                            <div class="blog-info-container d-flex align-items-center mb-3">
                                <div>
                                    <p class="mb-0 fw-semibold">${checkName(element.author.name)}</p>
                                </div>
                            </div>
                            <div class="fw-bold mb-3 ">
                                <i class="fa-regular fa-eye"></i>
                                <span class="mb-0 ms-3">${element.total_view === null ? "Not Available" : element.total_view}</span>
                            </div>
                            <div class="mb-3">
                                <div 
                                    type="button" 
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal" 
                                    onclick="loadDetails('${element._id}')" 
                                    class="fs-3 iris-text"
                                    ><i class="fa-solid fa-arrow-right"></i>
                                </div>
                            </div>
                        </div>
                    </div>
              </div>
        </div>
        `
        cardContainer.appendChild(div)
    })
    toggleSpinner(false)
}

const checkName = input => input === 'system' | input === null | input === '' ? "No author available" : input ;
const truncate = input => input.length > 5 ? `${input.substring(0, 400)}...` : input;

const loadDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/news/${id}`
    const res = await fetch(url)
    const data = await res.json()
    return displayDetails(data.data[0])
}

const displayDetails = data =>{
    console.log(data)

    const modalBody = document.getElementById('modal-body')
    modalBody.innerHTML = `
    <img src="${data.image_url}" class="img-fluid rounded-0 mb-2" alt="..." />
    <div>
        <h2>${data.title}</h2>
        <small class="fw-semibold" >Author: ${checkName(data.author.name)}</small>
        <small></small>
        <p class="my-3">${data.details}</p>
    </div>
    <div class="d-flex justify-content-between mx-3">
        <div class="fw-bold mb-3 text-muted">
            <i class="fa-regular fa-eye"></i>
            <span class="mb-0 ms-3">${data.total_view === null ? "Not Available" : data.total_view}</span>
        </div>
        <div class="fw-semibold text-muted">
            <p>Rating: ${data.rating.number}</p>
        </div>
    </div>


    `
}

const toggleSpinner = isLoading =>{
    const spinner = document.getElementById('spinner')
    if(isLoading){
        spinner.classList.remove('d-none')
    } else {
        spinner.classList.add('d-none')
    }
} ;

getNewsCategory(08, 'All News')
loadData()