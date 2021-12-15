'use strict',
document.getElementById('searchBtn').addEventListener('click',function(){
  let search = document.getElementById('search')
  let nowPage =1
  let totalPage=0;
  if(search.value){
    searchMovie(nowPage)
  }else{
    alert('Please enter the search term :)')
  }
})

document.getElementById('resetBtn').addEventListener('click', function () {
  document.getElementById('search').value= ''
  document.getElementById('type').value = 'movie'
})

function searchMovie(nowPage){
  let search = document.getElementById('search')
  let type = document.getElementById('type')
  let url = 'https://www.omdbapi.com/?s=' + search.value + '&type=' + type.value + '&apikey=130d2b6b&page=' + nowPage
      $.getJSON(url,function(result){
        if (result.Response=='True'){
          console.log(result)
          document.getElementById('result').innerHTML=''
          for(let movie of result.Search){
            let ul = document.createElement('ul')
            let li = `
              <img src="${movie.Poster}" alt="${movie.Title}">
              <li>Title: ${movie.Title}</li>
              <li>Type: ${movie.Type}</li>
              <li>year: ${movie.Year}</li>
              <li><a href="https://www.imdb.com/title/${movie.imdbID}">View on IMDb</a></li>
            `
            ul.innerHTML=li
            document.getElementById('result').appendChild(ul)
          }
          if (result.totalResults>10){
            let totalPage = Math.round(result.totalResults/10)
            document.getElementById('pager').innerHTML = ''
            nowPage = parseInt(nowPage)
            if (nowPage>1){
              let prePage =`<button type="button" id='prePage'>&#9666 Previous</button>`
              document.getElementById('pager').innerHTML += prePage
            }
            
            if (totalPage<10){
              pageLoop(1, totalPage, nowPage)
            }else{
              if (nowPage > 5 && nowPage < totalPage-4){
                pageLoop(1, 2, nowPage)
                let  skip = `<p class='skip'>...</p>`
                document.getElementById('pager').innerHTML += skip
                pageLoop(nowPage - 3, nowPage, nowPage)
                if (nowPage < totalPage - 5) {
                  pageLoop(nowPage + 1, nowPage + 3, nowPage)
                  let skip = `<p class='skip'>...</p>`
                  document.getElementById('pager').innerHTML += skip
                  pageLoop(totalPage - 1, totalPage, nowPage)
                } else {
                  pageLoop(nowPage + 1, totalPage, nowPage)
                }
              } else {
                if (nowPage<=4){
                  pageLoop(1, 7, nowPage)
                  let skip = `<p class='skip'>...</p>`
                  document.getElementById('pager').innerHTML += skip
                  pageLoop(totalPage - 1, totalPage, nowPage)
                } else if (nowPage >= totalPage-4){
                  pageLoop(1, 2, nowPage)
                  let skip = `<p class='skip'>...</p>`
                  document.getElementById('pager').innerHTML += skip
                  pageLoop(totalPage - 7, totalPage, nowPage)
                }else{
                  pageLoop(1, nowPage, nowPage)
                  pageLoop(nowPage + 1, nowPage + 3, nowPage)
                  let skip = `<p class='skip'>...</p>`
                  document.getElementById('pager').innerHTML += skip
                  pageLoop(totalPage - 1, totalPage, nowPage)
                }
              }
            }
            if (nowPage < totalPage){
              let nextPage = `<button type="button" id='nextPage'>&#9656 Next</button>`
              document.getElementById('pager').innerHTML += nextPage
            }
            $('span.page').on('click', function () {
              searchMovie($(this).text())
            })
            $('#prePage').on('click',function(){
              nowPage -= 1
              searchMovie(nowPage)
            })
            $('#nextPage').on('click', function () {
              nowPage += 1
              searchMovie(nowPage)
            })
          }
        }else{
          console.log(result.Error)
          let err = `<h3>${result.Error}</h3>`
          document.getElementById('result').innerHTML = ''
          document.getElementById('result').innerHTML = err
          document.getElementById('pager').innerHTML = ''
          
        }
      })
      .fail(function(err){
        console.log(err)
      })
      .always(function(){
        
      })
    }
    
function pageLoop(start,totalPage, page){
  for (let n = start; n <= totalPage; n++) {
    if (n === page) {
      let pager = `<span class='current'>${n}</span>`
      document.getElementById('pager').innerHTML += pager
    } else {
      let pager = `<span class='page'>${n}</span>`
      document.getElementById('pager').innerHTML += pager
      
    }
  }  
}
