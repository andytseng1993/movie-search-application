# Note

- `window.addEventListener('load',function(){})`: after page loading, will do the function.
- `.focus()`: sets focus on the specified element and it will receive keyboard.
- `.blur()` : removes keyboard focus from the current element.
- `.addEventListener('keydown',function(event){if (event.key =='Enter')}`: The keydown event is fired when a key is pressed and use event.key to set the keyboard which we want.
- `event.preventDefault()`: prevent the form submit the data

- Resolve the last row (flex box): create 4 ul with the class "fillingEmpty", and set same width as other ul and set 0 height. The container set flex-wrap:wrap and  justify-content:space-around. The last row can have 5,4, 3, 2, 1 images. 5 images: four ul is going to be in the same row. 3 images: one div is going to be in the same row, invisible, and the other three would wrap to a new row, but will collapse since they have no height, etc...