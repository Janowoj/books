import { useState } from "react";

function BookCreate({ onCreate }) {

    const [title, setTitle] = useState('');

    const handleChange = (event) => {
        setTitle(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onCreate(title);
        setTitle("");
    }

    return <div>
        <form onSubmit={handleSubmit}>
            <p>Add a Book</p>
            <label>Title</label>
            <input value={title} onChange={handleChange} />
            <button>Submit</button>
        </form>
    </div>
}

export default BookCreate;