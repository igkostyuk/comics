import React from 'react';

const InputWrapper = ({ handleSubmit }) => {
  const onSubmit = ev => {
    ev.preventDefault();
    const { elements } = ev.target;
    const value = [...elements].reduce((acc, el) => {
      if (el.name) {
        return { ...acc, [el.name]: el.value };
      }
      return acc;
    }, {});
    handleSubmit(value);
  };
  return (
    <form onSubmit={onSubmit}>
      <select className="search__item" name="orderBy">
        <option value="modified">Order by: modified</option>
        <option value="-modified">Order by: -modified</option>
        <option value="title">Order by: title</option>
        <option value="-title">Order by: -title</option>
      </select>
      <input
        className="search__item search__input"
        placeholder="title starts with ....."
        name="titleStartsWith"
      />
      <button className="search__item search__button">search</button>
    </form>
  );
};
export default InputWrapper;
