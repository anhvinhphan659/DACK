function generatePagination(ttPage, crPage, url) {
    var ul = document.getElementById("pagination");
    const totalPage = parseInt(ttPage);
    const currentPage = parseInt(crPage);
    var prevLi = document.createElement("li");
    var nextLi = document.createElement("li");
    prevLi.className = "page-item";
    nextLi.className = "page-item";

    var prevLink = document.createElement("a");
    var nextLink = document.createElement("a");
    prevLink.className = "page-link";
    nextLink.className = "page-link";
    prevLink.innerHTML = "Previous";
    nextLink.innerHTML = "Next";
    if (currentPage == 1) {
        prevLink.href = url + 1;
    } else {
        prevLink.href = url + parseInt(currentPage - 1);
    }
    if (currentPage == totalPage) {
        nextLink.href = url + parseInt(totalPage);
    } else {
        nextLink.href = url + parseInt(currentPage + 1);
    }
    prevLi.appendChild(prevLink);
    nextLi.appendChild(nextLink);

    ul.appendChild(prevLi);

    for (let i = 1; i <= totalPage; i++) {
        var liElement = document.createElement("li");
        liElement.className = "page-item";
        var link = document.createElement("a");
        link.className = "page-link";
        link.href = url + parseInt(i);
        link.innerHTML = i;
        liElement.appendChild(link);
        if (i == currentPage)
            liElement.className = "page-item active";
        ul.appendChild(liElement);
        console.log("Success");
    }
    ul.appendChild(nextLi);
}