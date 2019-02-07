function fetchCommmit() {
    var username = document.getElementById('username').value;
    if(username == "") {
        alert("enter a username");
    } else {
        var url = 'https://api.github.com/users/'+username+'/events'
        fetch(url).then(response => {
        return response.json();
        }).then(data => {
            var i;
            for (i = 0; i < data.length; i++) { 
                if(data[i].type == "PushEvent") {

                    var commit = document.createElement("div");
                    var commitLink = document.createElement("a")
                    commitLink.href = "https://github.com/" + data[i].repo.name + "/commit/" + data[i].payload.commits[0].sha;
                    commitLink.target = "_blank";

                    var repoName = document.createElement("span");
                    repoName.innerHTML = data[i].repo.name;

                    var commitName = document.createElement("span");
                    commitName.innerHTML = ' - "' + data[i].payload.commits[0].message + '"';

                    commitLink.appendChild(repoName);
                    commitLink.appendChild(commitName);
                    commit.appendChild(commitLink);

                    var get = document.createElement("div");
                    var apiLink = document.createElement("a");
                    apiLink.innerHTML = url
                    apiLink.href = url;
                    apiLink.target = "_blank";

                    var word = document.createElement("span");
                    word.innerHTML = "GET ";

                    get.appendChild(word);
                    get.appendChild(apiLink);

                    var add = document.getElementById("new");
                    add.innerHTML = "";
                    add.appendChild(commit);
                    add.appendChild(get);

                    break;
                }
            }
        }).catch(err => {
            console.log(err);
    });
    }
}