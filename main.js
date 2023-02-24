var CoursesApi = ('http://localhost:3000/Courses')


function start() {
    getCoursesApi(renderCourse)
    handleCreateForm()

}

start()

function getCoursesApi(callback) {
    fetch(CoursesApi)
        .then(function(response){
            return response.json()
        })
        .then(callback)
}

function CreateCourses(data,callback) {
    var Obj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    }
    fetch(CoursesApi,Obj)
        .then(function(response){
            return response.json()
        })
        .then(callback)
}

function deleteCourse(id) {
    var Obj = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          },
        
    }
    fetch(CoursesApi+ '/' + id ,Obj)
        .then(function(response){
            return response.json()
        })
        .then(function(){
            var Courseitem = document.querySelector(".Course-item-" + id)
            if(Courseitem) {
                Courseitem.remove()
            }
        })
}


function renderCourse(Courses) {
    var ListCoursesBlock = document.querySelector("#List-Courses")
    var htmls = Courses.map(function(Course){
        return `
            <li class= "Course-item-${Course.id}">
                <h4>${Course.name}</h4>
                <p>${Course.post}</p>
                <button onclick="deleteCourse(${Course.id})" >Xoa</button>
            </li>
        `
    })
    ListCoursesBlock.innerHTML = htmls.join('')
}
function handleCreateForm() {
    var CreateBtn =document.querySelector("#Create")
    CreateBtn.onclick = function() {
        var name = document.querySelector('input[name = "name"]').value
        var post = document.querySelector('input[name = "post"]').value
        
        var FormData= {
            name:name,
            post:post
        }

        CreateCourses(FormData , function(){
            getCoursesApi(renderCourse)
        })
    }}