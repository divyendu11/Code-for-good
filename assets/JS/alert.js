
 
// function submitForm(){
//     alert('Data submitted successfully')
// }


// For adding new user

$(document).on('submit', '#add_user', function(event){
    alert("Data Inserted Successfully!");
})

//For updating user info



$(document).on('submit', '#update_user', function(event){
    event.preventDefault();

    var arr = $(this).serializeArray();
    var data = {}
    

    for(var i=0; i<arr.length; i++){
        data[arr[i].name]=arr[i].value;
    }

    console.log(data)

    // $.map(arr, function(n, i){
    //     data[n['name']] = n['value']
    // })


    var request = {
        "url" : `http://localhost:3000/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

})


// // For deleting user 

$(document).on('click', '#delete', function(){  
    var id =$(this).attr("x")

    var request = {
        "url" : `http://localhost:3000/${id}`,
        "method" : "DELETE"
    }

    if(confirm("Do you really want to delete this record?")){
        $.ajax(request).done(function(response){
            alert("Data Deleted Successfully!");
            location.reload();
        })
    }

})






    




