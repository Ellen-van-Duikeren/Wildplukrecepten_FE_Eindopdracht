// handle remove click for ingredient, utensil & instruction on new recipe page
const handleRemoveClick = (index, item, setItem) => {
    const list = [...item];
    list.splice(index, 1);
    setItem(list);
};

export default handleRemoveClick