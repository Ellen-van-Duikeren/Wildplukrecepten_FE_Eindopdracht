// handle input change for ingredient, utensil & instruction on new recipe page
const handleInputChange = (e, index, item, setItem) => {
    const {name, value} = e.target;
    const list = [...item];
    list[index][name] = value;
    setItem(list);
};

export default handleInputChange;