import React, { useState } from 'react';
import axios from 'axios';

const NewPost = ({ onPostAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [text, setText] = useState('');

  const [isTouched, setIsTouched] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  const handleInputChange = (e) => {
    setIsTouched(true);
    const { name, value } = e.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'description') {
      setDescription(value);
    } else if (name === 'text') {
      setText(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = { title, description, text };
    const form = e.target;

    if (!form.checkValidity()) {
      return;
    }
    if (!title.trim() || !description.trim() || !text.trim()) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);

    }

    try {
      const response = await axios.post('https://rest-api-production-fc73.up.railway.app/api/v1/posts', newPost);
      onPostAdded(response.data); 
      setTitle('');
      setDescription('');
      setText('');
    } catch (error) {
    }
  };


  return (
    <div className='newpost'>
      <h2 className='main-title'>Create Post</h2>
      <form className={`form ${isTouched && isEmpty ? 'invalid' : ''}`} onSubmit={handleSubmit} noValidate>
      <input
        className={`form__input input__title ${isTouched && isEmpty ? 'invalid' : ''}`}
        type="text"
        name="title"
        placeholder={isEmpty ? "Enter Your Title" : "Enter Your Title"}
        value={title}
        onChange={handleInputChange}
        required
      />
      <input
        className={`form__input input__subtitle ${isTouched && isEmpty ? 'invalid' : ''}`}
        type="text"
        name="description"
        placeholder={isEmpty ? "Enter Your Subtitle" : "Enter Your Subtitle"}
        value={description}
        onChange={handleInputChange}
        required
      />
      <input
        className={`form__input input__description ${isTouched && isEmpty ? 'invalid' : ''}`}
        name="text"
        placeholder={isEmpty ? "Enter Your Description" : "Enter Your Description"}
        value={text}
        onChange={handleInputChange}
        required
      />
      <div>
        <button className='post-button' type="submit">Post</button>
      </div>
    </form>
    </div>
  );
};

export default NewPost;
