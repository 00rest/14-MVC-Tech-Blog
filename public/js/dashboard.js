function inputBox(data) {
    let x = document.getElementById(data).getAttribute("class");
    if (x === 'hide') { document.getElementById(data).setAttribute("class", "") }
    else { document.getElementById(data).setAttribute("class", "hide") };
};

const newPostHandler = async () => {
    const response = await fetch('/api/dashboard', {
        method: 'POST',
        body: JSON.stringify(
            {
                title: document.getElementById("new-post-title").value,
                content: document.getElementById("new-post-content").value,
            }
        ),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) { document.location.replace('/dashboard') }
    else { alert('Failed to create post') }
};

const editPostHandler = async (data) => {
    const response = await fetch(`/api/dashboard/${data}`, {
        method: 'PUT',
        body: JSON.stringify(
            {
                title: document.getElementById(`edit-title-${data}`).value,
                content: document.getElementById(`edit-content-${data}`).value,
            }
        ),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) { document.location.replace('/dashboard') }
    else { alert('Failed to update post') }
};

const deletePostHandler = async (data) => {
    const response = await fetch(`/api/dashboard/${data}`, { method: 'DELETE' });

    if (response.ok) { document.location.replace('/dashboard') }
    else { alert('Failed to delete post') }
};