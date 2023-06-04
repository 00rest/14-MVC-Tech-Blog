function commentBox(data) {
    let x = document.getElementById(data).getAttribute("class");
    if (x === 'hide') { document.getElementById(data).setAttribute("class", "") }
    else { document.getElementById(data).setAttribute("class", "hide") };
};

const comentHandler = async (data) => {
    const response = await fetch(`/comment/${data}`, {
        method: 'POST',
        body: JSON.stringify({ comment: document.getElementById(`txt-${data}`).value }),
        headers: {'Content-Type': 'application/json'}
    });

    if (response.ok) { document.location.replace('/') }
    else { alert('Failed to create comment') }

};